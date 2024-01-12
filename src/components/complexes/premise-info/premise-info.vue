<template>
  <div class="complex-info">
    <div class="complex-info__left">
      <div class="complex-info__left-inner">
        <div class="house-header">
          <div class="house-header__name">{{ currentPremise.name }}</div>
          <v-button variant="link" @click="openModal">
            <v-icon height="11" name="pen" width="11" />
            Редактировать
          </v-button>
        </div>
        <v-tabs link-title>
          <v-tab title="Информация">
            <info-block :info="premiseInfo" />
          </v-tab>
          <v-tab title="Документы">
            <document-block :documents="currentPremise.documents" />
          </v-tab>
          <v-tab title="История изменений">
            <changes-block />
          </v-tab>
        </v-tabs>
      </div>
    </div>
    <div class="complex-info__right">
      <entryway-requests />
    </div>
  </div>
</template>
<script setup>
import VTab from '@/components/ui/v-tabs/v-tab/v-tab.vue';
import ChangesBlock from '@/components/complexes/changes-block/changes-block.vue';
import VTabs from '@/components/ui/v-tabs/v-tabs.vue';
import InfoBlock from '@/components/complexes/info-block/info-block.vue';
import VIcon from '@/components/ui/v-icon/v-icon.vue';
import VButton from '@/components/ui/v-button/v-button.vue';
import DocumentBlock from '@/components/complexes/document-block/document-block.vue';
import EntrywayRequests from '@/components/complexes/entryway-requests/entryway-requests.vue';
import { computed, inject } from 'vue';
import useModal from '@/hooks/useModal.js';
import createInfo from '@/helpers/createInfo.js';

const currentPremise = inject('premise');
const { isOpen, closeModal, openModal } = useModal();
const currentHouse = inject('house');

const premiseInfo = computed(() => {
  const fields = {
    realId: 'ID',
    premisesCount: 'Помещений'
  };
  return createInfo(currentPremise.value, fields);
});
</script>

<style lang="scss" scoped src="./premise-info.scss"></style>
