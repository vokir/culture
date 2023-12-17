<template>
  <v-modal @closeModal="emit('closeModal')">
    <template #title>{{ title }}</template>
    <div class="complex-form">
      <v-card class="complex-form__card complex-form__card-grid">
        <v-input
          v-model="localData.number"
          disabled
          label="Номер дома*"
          name="number"
          readonly
          type="number"
        />
        <v-input v-model="localData.name" label="Название дома*" name="name" />
        <v-input
          v-model="localData.order"
          label="Порядок вывода в интерфейсе"
          name="order"
          type="number"
        />
        <v-input v-model="localData.coords" label="Координаты" name="coords" />
      </v-card>
      <v-card class="complex-form__card">
        <v-add-docs v-model="localData.docs" label="Документы" />
      </v-card>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить дом и создать ещё
      </v-button>
      <v-button variant="link" @click="onCancel">Отмена</v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import { ref } from 'vue';
import { useHouseStore } from '@/store/house/index.js';
import { useRoute } from 'vue-router';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: 'Дом №2 / ЖК Береговой'
  },
  editMode: {
    type: Boolean,
    default: false
  },
  housesCount: {
    type: Number,
    default: 1
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const store = useHouseStore();
const route = useRoute();

const localData = ref({
  number: props.housesCount + 1,
  name: '',
  order: 1,
  coords: '',
  docs: []
});

const onSave = () => {
  if (props.editMode) {
  } else {
    store.createHouse(localData.value, route.params.id);
  }
  localData.value = {
    number: props.housesCount + 1,
    order: 1,
    name: '',
    coords: '',
    docs: []
  };
  emit('closeModal');
};
const onCopy = () => {
  store.createHouse(localData.value, route.params.id);
};
const onCancel = () => {};
</script>

<style lang="scss" scoped src="./complex-house-form.scss"></style>
