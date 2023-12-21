<template>
  <v-modal @close-modal="emit('closeModal')">
    <template #title>{{ title }}</template>
    <div class="complex-form">
      <v-card class="complex-form__card">
        <div class="input-row">
          <v-input
            v-model="form.number"
            disabled
            label="Номер подъезда"
            name="number"
            readonly
            type="number"
          />
          <v-input v-model="form.name" label="Название подъезда" name="name" />
        </div>
        <div class="input-row">
          <v-input
            v-model="form.order"
            label="Порядок вывода в интерфейсе"
            name="order"
            type="number"
          />
        </div>
      </v-card>
      <div class="complex-form__right">
        <v-card>
          <v-add-docs v-model="form.documents" label="Документы" />
        </v-card>
      </div>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave"> Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить подъезд и создать ещё
      </v-button>
      <v-button variant="link" @click="onCancel">Отмена</v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VButton from '@/components/ui/v-button/v-button.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import { reactive } from 'vue';

const emit = defineEmits(['closeModal', 'onSave']);
const props = defineProps({
  title: {
    type: String,
    default: 'Новый подъезд'
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const form = reactive({
  number: 1,
  name: '',
  order: 1,
  documents: []
});

const onSave = async () => {
  emit('onSave', form);
  emit('closeModal');
};
const onCopy = async () => {};
const onCancel = () => {
  emit('closeModal');
};
</script>

<style lang="scss" scoped src="./entryway-form.scss"></style>
