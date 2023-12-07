<template>
  <v-modal :close-modal-prop="closeModalProp">
    <section class="news-form">
      <div class="news-form__title">{{ title }}</div>
      <form class="news-form__form" @submit.prevent>
        <v-card class="news-form__card-first">
          <v-input v-model="form.date" label="Дата*" name="date" type="datetime-local" />
          <v-select
            v-model="form.type"
            :options="types"
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
        <div class="news-form__actions">
          <v-button type="submit" variant="success" @click="onSave">Сохранить</v-button>
          <v-button v-if="!edit" variant="bordered" @click="onCopy"
            >Сохранить новость и создать ещё
          </v-button>
          <v-button variant="link" @click="onCancel">Отмена</v-button>
        </div>
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
  </v-modal>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import { computed, ref } from 'vue';
import { mask } from 'vue-the-mask';
import { GET_COMPLEXES } from '../../../api/queries/getComplexes';
import { GET_CONTACTS } from '../../../api/queries/getContacts';
import { GET_NEWS_DEGREES } from '../../../api/queries/getNewsDegrees';
import { GET_NEWS_TYPES } from '../../../api/queries/getNewsTypes';
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

export default {
  name: 'NewsForm',
  directives: { mask },
  components: {
    SelectBind,
    VAddDocs,
    VButton,
    VModal,
    VInputTags,
    VTextarea,
    VSelect,
    VInput,
    VCard,
    NewsPreview,
    VMultiSelect
  },
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
    edit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['onSave', 'onCopy', 'onCancel', 'onAddLinks', 'onRemoveLinks'],
  setup({ formData }, { emit }) {
    const currentTab = ref('Превью');
    const { isOpen, openModal, closeModal } = useModal();

    const { result: complexesData } = useQuery(GET_COMPLEXES);
    const complexes = computed(() => {
      return complexesData.value?.getComplexes ?? [];
    });

    const { result: typesData } = useQuery(GET_NEWS_TYPES);
    const types = computed(() => {
      return typesData.value?.getNewsTypes ?? [];
    });

    const { result: contactsData } = useQuery(GET_CONTACTS);
    const contacts = computed(() => {
      return contactsData.value?.getContacts ?? [];
    });
    const { result: priorityData } = useQuery(GET_NEWS_DEGREES);
    const priority = computed(() => {
      return priorityData.value?.getNewsDegrees ?? [];
    });

    const removedLinks = ref([]);
    const addedLinks = ref([]);

    const form = ref(formData);

    const setBind = (value) => {
      form.value.houses = value.houses;
      form.value.approaches = value.approaches;
      form.value.floors = value.floors;
      form.value.premises = value.premises;
    };

    const onSave = () => {
      // emit('onAddLinks', addedLinks.value)
      // emit('onRemoveLinks', removedLinks.value)
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

    return {
      form,
      types,
      contacts,
      complexes,
      currentTab,
      isOpen,
      priority,
      openModal,
      closeModal,
      onSave,
      onCopy,
      onCancel,
      setBind,
      removeLinks,
      addLinks,
      toggleOption
    };
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />
