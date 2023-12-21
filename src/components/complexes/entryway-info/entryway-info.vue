<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">{{ currentEntry.name }}</div>
          <v-button variant="link" @click="openModal">
            <v-icon height="11" name="pen" width="11" />
            Редактировать
          </v-button>
        </div>
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="entryInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="currentEntry.documents" />
          </v-tab>
          <v-tab title="История изменений">
            <changes-block />
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <div class="complex-info__right"></div>
    <entryway-form
      v-if="isOpen"
      :title="`${currentEntry.name} / ${currentHouse.name} /  ${currentComplex.name}`"
      edit-mode
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import { computed, inject } from 'vue';
import createInfo from '@/helpers/createInfo.js';
import useModal from '@/hooks/useModal.js';
import EntrywayForm from '@/components/complexes/entryway-form/entryway-form.vue';

const { isOpen, closeModal, openModal } = useModal();

const currentComplex = inject('complex');
const currentHouse = inject('house');
const currentEntry = inject('entry');

const entryInfo = computed(() => {
  const fields = {
    realId: 'ID',
    premisesCount: 'Помещений'
  };
  return createInfo(currentEntry.value, fields);
});
</script>

<style lang="scss" scoped src="./entryway-info.scss"></style>
