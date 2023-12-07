<template>
  <div class="news-preview">
    <v-card class="news-preview__card">
      <v-tabs>
        <v-tab title="AMIO">
          <v-tabs class="news-preview__inner-tabs" link-title>
            <v-tab title="Превью">
              <template v-if="!hideIcon">
                <div class="news-preview__choice-title">Вид</div>
                <div class="news-preview__choice">
                  <v-radio v-model="radio" value="icon">Иконка</v-radio>
                  <v-radio v-model="radio" value="image">Изображение</v-radio>
                </div>
                <select-icon
                  v-if="radio === 'icon'"
                  v-bind="{ ...modelValue }"
                  @save-icon="saveIcon"
                />
                <select-background-image
                  v-if="radio === 'image'"
                  v-bind="{ ...modelValue }"
                  @on-load-files="saveBackground"
                  @save-background="saveBackground"
                />
              </template>
              <amio-preview :variant="radio" v-bind="{ ...modelValue }" />
            </v-tab>
            <v-tab title="Подробная">
              <amio-detail
                :hide-icon="hideIcon"
                v-bind="{ ...modelValue }"
                @open-modal="openModal"
              />
            </v-tab>
            <v-tab title="Сторис">
              <amio-stories
                :hide-icon="hideIcon"
                v-bind="{ ...modelValue }"
                @open-modal="openModal"
              />
            </v-tab>
          </v-tabs>
        </v-tab>
        <v-tab title="Web-ЛК">
          <v-tabs class="news-preview__inner-tabs" link-title>
            <v-tab title="Превью">
              <web-lk-news
                :hide-icon="hideIcon"
                v-bind="{ ...modelValue }"
                @open-modal="openModal"
              />
            </v-tab>
            <v-tab title="Подробная">
              <web-lk-news
                :hide-icon="hideIcon"
                detail
                v-bind="{ ...modelValue }"
                @open-modal="openModal"
              />
            </v-tab>
          </v-tabs>
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
  <select-image v-if="isOpen" @close-modal="closeModal" @on-load-files="onLoadFiles" />
</template>

<script>
import { ref } from 'vue';
import useModal from '../../../hooks/useModal';
import AmioDetail from '../../amio-news/amio-detail/amio-detail.vue';
import AmioPreview from '../../amio-news/amio-preview/amio-preview.vue';
import AmioStories from '../../amio-news/amio-stories/amio-stories.vue';
import SelectBackgroundImage from '../../select-background-image/select-background-image.vue';
import SelectIcon from '../../select-icon/select-icon.vue';
import SelectImage from '../../select-image/select-image.vue';
import VCard from '../../ui/v-card/v-card.vue';
import VRadio from '../../ui/v-radio/v-radio.vue';
import VTab from '../../ui/v-tabs/v-tab/v-tab.vue';
import VTabs from '../../ui/v-tabs/v-tabs.vue';
import WebLkNews from '../../web-lk-news/web-lk-news.vue';

export default {
  name: 'NewsPreview',
  components: {
    SelectBackgroundImage,
    VRadio,
    WebLkNews,
    SelectIcon,
    SelectImage,
    AmioDetail,
    AmioStories,
    AmioPreview,
    VTab,
    VTabs,
    VCard
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    hideIcon: {
      type: Boolean
    }
  },
  emits: ['openModal', 'update:modelValue'],
  setup(props, { emit }) {
    const { isOpen, openModal, closeModal } = useModal();
    const radio = ref('icon');
    const onLoadFiles = (value) => {
      emit('update:modelValue', {
        ...props.modelValue,
        imgLandscape: {
          id: value.id[0],
          file: value.files.imgLandscape
        },
        imgLibrary: {
          id: value.id[1],
          file: value.files.imgLibrary
        }
      });
    };
    const saveBackground = (value) => {
      let newModelValue = props.modelValue;

      if (value.id !== null) {
        (newModelValue.image = {
          id: value?.id[0],
          src: value.files.image
        }),
          (newModelValue.icon = {
            id: null,
            src: null,
            name: null
          });
        emit('update:modelValue', newModelValue);
        // 	emit('update:modelValue', {
        //   ...props.modelValue,
        //   image: {
        //     id: value?.id[0],
        //     src: value.files.image,
        //   },
        //   icon: {
        //     id: null,
        //     src: null,
        //     name: null
        //   }
        // })
      } else {
        (newModelValue.image = {
          id: null,
          src: null
        }),
          (newModelValue.icon = {
            id: null,
            src: null,
            name: null
          });
        emit('update:modelValue', newModelValue);
        // 	emit('update:modelValue', {
        //   ...props.modelValue,
        //   image: {
        //     id: null,
        //     src: null,
        //   },
        //   icon: {
        //     id: null,
        //     src: null,
        //     name: null
        //   }
        // })
      }
    };
    const saveIcon = (value) => {
      let newModelValue = props.modelValue;
      newModelValue.image = {
        id: null,
        src: null
      };
      newModelValue.icon = {
        id: value.id,
        src: value.src,
        name: value.name
      };
      emit('update:modelValue', newModelValue);

      // emit('update:modelValue', {
      //   ...props.modelValue,
      //   image: {
      //     id: null,
      //     src: null,
      //   },
      //   icon: {
      //     id: value.id,
      //     src: value.src,
      //     name: value.name
      //   }
      // })
    };

    return {
      isOpen,
      radio,
      openModal,
      closeModal,
      onLoadFiles,
      saveIcon,
      saveBackground
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
