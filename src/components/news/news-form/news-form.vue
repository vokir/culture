<template>
  <v-modal :close-modal-prop="closeModalProp">
    <template #title>{{ title }}</template>
    <section class="news-form">
      <form class="news-form__form" @submit.prevent>
        <v-card class="news-form__card-first">
          <v-input v-model="form.date" label="Дата*" name="date" type="datetime-local" />
          <v-select
            v-model="form.type"
            :options="store.newsTypes"
            label="UF_TITLE"
            label-select="Тип новости"
            name="type"
            placeholder="Выберите тип новости"
          />
          <div class="select-priority">
            <v-select
              v-model="form.priority"
              :options="priority"
              label="UF_TITLE"
              label-select="Степень важности"
              name="priority"
              placeholder="Выберите степень важности"
            />
          </div>
          <v-select
            v-model="form.complex"
            :options="complexes"
            label="UF_NAME"
            label-select="ЖК"
            name="home"
            placeholder="Выберите ЖК"
          />
          <div v-if="form.complex" class="show-for" @click="form.complex.ID ? openModal() : {}">
            <div class="show-for__title">
              <svg
                fill="none"
                height="10"
                viewBox="0 0 10 10"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M6 4V0H4V4H0V6H4V10H6V6H10V4H6Z"
                  fill="#333333"
                  fill-rule="evenodd"
                />
              </svg>
              Отображать для
            </div>
            <span class="show-for__desc">Дома / Подъезда / Этажа / Помещения</span>
          </div>
          <div class="select-contacts">
            <v-multi-select
              v-model="form.contacts"
              :options="contacts"
              :variant="'primary'"
              label="FULL_NAME"
              label-select="Контакты"
              name="contacts"
              placeholder="Выберите контакты"
              @toggle-option="toggleOption"
            />
          </div>
        </v-card>
        <v-card class="news-form__card-second">
          <v-textarea v-model="form.title" label="Заголовок*" max-length="130" name="name" />
          <v-textarea
            v-model="form.desc"
            label="Текст анонса*"
            max-length="280"
            name="previewText"
            rows="4"
          />
          <v-textarea
            v-model="form.fullDesc"
            label="Текст новости*"
            max-length="380"
            name="previewText"
            rows="4"
          />
        </v-card>
        <v-card class="news-form__card-third">
          <div class="card-row">
            <v-input
              v-model="form.phone"
              v-mask="'+7 (###) ###-##-##'"
              label="Телефон"
              name="phone"
              placeholder="+7"
            />
            <v-add-docs v-model="form.docs" :max-tags="3" label="Документы" />
          </div>
          <v-input-tags
            v-model="form.links"
            input-label="Текст ссылки"
            input-label-link="Ссылка"
            label="Ссылки"
            @on-remove="removeLinks"
            @on-add="addLinks"
          />
          <v-input-tags
            v-model="form.button"
            :max-tags="1"
            input-label="Текст кнопки"
            input-label-link="Ссылка"
            label="Кнопка"
          />
        </v-card>
      </form>
      <news-preview v-model="form" />
    </section>
    <select-bind
      v-if="isOpen"
      :approaches="form.approaches"
      :complex-i-d="form.complex.ID"
      :complex-name="form.complex.UF_NAME"
      :floors="form.floors"
      :houses="form.houses"
      :premises="form.premises"
      @on-cancel="closeModal"
      @on-save="setBind"
    />
    <template #actions>
      <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
      <v-button v-if="!editMode" variant="bordered" @click="onCopy">
        Сохранить новость и создать ещё
      </v-button>
      <v-button variant="link" @click="onCancel">Отмена</v-button>
    </template>
  </v-modal>
</template>

<script setup>
import { ref } from 'vue';
import useModal from '../../../hooks/useModal';
import NewsPreview from '../news-preview/news-preview.vue';
import SelectBind from '../../select-bind/select-bind.vue';
import VAddDocs from '../../ui/v-add-docs/v-add-docs.vue';
import VButton from '../../ui/v-button/v-button.vue';
import VCard from '../../ui/v-card/v-card.vue';
import VInputTags from '../../ui/v-input-tags/v-input-tags.vue';
import VInput from '../../ui/v-input/v-input.vue';
import VModal from '../../ui/v-modal/v-modal.vue';
import VSelect from '../../ui/v-select/v-select.vue';
import VTextarea from '../../ui/v-textarea/v-textarea.vue';
import VMultiSelect from '../../ui/v-multi-select/v-multi-select.vue';
import { mask } from 'vue-the-mask';
import { useNewsStore } from '@/store/news/index.js';

const emit = defineEmits(['onSave', 'onCopy', 'onCancel', 'onAddLinks', 'onRemoveLinks']);
const props = defineProps({
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
      priority: {},
      docs: [],
      links: [],
      button: [],
      houses: [],
      approaches: [],
      floors: [],
      premises: [],
      contacts: [],
      image: {
        id: null,
        src: null,
        name: null
      }
    })
  },
  closeModalProp: {
    type: Boolean,
    required: false,
    default: false
  },
  editMode: {
    type: Boolean,
    required: false,
    default: false
  }
});
const vMask = mask;

const { isOpen, openModal, closeModal } = useModal();

const removedLinks = ref([]);
const addedLinks = ref([]);

const store = useNewsStore();
store.getNewsType();

const form = ref(props.formData);

const setBind = (value) => {
  form.value.houses = value.houses;
  form.value.approaches = value.approaches;
  form.value.floors = value.floors;
  form.value.premises = value.premises;
};

const onSave = () => {
  emit('onSave', form.value, addedLinks.value, removedLinks.value);
};

const onCopy = () => {
  emit('onCopy', form.value);
  clearForm();
};

const onCancel = () => {
  emit('onCancel');
  clearForm();
};

const clearForm = () => {
  form.value = {
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
    priority: {},
    docs: [],
    links: [],
    button: [],
    houses: [],
    approaches: [],
    floors: [],
    premises: [],
    contacts: [],
    image: {
      id: null,
      src: null,
      name: null
    }
  };
};

const removeLinks = (links) => {
  removedLinks.value = links;
};

const addLinks = (links) => {
  addedLinks.value = links;
};

const toggleOption = (target, contacts) => {
  form.value.contacts = contacts.filter((contact) => contact.ID !== target.ID);
};
</script>

<style lang="scss" scoped src="./style.scss" />
