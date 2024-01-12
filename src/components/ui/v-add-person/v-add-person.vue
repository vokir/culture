<template>
  <v-card>
    <div class="card-header">
      <label>{{ label }}</label>
      <v-button class="card-button" @click="addInput">
        <v-icon color="#1058D0" height="7" name="plus" width="7" />
        Добавить ЛС
      </v-button>
    </div>
    <v-add-person-input
      v-for="(input, idx) of inputs"
      :key="idx"
      v-model="inputs[idx]"
      :options="options"
      :showRemoveBtn="inputs.length > 1"
      label="Лицевой счет"
      @remove="removeInput(idx)"
    />
  </v-card>
</template>

<script setup>
import VButton from '@/components/ui/v-button/v-button.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import VCard from '@/components/ui/v-card/v-card.vue';
import { useVModel } from '@vueuse/core';
import { ref, watch } from 'vue';
import VAddPersonInput from '@/components/ui/v-add-person/v-add-person-input.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
  }
});

const inputs = ref([
  {
    number: '',
    name: '',
    phone: '',
    email: ''
  }
]);

const addInput = () => {
  inputs.value.push({
    number: '',
    name: '',
    phone: '',
    email: ''
  });
};
const removeInput = (idx) => {
  inputs.value.splice(idx, 1);
};

const localValue = useVModel(props, 'modelValue', emit);

watch(
  inputs,
  (val) => {
    console.log(val);
    localValue.value = val;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped src="./v-add-person.scss"></style>
