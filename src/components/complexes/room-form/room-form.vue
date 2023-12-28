<template>
  <v-modal>
    <template #title>{{ title }}</template>
    <div class="room-form">
      <component :is="getComponentType(store.currentType)"></component>

      <div class="room-form__right">
        <v-card class="floor-form__right">
          <v-add-docs label="Документы" />
        </v-card>

        <v-card>
          <div class="card-header">
            <label>Собственник*</label>
            <v-button class="card-button">
              <v-icon color="#1058D0" height="7" name="plus" width="7" />
              Добавить ЛС
            </v-button>
          </div>
          <v-input label="Лицевой счет" name="name" />
        </v-card>

        <v-card>
          <div class="card-header">
            <label>Жилец*</label>
            <v-button class="card-button">
              <v-icon color="#1058D0" height="7" name="plus" width="7" />
              Добавить ЛС
            </v-button>
          </div>
          <v-input label="Лицевой счет" name="name" />
        </v-card>
      </div>
    </div>
    <template #actions>
      <v-button type="submit" variant="success">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered"> Сохранить этаж и создать ещё</v-button>
      <v-button variant="link">Отмена</v-button>
      <v-button v-if="editMode" class="delete-btn" variant="danger">
        <v-icon height="12" name="cross" width="12" />
        Удалить дом
      </v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { usePremiseStore } from '@/store/premise/index.js';
import FlatForm from '@/components/complexes/room-form/flat-form/flat-form.vue';
import ParkingForm from '@/components/complexes/room-form/parking-form/parking-form.vue';
import FooterForm from '@/components/complexes/room-form/footer-form/footer-form.vue';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: 'Новое помещение'
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const store = usePremiseStore();

if (!store.premiseTypes.length) {
  store.getPremisesTypes();
}

const getComponentType = (type) => {
  const componentMap = {
    1: FlatForm,
    2: ParkingForm,
    3: FooterForm
  };
  if (!type?.realId) {
    return FlatForm;
  }

  return componentMap[type.realId];
};
</script>

<style lang="scss" scoped src="./room-form.scss"></style>
