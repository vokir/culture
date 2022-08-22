<template>
  <v-modal v-if="isOpen" class="modal-select-bind" centered @closeModal="$emit('closeModal')">
    <div class="modal-title">Название ЖК</div>
    <div class="modal-title-desc">Задать принадлежность новости к Дому/ Подъезду / Этажу / Помещению.</div>
    <span class="modal-hint">Выберите один или несколько вариантов</span>
    <div class="bind-container">
      <div class="bind-list">
        <div class="bind-list__item">

        </div>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { GET_HOUSES_BY_COMPLEX_ID } from "../../api/queries/getHousesByComplexID";
import VModal from "../ui/v-modal/v-modal.vue";

export default {
  name: "select-bind",
  components: { VModal },
  props: {
    isOpen: Boolean,
    complexID: Number
  },
  setup({ complexID }) {
    const { result, loading } = useQuery(GET_HOUSES_BY_COMPLEX_ID, {
      complexID: complexID.toString()
    })
    const houses = computed(()=>{
      return result.value.getHoueses
    })
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
