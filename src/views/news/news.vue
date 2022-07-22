<template>
  <section class="container">
    <div class="container-header">
      <div class="container-header__title">
        {{ route.name }}
        <div class="container-header__title-add-favorite">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
            <path
                d="M11.5 2L14.4358 8.25387L21 9.25718L16.25 14.1256L17.3711 21L11.5 17.7539L5.62893 21L6.75 14.1256L2 9.25718L8.5642 8.25387L11.5 2Z"
                stroke="white" stroke-opacity="0.5"
            />
          </svg>
        </div>
      </div>
      <div class="container-header__search">
        123
      </div>
      <div class="container-header__action">
        <v-button class="btn--w100" @click="openModal">Добавить новость</v-button>
      </div>
    </div>
    <div class="container-content">
      <v-table :rows="rows">

        <v-table-column prop="choice" title="choice">
          <template v-slot:header="{ prop, title }">
            <v-checkbox v-model="modalState.form.name"/>
          </template>

          <template v-slot="{ row }">
            <v-checkbox v-model="modalState.form.name"/>
          </template>

        </v-table-column>

        <v-table-column prop="settings" title="settings">
          <template v-slot:header="{ prop, title }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M13.91 7.5H16V9.5H13.91C13.7621 10.3683 13.4203 11.1921 12.91 11.91L15.01 13.73L13.57 15.51L11.26 13.5C10.5765 13.9521 9.80717 14.2584 9 14.4V16.5H7V14.41C6.19233 14.2702 5.42264 13.9637 4.74 13.51L2.43 15.51L0.99 13.73L3.09 11.9C2.58701 11.1828 2.24893 10.3632 2.1 9.5H0V7.5H2.09C2.23791 6.6317 2.57972 5.80793 3.09 5.09L0.99 3.27L2.43 1.48999L4.74 3.5C5.42437 3.04958 6.19335 2.74334 7 2.59999V0.5H9V2.59999C9.80717 2.74154 10.5765 3.04792 11.26 3.5L13.57 1.48999L15.01 3.27L12.91 5.09C13.42 5.807 13.762 6.63 13.91 7.5ZM8 11.5C9.65685 11.5 11 10.1569 11 8.5C11 6.84315 9.65685 5.5 8 5.5C6.34315 5.5 5 6.84315 5 8.5C5 10.1569 6.34315 11.5 8 11.5Z"
                    fill="#9E9E9E"/>
            </svg>
          </template>

          <template v-slot="{ row }">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14 0.0195312V2.00954H0V0.0195312H14ZM7.425 3.99953H14V5.98953H0V3.99953H7.425ZM14 7.98953V9.97954H0V7.98953H14Z"
                    fill="#9E9E9E"/>
            </svg>
          </template>

        </v-table-column>

        <v-table-column prop="icon" title="Icon">
          <template v-slot="{ row }">
            <img :src="row.icon" :alt="row.icon">
          </template>
        </v-table-column>
        <v-table-column prop="name" title="Заголовок"/>
        <v-table-column prop="type" title="Тип новости"/>
        <v-table-column prop="date" title="Дата"/>
        <v-table-column prop="complex" title="ЖК"/>
        <v-table-column prop="visibility" title="Отображается для">
          <template v-slot="{row}">
            {{ row.visibility }}
          </template>
        </v-table-column>

      </v-table>
    </div>
  </section>
  <v-modal :show-modal="modalState.isModalShow" @closeModal="closeModal">
    <section class="news-add">
      <div class="news-add__title">Добавить новость</div>
      <div class="news-add-form">
        <form action="">
          <v-card>
            <v-input v-model="modalState.form.date" name="date" label="Дата*"/>
            <v-select options="[1,2]" placeholder="Тип новости"></v-select>
            <v-select options="[1,2]" placeholder="ЖК"></v-select>
            <div class="show-for">
              Отображать для
            </div>
            <v-select options="[1,2]" placeholder="Контакты"></v-select>
          </v-card>
          <v-card>
            <v-input v-model="modalState.form.name" name="name" label="Заголовок*" max-length="130"/>
            <v-input v-model="modalState.form.previewText" name="previewText" label="Текст анонса*" textarea rows="4"
                     max-length="280"/>
            <v-input v-model="modalState.form.newsText" name="previewText" label="Текст новости*" textarea rows="4"
                     max-length="280"/>
          </v-card>
          <v-card>
            <v-input v-model="modalState.form.phone" name="phone" label="Телефон"/>
            <v-input v-model="modalState.form.docs" type="file" name="previewText" label="Документы"/>
            <v-input v-model="modalState.form.links" name="links" label="Ссылки"/>
            <v-input v-model="modalState.form.buttons" name="buttons" label="Кнопка"/>
          </v-card>
        </form>
      </div>
      <div class="news-add__prewiew">

      </div>
    </section>
    <div class="news-add__actions">

    </div>
  </v-modal>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import VButton from "../../components/ui/v-button/v-button.vue";
import VCard from "../../components/ui/v-card/v-card.vue";
import VCheckbox from "../../components/ui/v-checkbox/v-checkbox.vue";
import VInput from "../../components/ui/v-input/v-input.vue";
import VModal from "../../components/ui/v-modal/v-modal.vue";
import VSelect from "../../components/ui/v-select/v-select.vue";
import VTable from "../../components/ui/v-table/v-table.vue";
import VTableColumn from "../../components/ui/v-table/v-table-column.vue";
import gql from 'graphql-tag'

export default {
  apollo: {
    getNews: {
      query: gql`query test {
        getNews(currentPage: 1, perPage: 5){
          data {
            ID,
            UF_NAME
          }
        }
      }`,
      variables: {
        currentPage: 1,
        perPage: 5
      },
      fetchPolicy: 'cache-and-network',
    }
  },
  setup() {
    const route = useRoute()

    const modalState = ref({
      isModalShow: false,
      form: {
        date: '',
        name: '',
        previewText: '',
        newsText: '',
        phone: '',
        docs: '',
        links: '',
        buttons: ''
      }
    })
    const check = ref(false)
    const openModal = () => {
      modalState.value.isModalShow = true
    }

    const closeModal = () => {
      modalState.value.isModalShow = false
    }

    const rows = [
      {
        icon: 'url-ico',
        name: 'Кратковременное отключение горячей воды',
        type: 'Объявления',
        date: '12.06.2022 13:44',
        complex: 'ЖК Железные острова',
        visibility: [12, 13, 15]
      },
      {
        icon: 'url-ico',
        name: 'Проведение сантехнических работ',
        type: 'Объявления',
        date: '12.06.2022 13:44',
        complex: 'ЖК Береговой',
        visibility: [1, 2]
      },
      {
        icon: 'url-ico',
        name: 'Специальные условия при покупке паркинга',
        type: 'Акция',
        date: '12.06.2022 13:44',
        complex: 'ЖК Железные острова',
        visibility: 'Весь ЖК'
      }
    ]

    return {
      route,
      modalState,
      openModal,
      closeModal,
      rows,
      check
    }
  },

  components: { VTable, VCheckbox, VTableColumn, VSelect, VInput, VCard, VModal, VButton }
}
</script>
