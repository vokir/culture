<template>
  <v-loader v-if="isLoading"/>
  <v-table-new :columns="columns" :rows="mock">
    <template #tableHeader="col">{{ col.title }}</template>
    <template #tableRow="{ row, col, selected }">
      <span v-if="col.id === 'logo'">
        <img :src="row.logo" alt="">
      </span>
      <span v-else-if="col.id === 'active'">
        <template v-if="selected.includes(row)">
           <v-select
               v-model="row.active"
               :options="['Да', 'Нет']"
           />
        </template>
        <template v-else>
          {{ row.active }}
        </template>
      </span>
      <span v-else-if="col.id === 'address'">
        <template v-if="selected.includes(row)">
          <v-input v-model="row.address" name="Адресс"/>
        </template>
        <template v-else>
          {{ row.address }}
        </template>
      </span>
      <span v-else-if="col.id === 'name'">
        <router-link
            :to="{ name: 'complexes-detail', params: { id: row.id } }"
            class="link"
        >
          {{ row.name }}
        </router-link>
      </span>
      <span v-else>{{ row[col.id] }}</span>
    </template>
  </v-table-new>
  <table-pagination
      v-model:current-page="pagination.currentPage"
      v-model:per-page="pagination.perPage"
      :total="pagination.total"
  />
</template>

<script setup>

import VInput from "@/components/ui/v-input/v-input.vue";
import VSelect from "@/components/ui/v-select/v-select.vue";
import TablePagination from "@/components/ui/v-table-new/table-pagination/table-pagination.vue";
import VLoader from "@/components/ui/v-loader/v-loader.vue";
import VTableNew from "@/components/ui/v-table-new/v-table-new.vue";
import {ref} from "vue";

const pagination = ref({
  total: 100,
  perPage: 20,
  currentPage: 1,
})
const isLoading = ref(false)
const mock = ref([
  {
    logo: 'http://placekitten.com/50/50',
    name: 'Береговой',
    id: '47523489067',
    active: 'Да',
    address: 'ул. Днепропетровская, д. 34-45',
  },
  {
    logo: 'http://placekitten.com/50/50',
    name: 'ЖК Новокузнецкий',
    id: '27523489045',
    active: 'Да',
    address: 'Лениниский проспект, д. 117',
  },
  {
    logo: 'http://placekitten.com/50/50',
    name: 'ЖК Длинное название Орлиное гнездо',
    id: '87523489011',
    active: 'Да',
    address: 'ул. Даля, д. 1',
  },
  {
    logo: 'http://placekitten.com/50/50',
    name: 'ЖК Винтерфелл',
    id: '67523489067',
    active: 'Нет',
    address: 'ул. Днепропетровская, д. 34-45',
  },
  {
    logo: 'http://placekitten.com/50/50',
    name: 'ЖК Королевская гавань',
    id: '77523489044',
    active: 'Да',
    address: 'ул. Днепропетровская, д. 34-45',
  },
])
const columns = ref([
  {
    id: 'logo',
    title: 'Лого'
  },
  {
    id: 'name',
    title: 'Название'
  },
  {
    id: 'id',
    title: 'ID'
  },
  {
    id: 'active',
    title: 'Активность'
  },
  {
    id: 'address',
    title: 'Адрес'
  }
])
</script>

<style lang="scss" scoped src="./complexes-list.scss"></style>
