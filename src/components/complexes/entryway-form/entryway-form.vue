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
      <v-button v-if="editMode" class="delete-btn" variant="danger" @click="onDelete">
        <v-icon height="12" name="cross" width="12" />
        Удалить подъезд
      </v-button>
    </template>
  </v-modal>
</template>

<script setup>
import VButton from '@/components/ui/v-button/v-button.vue';
import VInput from '@/components/ui/v-input/v-input.vue';
import VModal from '@/components/ui/v-modal/v-modal.vue';
import VAddDocs from '@/components/ui/v-add-docs/v-add-docs.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import { inject, ref, watchEffect } from 'vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import { useEntrywayStore } from '@/store/entryway/index.js';

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

const form = ref({
  number: 1,
  name: '',
  order: 1,
  documents: []
});

const currentEntry = inject('entry');
const currentHouse = inject('house');
const entryStore = useEntrywayStore();

watchEffect(() => {
  if (props.editMode) {
    form.value = {
      realId: currentEntry.value.realId,
      name: currentEntry.value.name,
      number: currentEntry.value.number,
      order: currentEntry.value.order,
      documents: currentEntry.value.documents
    };
  }
});

const onSave = async () => {
  emit('onSave', form.value);
  emit('closeModal');
};
const onCopy = async () => {
  emit('onCopy', form.value);
};
const onCancel = () => {
  form.value = {
    number: 1,
    name: '',
    order: 1,
    documents: []
  };
  emit('closeModal');
};

const onDelete = async () => {
  await entryStore.deleteEntryway(currentEntry.value.realId);
  await entryStore.getEntrywayList(currentHouse.value.realId);
  emit('closeModal');
};
</script>

<style lang="scss" scoped src="./entryway-form.scss"></style>
