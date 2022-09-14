<template>
  <section class="container">
    <div class="container-header">
      <div class="container-header__title">
        {{ route.meta.pageTitle }}
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
        <news-search @filterTable="filterTable"/>
      </div>
      <div class="container-header__action">
        <v-button class="btn--w100" @click="openModal">Добавить новость</v-button>
      </div>
    </div>
    <div class="container-content">

      <div class="loading" v-if="loading">Загрузка...</div>
      <v-table v-else :rows="news">

        <v-table-column id="choice" title="check" class="table__thead-th-check">
          <template v-slot:header="{ id, title }">
            <v-checkbox v-model="selectAll" />
          </template>

          <template v-slot="{ row, items }">
            <v-checkbox v-model="selected" :value="row"/>
          </template>

        </v-table-column>

        <v-table-column id="settings" title="settings" class="table__thead-th-settings">
          <template v-slot:header="{ id, title }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M10.9549 9.15814C10.7132 10.2946 9.81951 11.1883 8.68312 11.43C6.51653 11.8907 4.63443 10.008 5.09529 7.84184C5.31324 6.81752 6.34252 5.78814 7.3668 5.57014C9.53297 5.10907 11.4158 6.99137 10.9549 9.15814ZM15.4145 7.33497L13.8296 7.07054C13.717 6.61019 13.554 6.16969 13.3424 5.75791C13.3335 5.74059 13.3356 5.71975 13.3478 5.70459L14.3423 4.47143C14.5581 4.20554 14.5483 3.82299 14.3208 3.56639L13.6905 2.85694C13.462 2.60059 13.0831 2.54639 12.794 2.72899L11.4386 3.58106C10.851 3.17052 10.1865 2.86579 9.47001 2.68624C9.45101 2.68146 9.4366 2.66596 9.43336 2.64661L9.17351 1.08497C9.11785 0.747567 8.82588 0.5 8.48315 0.5H7.53321C7.19117 0.5 6.8982 0.747567 6.84379 1.08497L6.58249 2.64719C6.57925 2.66649 6.56487 2.68195 6.54589 2.6867C5.96604 2.83203 5.4214 3.06138 4.92248 3.36125C4.90567 3.37135 4.88455 3.37061 4.86857 3.3592L3.60581 2.458C3.32801 2.25951 2.94643 2.29055 2.70399 2.53249L2.03289 3.20407C1.79096 3.44652 1.75992 3.82811 1.95893 4.10593L2.86225 5.37122C2.87364 5.38717 2.87443 5.40829 2.86435 5.4251C2.5674 5.92016 2.34043 6.46157 2.19525 7.03615C2.19045 7.05513 2.175 7.06947 2.15572 7.07268L0.584933 7.33499C0.248053 7.39062 0 7.68263 0 8.02539V8.97461C0 9.31734 0.248053 9.60938 0.584933 9.66501L2.15567 9.92729C2.17497 9.93053 2.19045 9.9449 2.19523 9.9639C2.31332 10.433 2.48153 10.8817 2.70267 11.2994C2.71188 11.3169 2.70993 11.338 2.69755 11.3534L1.70793 12.579C1.49288 12.8447 1.50191 13.2275 1.72943 13.4839L2.35929 14.1933C2.5878 14.4501 2.96692 14.5034 3.25597 14.3212L4.60375 13.4746C4.62027 13.4642 4.64132 13.4646 4.65748 13.4755C5.23272 13.8643 5.88164 14.1506 6.57719 14.3212L6.84381 15.915C6.89823 16.2524 7.19117 16.5 7.53321 16.5H8.48315C8.82589 16.5 9.11785 16.2524 9.17351 15.915L9.4338 14.3531C9.43704 14.3337 9.45145 14.3183 9.47045 14.3135C10.0428 14.1702 10.5804 13.9449 11.0746 13.6503C11.0914 13.6403 11.1124 13.6411 11.1283 13.6524L12.4449 14.5928C12.7222 14.792 13.1041 14.7607 13.3463 14.518L14.0177 13.8466C14.2593 13.6049 14.292 13.2236 14.0914 12.9452L13.1541 11.6311C13.1427 11.6152 13.142 11.5941 13.152 11.5773C13.4499 11.0806 13.6781 10.5381 13.8224 9.96094C13.8272 9.94194 13.8427 9.92753 13.862 9.92429L15.4151 9.66497C15.7529 9.60931 16 9.3173 16 8.97456V8.02534C15.9995 7.68263 15.7524 7.39062 15.4145 7.33497Z"
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

        <v-table-column id="icon" title="icon" width="30px">
          <template v-slot="{ row }">
            <img v-if="row.icon" :src="row.icon.file.SRC" :alt="row.icon">
          </template>
        </v-table-column>
        <v-table-column id="UF_NAME" title="Заголовок" width="190px">
          <template v-slot="{row}">
            <router-link class="link" :to="{ name: 'news-detail', params: { id: row.ID } }">
              {{ row.UF_NAME }}
            </router-link>
          </template>
        </v-table-column>
        <v-table-column id="types" title="Тип новости" width="120px">
          <template v-slot="{ row }">
            <span v-for="(type, index) of row.types" :key="index">
              {{ type.UF_TITLE }}
            </span>
          </template>
        </v-table-column>
        <v-table-column id="UF_CREATED_AT" title="Дата" width="80px">
          <template v-slot="{ row }">
            {{ dayjs(row.UF_CREATED_AT).format("DD.MM.YYYY hh:mm") }}
          </template>
        </v-table-column>
        <v-table-column id="complexes" title="ЖК" width="200px">
          <template v-slot="{ row }">
            <div v-for="(complex, index) in row.complexes" :key="index">
              {{ complex.UF_NAME }}
            </div>
          </template>
        </v-table-column>
        <v-table-column id="visibility" title="Отображается для" width="400px">
          <template v-slot="{ row }">
              <news-for-column :newsInfo="row"/>
          </template>
        </v-table-column>
        <v-table-column id="visibility" title="Контакты" width="600px">
          <template v-slot="{ row }">
            <div class="badges-list-contacts">
              <div class="badges-list__row" v-if="row.contacts.length">
                <div
                  class="badges-list__row-wrapper"
                  v-for="(contact, index) in row.contacts.slice(0, 3)"
                >
                  <v-badge
                    :class="{ 'transparent-background': popupIsOpened }"
                    variant="lightblue"
                    :key="'contact-' + index"
                    :text="
                      getFullFio(contact.NAME, contact.LAST_NAME, contact.SECOND_NAME)"/>
                  <v-popup :class="{ 'visibility-hidden': popupIsOpened }" @togglePopup="togglePopup" v-if="row.contacts.slice(0, 3).length - 1 === index" :contacts="row.contacts"
                  />
                </div>
              </div>
            </div>
          </template>
        </v-table-column>
      </v-table>
    </div>
  </section>
  <v-modal v-if="isOpen" @closeModal="closeModal">
    <news-add/>
  </v-modal>
</template>

<script>
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { GET_NEWS } from "../../api/queries/getNews";
import NewsAdd from "../../components/news-add/news-add.vue";
import VBadge from "../../components/ui/v-badge/v-badge.vue";
import VButton from "../../components/ui/v-button/v-button.vue";
import VCheckbox from "../../components/ui/v-checkbox/v-checkbox.vue";
import VCropImage from "../../components/ui/v-crop-image/v-crop-image.vue";
import VModal from "../../components/ui/v-modal/v-modal.vue";
import VTableColumn from "../../components/ui/v-table/v-table-column.vue";
import VTable from "../../components/ui/v-table/v-table.vue";
import useModal from "../../hooks/useModal";
import getFullFio from "../../helpers/getFullFio";
import VPopup from "../../components/ui/v-popup/v-popup.vue";
import getNewsFor from "../../helpers/getNewsFor";
import NewsForColumn from "../../components/news-for/news-for-column.vue";
import NewsSearch from "../../components/news-search/news-search.vue";

export default {
  setup(props, context) {
    const popupIsOpened = ref(false);
    const togglePopup = () => {
      popupIsOpened.value = !popupIsOpened.value;
    };
    const route = useRoute();
    const selected = ref([]);
    const { isOpen, openModal, closeModal } = useModal();

    let { result, loading, variables, refetch } = useQuery(GET_NEWS, {
      currentPage: 1,
      perPage: 20,
    });

    const news = computed(() => {
      return result.value.getNews.data;
    });

    const selectAll = computed({
      get() {
        return selected.value.length === result.value.getNews.data.length;
      },
      set(value) {
        selected.value = [];

        if (value) {
          result.value.getNews.data.forEach((select) => {
            selected.value.push(select);
          });
        }
      },
    });

    const filterTable = (str) => {
      const { result2, onResult:onRes } = useQuery(GET_NEWS, {
      str:str,
    });



    }

    return {
      route,
      isOpen,
      openModal,
      closeModal,
      news,
      loading,
      variables,
      refetch,
      dayjs,
      selectAll,
      selected,
      getFullFio,
      popupIsOpened,
      togglePopup,
      getNewsFor,
      filterTable,
    };
  },

  components: {
    VCropImage,
    NewsAdd,
    VBadge,
    VTable,
    VCheckbox,
    VTableColumn,
    VButton,
    VModal,
    VPopup,
    NewsForColumn,
    NewsSearch,
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />
