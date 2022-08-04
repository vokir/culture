<template>
  <section class="news-add">
    <div class="news-add__title">Добавить новость</div>
    <form class="news-add-form">
      <v-card class="news-add-form__card-first">
        <v-input v-model="form.date" name="date" type="date" label="Дата*"/>
        <v-select v-model="form.types" name="type" :options="types" labelSelect="Тип новости" multiple/>
        <v-select v-if="result" name="home" :options="result.getComplexes"  labelSelect="ЖК" label="UF_NAME"/>
        <div class="show-for">
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
          <v-input v-model="form.phone" name="phone" label="Телефон" v-mask="'+7 ### ###-##-##'"/>
          <v-input v-model="form.docs" type="file" name="previewText" label="Документы"/>
        </div>
        <v-input-tags label="Ссылки"/>
        <v-input v-model="form.buttons" name="buttons" label="Кнопка"/>
      </v-card>
    </form>
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
  <div class="news-add__actions">

  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { GET_COMPLEXES } from "../../api/queries/getComplexes";
import AmioDetail from "../amio-news/amio-detail/amio-detail.vue";
import AmioPreview from "../amio-news/amio-preview/amio-preview.vue";
import AmioStories from "../amio-news/amio-stories/amio-stories.vue";
import VCard from "../ui/v-card/v-card.vue";
import VInputTags from "../ui/v-input-tags/v-input-tags.vue";
import VInput from "../ui/v-input/v-input.vue";
import VSelect from "../ui/v-select/v-select.vue";
import VTab from "../ui/v-tabs/v-tab/v-tab.vue";
import VTabs from "../ui/v-tabs/v-tabs.vue";
import {mask} from 'vue-the-mask'
import VTextarea from "../ui/v-textarea/v-input.vue";

export default {
  name: "news-add",
  directives: {mask},
  components: { VInputTags, VTextarea, AmioDetail, AmioStories, AmioPreview, VTab, VTabs, VSelect, VInput, VCard },
  setup() {
    const { result, loading } = useQuery(GET_COMPLEXES)
    const types = [
        'Новости',
        'Акции',
        'Оповещения'
    ]

    const form = ref({
      date: '',
      types: '',
      title: '',
      desc: '',
      fullDesc: '',
      phone: '',
      docs: '',
      links: '',
      buttons: ''
    })

    return {
      form,
      types,
      result,
      loading
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
