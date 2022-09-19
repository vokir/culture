<template>
  <v-modal :closeModalProp="closeModalProp" class="modal-select-bind" centered>
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
          <div class="selected__value selected__value--title" v-for="head of bindHead" :key="head">{{ head }}</div>
        </div>
        <div class="bind-list__selected-row" v-for="row in bindRowsLogic(selectedValues)">
          <div v-for="cell in row" class="selected__value">
            <span v-for="(value, i) in cell" class="for__value" :class="[{'selected__value--active': value.isSelected}]" :data-id="value.id">
                <template v-if="true"> {{ value.name}} </template>
                <template v-if="cell[i + 1]">, </template>
            </span>
          </div>
        </div>
      </div>
      <div class="bind-list__actions">
        <v-button variant="success" @click="onSave">Сохранить</v-button>
        <v-button variant="link" @click="onCancel">Отмена</v-button>
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
import bindRowsLogic from "../news/bind-rows/bindRowsLogic";
import VButton from "../ui/v-button/v-button.vue";
import VCheckbox from "../ui/v-checkbox/v-checkbox.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";

export default {
  name: "select-bind",
  components: { VButton, VCheckbox, VLoader, VModal },
  emits: ['onSave', 'onCancel', 'update:modelValue'],
  props: {
    complexID: Number,
    complexName: String,
    houses: Object,
    approaches: Object,
    floors: Object,
    premises: Object
  },
  setup(props, { emit }) {
    const closeModalProp = ref(false)
    const selectedHouses = ref(props.houses)
    const selectedApproaches = ref(props.approaches)
    const selectedFloors = ref(props.floors)
    const selectedPremises = ref(props.premises)
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
      complexID: props.complexID.toString()
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

    const selectedValues = computed(()=>{
      return {
        houses: selectedHouses.value,
        premises: selectedPremises.value,
        approaches: selectedApproaches.value,
        floors: selectedFloors.value
      }
    })

    const onSave = () => {
      emit('onSave', selectedValues.value)
      clear()
      closeModalProp.value = true
    }
    const onCancel = () => {
      emit('onCancel')
      clear()
    }

    const clear = () => {
      selectedHouses.value = []
      selectedApproaches.value = []
      selectedFloors.value = []
      selectedPremises.value = []
      selectedHouse.value = ''
      selectedApproach.value = ''
      selectedFloor.value = ''
    }

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
      bindHead,
      bindRowsLogic,
      onSave,
      onCancel,
      closeModalProp
    }
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
