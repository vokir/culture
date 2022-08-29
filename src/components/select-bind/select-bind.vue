<template>
  <v-modal v-if="isOpen" class="modal-select-bind" centered @closeModal="$emit('closeModal')">
    <div class="modal-title">{{ complexName }}</div>
    <div class="modal-title-desc">Задать принадлежность новости к Дому/ Подъезду / Этажу / Помещению.</div>
    <span class="modal-hint">Выберите один или несколько вариантов</span>
    <div class="bind-container">
      <v-loader v-if="loading"/>
      <div class="bind-list" v-else>
        <div class="bind-list__item">
          <div class="bind-list__item-title">Дом</div>
          <div class="bind-list__item-items">
            <div class="bind-list__item-scroll">
              <label class="bind-list__item-value" v-for="house in houses">
                <v-checkbox v-model="selectedHouses" :value="house"/>
                <span>{{ house.UF_NAME }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="bind-list__selected">
        <div class="bind-list__selected-row" v-if="selectedHouses">
          <div class="selected__value selected__value--title">Дом</div>
          <div class="selected__value" v-for="house of selectedHouses">
            {{ house.UF_NAME }}
          </div>
        </div>
        <div class="bind-list__selected-row">
          <div class="selected__value selected__value--title">Подъезд</div>

        </div>
        <div class="bind-list__selected-row">
          <div class="selected__value selected__value--title">Этаж</div>
        </div>
        <div class="bind-list__selected-row">
          <div class="selected__value selected__value--title">Помещение</div>
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
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { GET_HOUSES_BY_COMPLEX_ID } from "../../api/queries/getHousesByComplexID";
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

    const { result, loading } = useQuery(GET_HOUSES_BY_COMPLEX_ID, {
      complexID: complexID.toString()
    })
    const houses = computed(() => {
      return result.value.getHouses
    })

    return {
      loading,
      houses,
      selectedHouses
    }
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
