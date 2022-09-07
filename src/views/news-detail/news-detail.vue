<template>
  <div class="container">
    <div class="container-header">
      <router-link class="link" :to="{ name: 'news' }"
        ><VButton src="/news/" variant="transparent" transparent>
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
          Вернуться к списку новостей</VButton
        >
      </router-link>

      <div class="container-header__title">Новости</div>
    </div>
    <div class="container-content">
      <div class="news">
        <VCard class="news__top">
          <p v-if="form.type?.length" class="news__type">
            {{ form.type}}
          </p>
          <p class="news__title">{{ form.UF_NAME }}</p>
          <p class="news__date">{{ computeDate(form.date) }}</p>
          <p class="news__subtitle">{{ form.desc }}</p>
          <p v-html="form.fullDesc" class="news__text"></p>
          <div class="news__links">
            <div class="news__row" v-if="form.complex?.length">
              <span class="news__name news__name-zhk">ЖК</span>
              <span class="news__value news__value-zhk">
                {{ filteredZhk }}
              </span>
            </div>
            <div class="news__row" v-if="form.complex?.length">
              <span class="news__name news__name-links">Ссылки</span>
              <span class="news__value"></span>
            </div>
            <div class="news__row" v-if="form.docs?.length">
              <span class="news__name news__name-docs">Документы</span>
              <ul class="news__list">
                <a
                  :key="doc.ID"
                  v-for="doc in form.docs"
                  :href="doc.file.SRC"
                  download
                  class="news__value"
                  >{{ doc.file.ORIGINAL_NAME }}</a
                >
              </ul>
            </div>
            <div class="news__row" v-if="form.phone">
              <span class="news__name news__name-tel">Телефон</span>
              <a href="tel:" class="news__value">{{
                form.phone
              }}</a>
            </div>
          </div>
          <div class="news__edit" @click="openModal">
            <svg
              width="11"
              height="21"
              viewBox="0 0 11 12"
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
        </VCard>
        <VCard v-if="form.houses?.length | form.approaches?.length | form.floors?.length | form.premises?.length" class="news__bottom">
          <p class="news__label">Отображается для</p>
          <NewsForTable v-bind:newsInfo="newsInfo" />
        </VCard>
      </div>
      <NewsPreview v-bind:form="form"> </NewsPreview>
    </div>
  </div>
  <v-modal v-if="isOpen" @closeModal="closeModal">
    <news-add v-bind:typeTitle="typeTitle" v-bind:form="form" />
  </v-modal>
</template>

<script>
import VCard from "../../components/ui/v-card/v-card.vue";
import VButton from "../../components/ui/v-button/v-button.vue";
import { GET_NEWS_BY_ID } from "../../api/queries/getNewsByID";
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import computeDate from "../../helpers/dateFormat";
import NewsPreview from "../../components/news-add/news-preview.vue";
import arrowRightSvg from "../../assets/images/icons/arrow-right.svg";
import editSvg from "../../assets/images/icons/edit.svg";
import infoSvg from "../../assets/images/icons/info.svg";
import VModal from "../../components/ui/v-modal/v-modal.vue";
import useModal from "../../hooks/useModal";
import NewsAdd from "../../components/news-add/news-add.vue";
import computePhone from "../../helpers/phoneFormat";
import getSingular from "../../helpers/getSingular";
import NewsForTable from "../../components/news-for/news-for-table.vue";

export default {
  setup() {
    const typeTitle = ref("Редактировать");
    const route = useRoute();

    const { isOpen, openModal, closeModal } = useModal();

    const getComplexName = (name) => name.split(/[«»]/)[1];

    const news = computed(() => result.value?.getNewsAt ?? []);

    const form = ref({});


    let filteredZhk = ref();

    let newsInfo = ref({})
    const { result, load, onResult } = useLazyQuery(GET_NEWS_BY_ID, {
      newsID: parseInt(route.params.id),
    });

    load();

    onResult((result) => {
      if (result.data?.getNewsAt) {
        newsInfo.value = result.data.getNewsAt;
        form.value.date = newsInfo.value.UF_CREATED_AT;
        form.value.type = getSingular(newsInfo.value.types[0]?.UF_TITLE);
        form.value.complex = newsInfo.value.complexes[0]?.UF_NAME;
        form.value.title = newsInfo.value.UF_NAME;
        form.value.desc = newsInfo.value.UF_PREVIEW_TEXT;
        form.value.fullDesc = newsInfo.value.UF_TEXT;
        form.value.phone = computePhone(newsInfo.value.UF_PHONE);
        form.value.docs = newsInfo.value.documents;
        form.value.premises = newsInfo.value.premises;
        form.value.houses = newsInfo.value.houses
        form.value.approaches = newsInfo.value.approaches
        form.value.floors = newsInfo.value.floors
        // form.value.links = newsInfo
        form.value.buttonText = newsInfo.value.UF_BTN_TEXT
        form.value.buttonLink = newsInfo.value.UF_BTN_LINK
        // form.value.imgLandscape = newsInfo.value.imgLandscape?.SRC;
        // form.value.imgLibrary = newsInfo.value.imgLibrary?.SRC;
        form.value.icon = {
          name: newsInfo.value.icon?.file?.ORIGINAL_NAME,
          src: newsInfo.value.icon?.file?.SRC,
        };

        filteredZhk.value = form.value.complex;

        if (newsInfo.value.houses?.length === 0) {
          filteredZhk.value += " / Все";
        }
      }
    });
    return {
      form,
      news,
      computeDate,
      computePhone,
      getComplexName,
      arrowRightSvg,
      editSvg,
      infoSvg,
      openModal,
      closeModal,
      isOpen,
      getSingular,
      filteredZhk,
      typeTitle,
      newsInfo,
    };
  },
  name: "news-detail",
  components: {
    VCard,
    VButton,
    NewsPreview,
    VModal,
    NewsAdd,
    NewsForTable,
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />
