<template>
  <section class="news-add">
    <div class="news-add__title">Добавить новость</div>
    <form class="news-add-form">
      <v-card class="news-add-form__card-first">
        <v-input v-model="form.date" name="date" type="datetime-local" label="Дата*"/>
        <v-select v-model="form.type" name="type" :options="types" labelSelect="Тип новости"/>
        <v-select v-if="!complexesLoading" v-model="form.complex" name="home" :options="complexes"  labelSelect="ЖК" label="UF_NAME"/>
        <div class="show-for" v-if="form.complex">
          Отображать для
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
          <v-input v-model="form.phone" name="phone" label="Телефон" v-mask="'+7 (###) ###-##-##'"/>
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
    </form >
    <div class="news-add__preview">
      <v-card class="news-add__preview-card">
        <v-tabs>
          <v-tab title="AMIO">
            <v-tabs link-title class="news-add__preview-inner-tabs">
              <v-tab title="Превью">
                <amio-preview v-bind="{...form}"/>
              </v-tab>
              <v-tab title="Подробная">
                <amio-detail v-bind="{...form}"/>
              </v-tab>
              <v-tab title="Сторис">
                <amio-stories v-bind="{...form}"/>
              </v-tab>
            </v-tabs>
          </v-tab>
          <v-tab title="Alphaopen">
            <v-tabs link-title class="news-add__preview-inner-tabs">
              <v-tab title="Превью">
                Alphaopen Превью
              </v-tab>
              <v-tab title="Подробная">
                Alphaopen Подробная
              </v-tab>
              <v-tab title="Сторис">
                Alphaopen Сторис
              </v-tab>
            </v-tabs>
          </v-tab>
        </v-tabs>
      </v-card>
    </div>
  </section>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { GET_COMPLEXES } from "../../api/queries/getComplexes";
import useModal from "../../hooks/useModal";
import AmioDetail from "../amio-news/amio-detail/amio-detail.vue";
import AmioPreview from "../amio-news/amio-preview/amio-preview.vue";
import AmioStories from "../amio-news/amio-stories/amio-stories.vue";
import VButton from "../ui/v-button/v-button.vue";
import VCard from "../ui/v-card/v-card.vue";
import VInputTags from "../ui/v-input-tags/v-input-tags.vue";
import VInput from "../ui/v-input/v-input.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VSelect from "../ui/v-select/v-select.vue";
import VTab from "../ui/v-tabs/v-tab/v-tab.vue";
import VTabs from "../ui/v-tabs/v-tabs.vue";
import {mask} from 'vue-the-mask'
import VTextarea from "../ui/v-textarea/v-input.vue";
import VAddDocs from "../ui/v-add-docs/v-add-docs.vue";

export default {
  name: "news-add",
  directives: {mask},
  components: {VAddDocs, VButton, VModal, VInputTags, VTextarea, AmioDetail, AmioStories, AmioPreview, VTab, VTabs, VSelect, VInput, VCard },

  setup() {
    const { isOpen, openModal, closeModal } = useModal()
    const { result: complexesData, loading: complexesLoading } = useQuery(GET_COMPLEXES)

    const complexes = computed(()=>{
      return complexesData.value.getComplexes
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
      button: []
    })

    return {
      form,
      types,
      complexes,
      complexesLoading,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
