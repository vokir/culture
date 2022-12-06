<template>
  <div class="container-content">
    <div class="container-header">
      <v-button
        href="/master-system/news/"
        variant="transparent"
        transparent
      >
        <svg
          class="btn--transparent__svg"
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 1.31434L1.24816 6.31434L-0.00183761 5L4.75 -5.46393e-08L6 1.31434ZM2.48897 5.00919C2.50551 5.00919 6 8.68566 6 8.68566L4.75 10C4.75 10 1.23621 6.31066 1.24816 6.31066L2.48897 5.00919Z"
            fill="white"
          />
        </svg>
        Вернуться к списку новостей
      </v-button>
      <div class="container-header__title">Новости</div>
    </div>
    <div class="news-detail">
      <v-loader v-if="loading" />
      <div
        class="news-detail__info"
        v-else
      >
        <v-card class="news-detail__top">
          <p
            v-if="form.type && form.type.UF_TITLE"
            :class="['news-detail__type', {'news-detail__type--news':form.type.UF_TITLE === 'Новости','news-detail__type--actions':form.type.UF_TITLE === 'Акции','news-detail__type--alerts':form.type.UF_TITLE === 'Оповещения'}]"
          >
            {{ form.type.UF_TITLE }}
          </p>
          <p class="news-detail__title">{{ form.title }}</p>
          <p class="news-detail__date">{{ computedDate(form.date) }}</p>
          <p class="news-detail__subtitle">{{ form.desc }}</p>
          <p
            v-html="form.fullDesc"
            class="news-detail__text"
          ></p>
          <div class="news-detail__links">
            <div
              class="news-detail__row"
              v-if="form.complex.length"
            >
              <span class="news-detail__name news-detail__name-zhk">ЖК</span>
              <span class="news-detail__value news-detail__value-zhk">
                {{ computedZhk }}
              </span>
            </div>
            <div
              class="news-detail__row"
              v-if="form.links.length"
            >
              <span class="news-detail__name news-detail__name-links">Ссылки</span>
              <ul class="news-detail__list">
                <a
                  class="news-detail__value"
                  v-for="link in form.links"
                  :key="link.ID"
                  :href="link.link"
                >
                  {{ link.name }}
                </a>
              </ul>
            </div>
            <div
              class="news-detail__row"
              v-if="form.docs?.length"
            >
              <span class="news-detail__name news-detail__name-docs">Документы</span>
              <ul class="news-detail__list">
                <a
                  class="news-detail__value"
                  :key="doc.ID"
                  v-for="doc in form.docs"
                  :href="doc.file.SRC"
                  download
                >
                  {{ doc.file.ORIGINAL_NAME }}
                </a>
              </ul>
            </div>
            <div
              class="news-detail__row"
              v-if="form.phone"
            >
              <span class="news-detail__name news-detail__name-tel">Телефон</span>
              <a
                href="tel:"
                class="news-detail__value"
              >{{ form.phone }}</a>
            </div>
          </div>
          <div
            class="news-detail__edit"
            @click="openModal"
          >
            <svg
              width="11"
              height="21"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.733677 8.65659L0 11.5L2.68831 10.6585C2.52112 10.1998 2.27473 9.78186 1.96234 9.42657C1.61255 9.06908 1.19236 8.80729 0.733677 8.65659ZM6.68119 2.0975L1.42335 7.83162C1.86004 8.06041 2.26483 8.353 2.62672 8.70279C2.92371 9.08008 3.1723 9.50026 3.36369 9.95125L8.61823 4.22043C8.41473 3.72875 8.13754 3.27776 7.79765 2.88617C7.47206 2.54958 7.09367 2.28339 6.67789 2.0997L6.68009 2.0964L6.68119 2.0975ZM9.68739 0.934837C9.4212 0.648846 9.06041 0.491551 8.68642 0.50035C8.31464 0.50915 7.96045 0.681846 7.70525 0.978837L7.38956 1.32313C7.80975 1.51782 8.19474 1.79391 8.52583 2.1371C8.86022 2.51988 9.13081 2.96207 9.331 3.44276L9.64779 3.09737C9.92058 2.82018 10.0768 2.43299 10.0856 2.026C10.0922 1.61902 9.94808 1.22523 9.68519 0.937036H9.68849L9.68739 0.934837Z"
                fill="#5B6573"
              />
            </svg>

            <span>Редактировать</span>
          </div>
        </v-card>
        <v-card
          v-if="form.houses.length || form.approaches.length || form.floors.length || form.premises.length"
          class="news-detail__bottom"
        >
          <p class="news-detail__label">Отображается для</p>
          <news-for-table :newsInfo="news" />
        </v-card>
      </div>
      <news-preview
        v-model="form"
        hideIcon
      />
    </div>
  </div>
  <news-edit
    v-if="isOpen"
    :formData="form"
    :id="route.params.id"
    @closeModal="closeModal"
  />
</template>

<script>
import NewsEdit from "../../components/news/news-edit/news-edit.vue";
import VCard from "../../components/ui/v-card/v-card.vue";
import VButton from "../../components/ui/v-button/v-button.vue";
import { GET_NEWS_BY_ID } from "../../api/queries/getNewsByID";
import { useLazyQuery } from "@vue/apollo-composable";
import { computed, onMounted, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import VLoader from "../../components/ui/v-loader/v-loader.vue";
import computedDate from "../../helpers/dateFormat";
import NewsPreview from "../../components/news/news-preview/news-preview.vue";
import useModal from "../../hooks/useModal";
import NewsForm from "../../components/news/news-form/news-form.vue";
import computePhone from "../../helpers/phoneFormat";
import getSingular from "../../helpers/getSingular";
import NewsForTable from "../../components/news/bind-rows/bind-rows-table.vue";
import { useNewsStore } from "../../store/newsStore";


export default {
  name: "news-detail",
  components: {
    NewsEdit,
    VLoader,
    VCard,
    VButton,
    NewsPreview,
    NewsForm,
    NewsForTable,
  },
  setup() {
    const route = useRoute();
    const store = useNewsStore()
    const{
      createFormData
    } = store
    const { isOpen, openModal, closeModal } = useModal();
    const form = ref({
      title: '',
      icon: {
        id: null,
        src: null,
        name: null
      },
      desc: '',
      imgLandscape: null,
      imgLibrary: null,
      fullDesc: '',
      phone: '',
      date: '',
      type: {},
      complex: {},
      docs: [],
      links: [],
      button: [],
      houses: [],
      approaches: [],
      floors: [],
      premises: [],
      contacts: [],
      priority: {},
			image: {
        id: null,
        src: null,
        name: null
      },
    });

    const { result, load, onResult, loading, refetch } = useLazyQuery(GET_NEWS_BY_ID, {
      newsID: Number(route.params.id),
    });
    onResult((result) => {
      let data = result.data?.getNewsAt
      if (data) {
       form.value = createFormData(data)
      }
    });

    const news = computed(() => result.value?.getNewsAt ?? []);

    const getComplexName = (name) => name.split(/[«»]/)[1];
    const computedZhk = computed(() => {
      let string = form.value.complex.UF_NAME
      if (form.value.houses?.length === 0) {
        string += " / Все";
      }
      return string
    })

		onBeforeMount(()=>{
			load();
		})

    onMounted(() => {
			refetch()
    })


    return {
      form,
      news,
			isOpen,
      computedZhk,
      loading,
      route,
      computedDate,
      computePhone,
      getComplexName,
      openModal,
      closeModal,
      getSingular
    };
  },

};
</script>

<style lang="scss" src="./style.scss" scoped />
