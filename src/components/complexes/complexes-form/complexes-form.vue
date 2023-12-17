<template>
  <v-modal @closeModal="emit('closeModal')">
    <template #title>{{ title }}</template>
    <div class="complex-form">
      <v-card class="complex-form__card">
        <div class="input-row">
          <v-input v-model="store.form.name" label="Название*" name="name" />
          <v-select
            v-model="store.form.active"
            :options="['Да', 'Нет']"
            labelSelect="Активность*"
          />
        </div>
        <div class="input-row">
          <v-select
            v-model="store.form.visibility"
            :options="['Да', 'Нет']"
            labelSelect="Видимость ЖК для ИС"
          />
          <v-input
            v-model="store.form.order"
            label="Порядок вывода в интерфейсе"
            name="order"
            type="number"
          />
        </div>
        <div class="input-row">
          <v-input v-model="store.form.address" label="Адрес*" name="address" />
          <v-input
            v-model="store.form.phone"
            v-mask="'+7 (###) ###-##-##'"
            label="Телефон"
            name="phone*"
            placeholder="+7"
            type="tel"
          />
        </div>
        <v-input v-model="store.form.coords" label="Координаты" name="coords" />
      </v-card>
      <div class="complex-form__right">
        <v-card>
          <v-file v-model="store.form.icon" label="Добавить логотип" />
        </v-card>
        <v-card class="card-blue">
          <v-add-docs v-model="store.form.rules" label="Правила проживания" />
        </v-card>
        <v-card>
          <v-add-docs v-model="store.form.documents" label="Документы" />
        </v-card>
      </div>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить жк и создать ещё
      </v-button>
      <v-button variant="link" @click="onCancel">Отмена</v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import VSelect from '@/components/ui/v-select/v-select.vue';
import { mask } from 'vue-the-mask';
import VButton from '@/components/ui/v-button/v-button.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VFile from '@/components/ui/v-file/v-file.vue';
import { useComplexStore } from '@/store/complex/index.js';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: 'Новый жилой комплекс'
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const vMask = mask;

const store = useComplexStore();

const onSave = () => {
  if (props.editMode) {
    store.updateComplex();
  } else {
    store.createComplex(store.form);
  }
  emit('closeModal');
};
const onCopy = () => {
  store.createComplex(store.form);
};
const onCancel = () => {
  emit('closeModal');
};
</script>

<style lang="scss" scoped src="./complexes-form.scss"></style>
