<template>
  <layout-default>
    <div class="complexes">
      <page-header :fields="[]" action-text="ДОБАВИТЬ КОМПЛЕКС" title="Жилые комплексы"/>
      <complexes-list/>
    </div>
  </layout-default>
</template>

<script setup>
import LayoutDefault from "@/layout/layout-default/layout-default.vue";
import PageHeader from "@/components/general/page-header/page-header.vue";
import ComplexesList from "@/components/complexes/complexes-list/complexes-list.vue";
</script>

<style lang="scss" scoped src="./complexes.scss"></style>
