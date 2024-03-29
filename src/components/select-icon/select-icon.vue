<template>
  <div class="select-icon">
    <v-image-placeholder
      :image="active"
      label="Добавить иконку"
      @delete-image="deleteIcon"
      @open-modal="openModal"
    />
  </div>
  <v-select-image
    v-if="isOpen"
    v-model="active"
    :items="store.icons"
    :loading="loading"
    title="Выберите иконку"
    @close-modal="onCloseModal"
    @on-select="selectIcon"
    @on-submit="submit"
  >
    <template #filter>
      <v-icon-filter
        ref="filterRef"
        :fields="fields"
        @filter-table="filterTable"
        @update-fields="(newFields) => updateFields(newFields)"
      />
    </template>
    <template #cropper>
      <div class="select-icon__icon">
        <img :src="defaultImage" alt="icon" />
      </div>
    </template>
    <template #pagination>
      <v-pagination
        v-if="pageInfo.perPage < pageInfo.total"
        v-model="currentPage"
        :per-page="pageInfo.perPage"
        :total="pageInfo.total"
      />
    </template>
  </v-select-image>
</template>

<script>
import { useLazyQuery, useQuery } from '@vue/apollo-composable';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import useModal from '../../hooks/useModal';
import usePaginate from '../../hooks/usePaginate';
import VImagePlaceholder from '../ui/v-image-placeholder/v-image-placeholder.vue';
import VPagination from '../ui/v-pagination/v-pagination.vue';
import VSelectImage from '../ui/v-select-image/v-select-image.vue';
import VIconFilter from '../news/icon-filter/icon-filter.vue';

export default {
  name: 'SelectIcon',
  components: { VSelectImage, VImagePlaceholder, VPagination, VIconFilter },
  inheritAttrs: false,
  props: {
    icon: {
      type: Object,
      default: () => ({
        id: null,
        src: null,
        name: null
      })
    }
  },
  emits: ['saveIcon'],
  setup(props, { emit }) {
    const toast = useToast();
    const defaultImage = ref('/src/assets/images/storyPreview.png');
    const active = ref(props.icon);
    const filter = ref([]);
    const { isOpen, openModal, closeModal } = useModal();
    const { currentPage, perPage, updatePage } = usePaginate(1, 28);
    const { result, loading, refetch, load } = useLazyQuery(GET_ICONS, {
      currentPage: currentPage.value,
      perPage: perPage.value
    });
    updatePage(() =>
      refetch({
        currentPage: currentPage.value,
        perPage: perPage.value
      })
    );

    const selectIcon = (src) => {
      defaultImage.value = src;
    };

    const deleteIcon = () => {
      active.value = {
        id: null,
        src: null,
        name: null
      };
      defaultImage.value = '/src/assets/images/storyPreview.png';

      emit('saveIcon', active.value);
      toast.success('Иконка удалена');
    };

    const submit = () => {
      if (active.value && active.value.src) {
        emit('saveIcon', active.value);
        toast.success('Иконка выбрана');
      }
    };

    const icons = computed(() => {
      return result.value?.getIcons.data ?? [];
    });
    const pageInfo = computed(() => {
      return result.value?.getIcons.paginatorInfo ?? [];
    });

    const { result: resultImgCategories } = useQuery(GET_IMAGE_CATEGORIES);

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    watch(isOpen, () => {
      if (!icons.value.length) {
        load();
      }
    });

    watch(
      () => props.icon,
      (value) => {
        active.value = value;
        defaultImage.value = value.src ?? '/src/assets/images/storyPreview.png';
      }
    );

    const store = useNewsStore();
    const fields = ref([]);
    const filterRef = ref();

    iconFieldsPromise.then((schemaFields) => {
      const filtersName = ['UF_TITLE', 'category'];
      schemaFields.map((field) => {
        if (filtersName.includes(field.name)) {
          let newField = {
            name: field.name,
            label: field.description,
            checked: false,
            order: fields.value.length
          };
          switch (field.name) {
            case 'UF_TITLE':
              newField.type = 'string';
              newField.value = '';
              newField.checked = true;
              break;
            case 'category':
              (newField.type = 'multi-select'),
                (newField.load = store.loadImageCategories),
                (newField.result = computed(() => store.imageCategories)),
                (newField.value = []);
              newField.checked = true;
              break;
            default:
              break;
          }
          fields.value.push(newField);
        }
      });
    });

    const filterTable = (search) => {
      store.variablesIcons.searchStr = search;
      store.variablesIcons.name = fields.value.find((field) => field.name === 'UF_TITLE')?.value;
      store.variablesIcons.categories = fields.value
        .filter((field) => field.name === 'category' && field.value?.length)
        .map((field) => field.value.map((value) => value.ID.toString()))[0];
    };

    const updateFields = (newFields) => {
      fields.value = newFields;
    };

    const onCloseModal = () => {
      store.variablesIcons = {
        currentPage: 1,
        perPage: 100
      };
      closeModal();
    };

    return {
      isOpen,
      icons,
      defaultImage,
      pageInfo,
      currentPage,
      loading,
      active,
      openModal,
      closeModal,
      selectIcon,
      deleteIcon,
      submit,
      imgCategories,
      filterTable,
      filter,
      updateFields,
      fields,
      store,
      onCloseModal,
      filterRef
    };
  }
};
</script>

<style lang="scss" scoped src="./style.scss" />
