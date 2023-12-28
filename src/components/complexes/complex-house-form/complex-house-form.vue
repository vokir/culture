<template>
  <v-modal @close-modal="onCancel">
    <template #title>{{ title }}</template>
    <div class="complex-form">
      <v-card class="complex-form__card complex-form__card-grid">
        <v-input
          v-model="localData.number"
          :error="validate.number.$error"
          disabled
          label="Номер дома*"
          name="number"
          readonly
          type="number"
        />
        <v-input
          v-model="localData.order"
          label="Порядок вывода в интерфейсе"
          name="order"
          type="number"
        />
        <v-input v-model="localData.name" label="Название дома*" name="name" />
        <v-input v-model="localData.coords" label="Координаты" name="coords" />
      </v-card>
      <v-card class="complex-form__card">
        <v-add-docs v-model="localData.documents" label="Документы" />
      </v-card>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить дом и создать ещё
      </v-button>
      <v-button variant="link" @click="onCancel">Отмена</v-button>
      <v-button v-if="editMode" class="delete-btn" variant="danger" @click="onDelete">
        <v-icon height="12" name="cross" width="12" />
        Удалить дом
      </v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import { useHouseStore } from '@/store/house/index.js';
import { useRoute } from 'vue-router';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { inject, ref, watchEffect } from 'vue';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: 'Дом №2 / ЖК Береговой'
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const store = useHouseStore();
const route = useRoute();
const currentHouse = inject('house');

const localData = ref({
  number: store.houses.length + 1,
  order: 1,
  name: '',
  coords: '',
  documents: []
});

watchEffect(() => {
  if (props.editMode) {
    localData.value = {
      name: currentHouse.value.name,
      complexId: currentHouse.value.complexId,
      realId: currentHouse.value.realId,
      number: currentHouse.value.number,
      order: currentHouse.value.order,
      coords: [currentHouse.value.lat, currentHouse.value.long].join(', '),
      documents: currentHouse.value.documents
    };
  }
});

const rules = {
  number: {
    required
  },
  name: {
    required
  }
};

const validate = useVuelidate(rules, localData.value);

const onSave = async () => {
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }
  if (props.editMode) {
    const res = await store.updateHouse(localData.value);
    if (res.status === 200) {
      currentHouse.value = res.data.data;
    }
  } else {
    await store.createHouse(localData.value, route.params.id);
  }
  await store.getHousesList(route.params.id);
  localData.value = {
    number: store.houses.length + 1,
    order: 1,
    name: '',
    coords: '',
    documents: []
  };
  emit('closeModal');
};

const onCopy = async () => {
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }
  await store.createHouse(localData.value, route.params.id);
  await store.getHousesList(route.params.id);
};

const onCancel = () => {
  localData.value = {
    number: store.houses.length + 1,
    order: 1,
    name: '',
    coords: '',
    documents: []
  };
  emit('closeModal');
};

const onDelete = async () => {
  await store.deleteHouse(currentHouse.value.realId);
  await store.getHousesList(route.params.id);
  emit('closeModal');
};
</script>

<style lang="scss" scoped src="./complex-house-form.scss"></style>
