<template>
  <section class="news-add">
    <div class="news-add__title">{{typeTitle ? typeTitle : 'Добавить'}} новость</div>
    <form class="news-add-form">
      
      <v-card class="news-add-form__card-first">
        <v-input v-model="form.date" name="date" type="datetime-local" label="Дата*"/>
        <v-select v-model="form.type" name="type" :options="types" labelSelect="Тип новости"/>
        <v-select v-if="!complexesLoading" v-model="form.complex" name="home" :options="complexes" labelSelect="ЖК"
                  label="UF_NAME"/>
        <div class="show-for" v-if="form.complex" @click="openBindModal">
          <div class="show-for__title">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 4V0H4V4H0V6H4V10H6V6H10V4H6Z" fill="#333333"/>
            </svg>
            Отображать для
          </div>
          <span class="show-for__desc">Дома / Подъезда / Этажа / Помещения</span>
        </div>
        <div class="select-contacts">
          <v-select name="contacts" :options="[1,2]" labelSelect="Контакты"></v-select>
        </div>
      </v-card>
      <v-card class="news-add-form__card-second">
        <v-textarea v-model="form.title" name="name" label="Заголовок*" max-length="130"/>
        <v-textarea v-model="form.desc" name="previewText" label="Текст анонса*" rows="4"
                    max-length="280"/>
        <v-input v-model="form.fullDesc" name="previewText" label="Текст новости*" rows="4"
                 max-length="280"/>
      </v-card>
      <v-card class="news-add-form__card-third">
        <div class="card-row">
          <v-input v-model="form.phone" placeholder="+7" name="phone" label="Телефон" v-mask="'+7 (###) ###-##-##'"/>
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
      <div class="news-add__actions">
        <v-button type="submit" variant="success">Сохранить</v-button>
        <v-button variant="bordered">Сохранить новость и создать ещё</v-button>
        <v-button variant="link">Отмена</v-button>
      </div>
    </form>
    <NewsPreview @openModal = 'openModal' :form="{...form}">
      
    </NewsPreview>
  </section>
  <select-image v-if="isOpen" :isOpen="isOpen" @closeModal="closeModal" @onLoadFiles="onLoadFiles"/>
  <select-bind v-if="bindIsOpen" :isOpen="bindIsOpen" @closeModal="closeBindModal" :complexID="form.complex.ID"
               :complexName="form.complex.UF_NAME"/>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref, onMounted } from "vue";
import { mask } from 'vue-the-mask'
import { GET_COMPLEXES } from "../../api/queries/getComplexes";
import useModal from "../../hooks/useModal";
import AmioDetail from "../amio-news/amio-detail/amio-detail.vue";
import AmioPreview from "../amio-news/amio-preview/amio-preview.vue";
import AmioStories from "../amio-news/amio-stories/amio-stories.vue";
import SelectBind from "../select-bind/select-bind.vue";
import SelectIcon from "../select-icon/select-icon.vue";
import SelectImage from "../select-image/select-image.vue";
import VAddDocs from "../ui/v-add-docs/v-add-docs.vue";
import VButton from "../ui/v-button/v-button.vue";
import VCard from "../ui/v-card/v-card.vue";
import VInputTags from "../ui/v-input-tags/v-input-tags.vue";
import VInput from "../ui/v-input/v-input.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VSelect from "../ui/v-select/v-select.vue";
import VTab from "../ui/v-tabs/v-tab/v-tab.vue";
import VTabs from "../ui/v-tabs/v-tabs.vue";
import VTextarea from "../ui/v-textarea/v-input.vue";
import NewsPreview from "./news-preview.vue";

export default {
  props:[
    'typeTitle',
    'form'
  ],
  name: "news-add",
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
  setup(props) {
    const { isOpen, openModal, closeModal } = useModal()
    const { isOpen: bindIsOpen, openModal: openBindModal, closeModal: closeBindModal } = useModal()
    const currentTab = ref('Превью')

    const { result: complexesData, loading: complexesLoading } = useQuery(GET_COMPLEXES)
    const complexes = computed(() => {
      return complexesData.value?.getComplexes
    })

    const types = [
      'Новость',
      'Акция',
      'Оповещение'
    ]

    const form = ref({
      date: '',
      type: '',
      complex: '',
      title: '',
      desc: '',
      fullDesc: '',
      phone: '',
      docs: [],
      links: [],
      button: [],
      imgLandscape: null,
      imgLibrary: null,
      icon: null
    })

    onMounted(() => {
      const dataForm = {...props.form}
      if(Object.keys(dataForm).length !== 0){
        dataForm.date = dataForm.date.slice(0,16)
        form.value = dataForm
      }
    })
  
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

    return {
      form,
      types,
      complexes,
      complexesLoading,
      isOpen,
      bindIsOpen,
      currentTab,
      openModal,
      closeModal,
      openBindModal,
      closeBindModal,
      onLoadFiles,
      saveIcon,
      
    }
  },

}
</script>

<style lang="scss" src="./style.scss" scoped/>
