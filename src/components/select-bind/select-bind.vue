<template>
  <v-modal v-if="isOpen" class="modal-select-bind" centered @closeModal="$emit('closeModal')">
    <div class="modal-title">{{ complexName }}</div>
    <div class="modal-title-desc">Задать принадлежность новости к Дому/ Подъезду / Этажу / Помещению.</div>
    <span class="modal-hint">Выберите один или несколько вариантов</span>
    <div class="bind-container">
      <v-loader v-if="housesLoading"/>
      <div class="bind-list" v-else>
        <div class="bind-list__item">
          <div class="bind-list__item-title">Дом</div>
          <div class="bind-list__item-items">
            <div class="bind-list__item-scroll">
              <div
                :class="['bind-list__item-value', { 'bind-list__item-value--active': selectedHouse === house.ID.toString() } ]"
                v-for="house in houses"
                @click="selectHouse(house.ID)"
              >
                <v-checkbox v-model="selectedHouses" :value="house"/>
                <span>{{ house.UF_NAME }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bind-list__item" v-if="selectedHouse.length">
          <div class="bind-list__item-title">Подъезд</div>
          <div class="bind-list__item-items">
            <div class="bind-list__item-scroll">
              <v-loader v-if="approachesLoading"/>
              <div
                v-else
                :class="['bind-list__item-value', { 'bind-list__item-value--active': selectedApproach === approach.ID.toString() } ]"
                v-for="approach in approaches"
                @click="selectApproach(approach.ID)"
              >
                <v-checkbox v-model="selectedApproaches" :value="approach"/>
                <span>{{ approach.UF_NAME }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bind-list__item" v-if="selectedApproach.length">
          <div class="bind-list__item-title">Этаж</div>
          <div class="bind-list__item-items">
            <div class="bind-list__item-scroll">
              <v-loader v-if="floorsLoading"/>
              <div
                v-else
                :class="['bind-list__item-value', { 'bind-list__item-value--active': selectedFloor === floor.ID.toString() } ]"
                v-for="floor in floors"
                @click="selectFloor(floor.ID)"
              >
                <v-checkbox v-model="selectedFloors" :value="floor"/>
                <span>{{ floor.UF_NAME }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bind-list__item" v-if="selectedFloor.length">
          <div class="bind-list__item-title">Помещение</div>
          <div class="bind-list__item-items">
            <div class="bind-list__item-scroll">
              <v-loader v-if="premisesLoading"/>
              <div
                v-else
                class="bind-list__item-value bind-list__item-value--no-hover"
                v-for="premise in premises"
              >
                <v-checkbox v-model="selectedPremises" :value="premise" @click.stop=""/>
                <span>{{ premise.UF_NAME ? premise.UF_NAME : premise.UF_NUMBER }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bind-list__selected">
        <div class="bind-list__selected-row" v-if="selectedHouses">
          <div class="selected__value selected__value--title" v-for="(head, key) of bindHead">{{ head }}</div>
        </div>
        <div class="bind-list__selected-row" v-for="row of selectedValues">
          <template v-for="(head, key) of bindHead">
            <div class="selected__value" v-if="key === 'house'">
              {{ row.UF_NAME}}
            </div>
          </template>
        </div>
      </div>
      <div class="bind-list__actions">
        <v-button variant="success">Сохранить</v-button>
        <v-button variant="link">Отмена</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { GET_APPROACHES_BY_HOUSE_ID } from "../../api/queries/getApproachesByHouseID";
import { GET_FLOORS_BY_APPROACH_ID } from "../../api/queries/getFloorsByApproachID";
import { GET_HOUSES_BY_COMPLEX_ID } from "../../api/queries/getHousesByComplexID";
import { GET_PREMISES_BY_FLOOR_ID } from "../../api/queries/getPremisesByFloorID";
import VButton from "../ui/v-button/v-button.vue";
import VCheckbox from "../ui/v-checkbox/v-checkbox.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";

export default {
  name: "select-bind",
  components: { VButton, VCheckbox, VLoader, VModal },
  props: {
    isOpen: Boolean,
    complexID: Number,
    complexName: String,
  },
  setup({ complexID }) {
    const selectedHouses = ref([])
    const selectedApproaches = ref([])
    const selectedFloors = ref([])
    const selectedPremises = ref([])
    const selectedHouse = ref('')
    const selectedApproach = ref('')
    const selectedFloor = ref('')
    const bindHead = {
        house: 'Дом',
        approaches: 'Подъезд',
        floors: 'Этаж',
        premises: 'Помещение'
    }
    const { result: housesResult, loading: housesLoading } = useQuery(GET_HOUSES_BY_COMPLEX_ID, {
      complexID: complexID.toString()
    })
    const houses = computed(() => housesResult.value?.getHouses ?? [])

    const { result: approachesResult, loading: approachesLoading, load: loadApproach } = useLazyQuery(GET_APPROACHES_BY_HOUSE_ID)
    const approaches = computed(() => approachesResult.value?.getApproaches ?? [])

    const { result: floorsResult, loading: floorsLoading, load: loadFloors } = useLazyQuery(GET_FLOORS_BY_APPROACH_ID)
    const floors = computed(() => floorsResult.value?.getFloors ?? [])

    const { result: premisesResult, loading: premisesLoading, load: loadPremises } = useLazyQuery(GET_PREMISES_BY_FLOOR_ID)
    const premises = computed(() => premisesResult.value?.getPremises ?? [])

    const selectHouse = (houseID) => {
      if (selectedHouse.value === houseID.toString()) return
      selectedHouse.value = houseID.toString()
      selectedApproach.value = ''
      selectedFloor.value = ''
    }
    const selectApproach = (approachID) => {
      if (selectedApproach.value === approachID.toString()) return
      selectedApproach.value = approachID.toString()
      selectedFloor.value = ''
    }
    const selectFloor = (floorID) => {
      if (selectedFloor.value === floorID.toString()) return
      selectedFloor.value = floorID.toString()
    }

    watch(selectedHouse, () => {
      loadApproach(GET_APPROACHES_BY_HOUSE_ID, { houseID: selectedHouse.value })
    })
    watch(selectedApproach, () => {
      loadFloors(GET_FLOORS_BY_APPROACH_ID, { approachID: selectedApproach.value })
    })
    watch(selectedFloor, () => {
      loadPremises(GET_PREMISES_BY_FLOOR_ID, { premisesID: selectedFloor.value })
    })

    const selectedValues = computed(()=> {
      let arr = []
      if (selectedHouses.value.length) {
        selectedHouses.value.forEach(house => {
          let approaches = []

          if (selectedApproaches.value.length) {
            selectedApproaches.value.forEach(approach => {
              let floors = []

              if (selectedFloors.value.length) {
                selectedFloors.value.forEach(floor => {
                  let premises = []

                  if (selectedPremises.value.length) {
                    selectedPremises.value.forEach(premise => {
                      if (floor.ID === premise.floor.ID) {
                        premises.push(premise)
                      }
                    })
                  }
                  if (approach.ID === floor.approache.ID) {
                    floors.push({
                      ...floor,
                      premises
                    })
                  }
                })
              }
              if (house.ID === approach.house.ID) {
                approaches.push({
                  ...approach,
                  floors
                })
              }
            })
          }

          arr.push({
            ...house,
            approaches
          })
        })
      }
      return arr
    })

    return {
      houses,
      housesLoading,
      selectHouse,
      selectedHouse,
      selectedHouses,
      approaches,
      approachesLoading,
      selectApproach,
      selectedApproach,
      selectedApproaches,
      floors,
      floorsLoading,
      selectFloor,
      selectedFloor,
      selectedFloors,
      premises,
      premisesLoading,
      selectedPremises,
      selectedValues,
      bindHead
    }
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
