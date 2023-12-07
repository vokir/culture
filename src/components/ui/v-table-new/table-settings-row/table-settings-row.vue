<template>
  <VDropdown
      :distance="10"
      :skidding="-10"
      placement="right-start"
      popperClass="settings-popup"
  >
    <div class="settings-button">
      <v-icon height="16px" name="burger" width="16px"/>
    </div>
    <template #popper>
      <div class="settings">
        <ul class="settings__list">
          <li
              v-close-popper
              class="settings__item"
              @click="emit('edit')"
          >
            Редактировать
          </li>
          <li
              v-close-popper
              class="settings__item"
              @click="emit('copy')"
          >
            Копировать
          </li>
          <li
              v-close-popper
              class="settings__item"
              @click="emit('edit')"
          >
            Удалить
          </li>
        </ul>
      </div>
    </template>
  </VDropdown>
</template>

<script setup>
import VIcon from "@/components/ui/v-icon/v-icon.vue";

const emit = defineEmits(['edit', 'copy', 'delete'])

</script>


<style lang="scss" scoped src="./table-settings-row.scss"></style>
