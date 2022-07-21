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

        <v-table-column prop="id" title="ID">
          <template v-slot="{ row }">
            <b>{{ row.id }}</b>
          </template>

        </v-table-column>

        <v-table-column prop="name" title="Name"/>

        <v-table-column prop="rating" title="Rating">
          <template v-slot="{ row, items }">
            {{ row.rating }}
            <b v-if="items.every(item => item.rating <= row.rating)">

              <v-checkbox v-model="check"/>
            </b>
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

export default {
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
        id: 1,
        name: 'Sony',
        rating: 777
      },
      {
        id: 2,
        name: 'Apple',
        rating: 555
      },
      {
        id: 3,
        name: 'Samsung',
        rating: 333
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
