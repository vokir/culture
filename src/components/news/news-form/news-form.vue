<template>
  <v-modal :closeModalProp="closeModalProp">
    <section class="news-form">
      <div class="news-form__title">{{ title }}</div>
      <form class="news-form__form" @submit.prevent>
        <v-card class="news-form__card-first">
          <v-input v-model="form.date" name="date" type="datetime-local" label="Дата*"/>
          <v-select v-model="form.type" name="type" :options="types" label="name" labelSelect="Тип новости"/>
          <v-select
            v-if="!complexesLoading"
            v-model="form.complex"
            name="home"
            :options="complexes"
            labelSelect="ЖК"
            label="UF_NAME"
          />
          <div class="show-for" v-if="form.complex" @click="openModal">
            <div class="show-for__title">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4V0H4V4H0V6H4V10H6V6H10V4H6Z" fill="#333333"/>
              </svg>
              Отображать для
            </div>
            <span class="show-for__desc">Дома / Подъезда / Этажа / Помещения</span>
          </div>
          <div class="select-contacts">
            <v-select name="contacts" :options="[1,2]" labelSelect="Контакты"/>
          </div>
        </v-card>
        <v-card class="news-form__card-second">
          <v-textarea
            v-model="form.title"
            name="name"
            label="Заголовок*"
            max-length="130"
          />
          <v-textarea
            v-model="form.desc"
            name="previewText"
            label="Текст анонса*"
            rows="4"
            max-length="280"
          />
          <v-input
            v-model="form.fullDesc"
            name="previewText"
            label="Текст новости*"
            rows="4"
            max-length="280"
          />
        </v-card>
        <v-card class="news-form__card-third">
          <div class="card-row">
            <v-input
              v-model="form.phone"
              placeholder="+7"
              name="phone"
              label="Телефон"
              v-mask="'+7 (###) ###-##-##'"
            />
            <v-add-docs
              label="Документы"
              :max-tags="3"
              v-model="form.docs"
            />
          </div>
          <v-input-tags
            label="Ссылки"
            input-label="Текст ссылки"
            inputLabelLink="Ссылка"
            v-model="form.links"
          />
          <v-input-tags
            label="Кнопка"
            input-label="Текст кнопки"
            inputLabelLink="Ссылка"
            :max-tags="1"
            v-model="form.button"
          />
        </v-card>
        <div class="news-form__actions">
          <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
          <v-button v-if="!edit" variant="bordered" @click="onCopy">Сохранить новость и создать ещё</v-button>
          <v-button variant="link" @click="onCancel">Отмена</v-button>
        </div>
      </form>
      <news-preview v-model="form"/>
    </section>
    <select-bind
      v-if="isOpen"
      :complexID="form.complex.ID"
      :complexName="form.complex.UF_NAME"
      @closeModal="closeModal"
    />
  </v-modal>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { mask } from 'vue-the-mask'
import { GET_COMPLEXES } from "../../../api/queries/getComplexes";
import useModal from "../../../hooks/useModal";
import AmioDetail from "../../amio-news/amio-detail/amio-detail.vue";
import AmioPreview from "../../amio-news/amio-preview/amio-preview.vue";
import AmioStories from "../../amio-news/amio-stories/amio-stories.vue";
import NewsPreview from "../news-preview/news-preview.vue";
import SelectBind from "../../select-bind/select-bind.vue";
import SelectIcon from "../../select-icon/select-icon.vue";
import SelectImage from "../../select-image/select-image.vue";
import VAddDocs from "../../ui/v-add-docs/v-add-docs.vue";
import VButton from "../../ui/v-button/v-button.vue";
import VCard from "../../ui/v-card/v-card.vue";
import VInputTags from "../../ui/v-input-tags/v-input-tags.vue";
import VInput from "../../ui/v-input/v-input.vue";
import VModal from "../../ui/v-modal/v-modal.vue";
import VSelect from "../../ui/v-select/v-select.vue";
import VTab from "../../ui/v-tabs/v-tab/v-tab.vue";
import VTabs from "../../ui/v-tabs/v-tabs.vue";
import VTextarea from "../../ui/v-textarea/v-textarea.vue";

export default {
  name: "news-form",
  directives: { mask },
  components: {
    SelectIcon,
    SelectBind,
    SelectImage,
    VAddDocs,
    VButton,
    VModal,
    VInputTags,
    VTextarea,
    AmioDetail,
    AmioStories,
    AmioPreview,
    VTab,
    VTabs,
    VSelect,
    VInput,
    VCard,
    NewsPreview
  },
  emits: ['onSave', 'onCopy', 'onCancel'],
  props: {
    title: {
      type: String,
      required: false,
      default: 'Добавить новость'
    },
    formData: {
      type: Object,
      required: false,
      default: () => ({
        title: '',
        icon: null,
        desc: '',
        imgLandscape: null,
        imgLibrary: null,
        fullDesc: '',
        phone: '',
        date: '',
        type: {},
        complex: '',
        docs: [],
        links: [],
        button: [],
        houses: [],
        approaches: [],
        floors: [],
        premises: [],
      })
    },
    closeModalProp: {
      type: Boolean,
      required: false,
      default: false
    },
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup({ formData }, { emit }) {
    const currentTab = ref('Превью')
    const { isOpen, openModal, closeModal } = useModal()

    const { result: complexesData, loading: complexesLoading } = useQuery(GET_COMPLEXES)
    const complexes = computed(() => {
      return complexesData.value?.getComplexes
    })

    const types = [
      {
        id: 1,
        name: 'Новости'
      },
      {
        id: 2,
        name: 'Акции'
      },
      {
        id: 3,
        name: 'Оповещения'
      }
    ]

    const form = ref(formData)

    const onLoadFiles = (value) => {
      form.value.imgLandscape = {
        id: value.id[0],
        file: value.files.imgLandscape
      }
      form.value.imgLibrary = {
        id: value.id[1],
        file: value.files.imgLibrary
      }
    }

    const saveIcon = (value) => {
      form.value.icon = {
        id: value.id,
        file: value.icon
      }
    }

    const onSave = () => {
      emit('onSave', form.value)
    }

    const onCopy = () => {
      emit('onCopy', form.value)
      clearForm()
    }

    const onCancel = () => {
      emit('onCancel')
      clearForm()
    }

    const clearForm = () => {
      form.value = {
        title: '',
        icon: null,
        desc: '',
        imgLandscape: null,
        imgLibrary: null,
        fullDesc: '',
        phone: '',
        date: '',
        type: {},
        complex: '',
        docs: [],
        links: [],
        button: [],
        houses: [],
        approaches: [],
        floors: [],
        premises: [],
      }

    }

    return {
      form,
      types,
      complexes,
      complexesLoading,
      currentTab,
      isOpen,
      openModal,
      closeModal,
      onLoadFiles,
      saveIcon,
      onSave,
      onCopy,
      onCancel,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
