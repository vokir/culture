<template>
  <v-modal @closeModal="emit('closeModal')">
    <template #title>{{ title }}</template>
    <div class="room-form">
      <transition mode="out-in" name="fade">
        <component :is="getComponentType(store.currentType)"></component>
      </transition>

      <div class="room-form__right">
        <v-card class="floor-form__right">
          <v-add-docs label="Документы" />
        </v-card>

        <v-add-person
          v-model="store.form.personalAccounts"
          :options="globalStore.accountList"
          label="Собственник*"
        />

        <v-add-person
          v-model="store.form.personalAccounts"
          :options="globalStore.accountList"
          label="Жилец*"
        />
      </div>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="store.createPremiseFunc">
        Сохранить
      </v-button>
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
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { usePremiseStore } from '@/store/premise/index.js';
import FlatForm from '@/components/complexes/room-form/flat-form/flat-form.vue';
import ParkingForm from '@/components/complexes/room-form/parking-form/parking-form.vue';
import FooterForm from '@/components/complexes/room-form/footer-form/footer-form.vue';
import VAddPerson from '@/components/ui/v-add-person/v-add-person.vue';
import { useGlobalStore } from '@/store/global/index.js';
import { inject } from 'vue';

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
const currentHouse = inject('house');
if (!store.premiseTypes.length) {
  store.getPremisesTypes();
}
store.getPremise(currentHouse.value.realId);

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
const globalStore = useGlobalStore();
globalStore.getAccountList();
</script>

<style lang="scss" scoped src="./room-form.scss"></style>
