<template>
  <v-modal @close-modal="onCancel">
    <template #title>{{ title }}</template>
    <div class="floor-form">
      <v-card class="floor-form__card">
        <div class="input-row">
          <v-select
            v-model="localData.typeId"
            :error="validate.type.$error"
            :options="['Жилой', 'Технический']"
            label-select="Тип этажа*"
          />
          <v-select
            v-model="localData.entranceNumber"
            :error="validate.entranceNumber.$error"
            :options="entryways"
            label-select="Номер подъезда*"
          />
        </div>
        <div class="input-row">
          <v-input
            v-model="localData.number"
            disabled
            label="Номер этажа"
            name="name"
          />
        </div>
      </v-card>
      <v-card class="floor-form__right">
        <v-add-docs v-model="localData.documents" label="Документы" />
      </v-card>
    </div>
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить этаж и создать ещё
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
import VModal from "@/components/ui/v-modal/v-modal.vue";
import VCard from "@/components/ui/v-card/v-card.vue";
import VSelect from "@/components/ui/v-select/v-select.vue";
import VInput from "@/components/ui/v-input/v-input.vue";
import VAddDocs from "@/components/ui/v-add-docs/v-add-docs.vue";
import {useFloorStore} from "@/store/floor/index.js";
import VButton from "@/components/ui/v-button/v-button.vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {inject, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import VIcon from "@/components/ui/v-icon/v-icon.vue";

const emit = defineEmits(['closeModal']);
const props = defineProps({
  title: {
    type: String,
    default: 'Новый этаж'
  },
  editMode: {
    type: Boolean,
    default: false
  },
  entryways: {
    type: Array,
    default: () => [
      {
        title: 'ID',
        value: '123123123'
      }
    ]
  }
});

const store = useFloorStore();

const localData = ref({
  number: store.form.floorNumber,
  typeId: store.form.type,
  entranceNumber: 1,
  documents: []
});

console.log(store.floors)


const rules = {
  type: {
    required
  },
  entranceNumber: {
    required
  },
  floorNumber: {
    required
  }
};

const validate = useVuelidate(rules, localData.value);
const route = useRoute();
const currentFloor = inject('floor');

watchEffect(() => {
  if (props.editMode) {
    localData.value = {
      name: currentFloor.value.name,
      complexId: currentFloor.value.complexId,
      realId: currentFloor.value.realId,
      number: currentFloor.value.number,
      typeId: currentFloor.value.typeId,
      documents: currentFloor.value.documents
    };
  }
});

const onSave = async () => {
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }
  if (props.editMode) {
    await store.updateFloor(localData.value);
  } else {
    await store.createFloor(localData.value, route.params.id);
  }
  await store.getFloorList(route.params.id);
  localData.value = {
    number: store.form.floorNumber,
    typeId: store.form.type,
    documents: []
  };
  emit('closeModal');
};
const onCopy = async () => {
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }
  await store.createFloor(localData.value, route.params.id);
  await store.getFloorList(route.params.id);
};
const onCancel = () => {
  localData.value = {
    number: store.form.floorNumber,
    typeId: store.form.type,
    documents: []
  };
  emit('closeModal');
};
const onDelete = async () => {
  await store.deleteFloor();
  await store.getFloorList(route.params.id);
  emit('closeModal');
};
</script>

<style scoped lang="scss" src="./floor-form.scss">

</style>
