<template>
  <v-select-image
    v-model="active"
    :items="store.images"
    :loading="loading"
    title="Выберите изображение"
    @close-modal="$emit('closeModal')"
    @on-select="selectImage"
    @on-submit="submit"
  >
    <template #filter>
      <v-image-filter
        :fields="fields"
        @filter-table="filterTable"
        @update-fields="(newFields) => updateFields(newFields)"
      />
    </template>
    <template #cropper>
      <v-crop-image ref="cropperSmall" :img="image" />
      <v-crop-image ref="cropperBig" :img="image" size="big" />
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
import { useQuery } from '@vue/apollo-composable';
import axios from 'axios';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { GET_IMAGES } from '../../api/queries/getImages';
import { GET_IMAGE_CATEGORIES } from '../../api/queries/getImageCategories';
import usePaginate from '../../hooks/usePaginate';
import VCropImage from '../ui/v-crop-image/v-crop-image.vue';
import VLoader from '../ui/v-loader/v-loader.vue';
import VPagination from '../ui/v-pagination/v-pagination.vue';
import VSelectImage from '../ui/v-select-image/v-select-image.vue';
import VImageFilter from '../news/image-filter/image-filter.vue';
import { useNewsStore } from '../../store/newsStore';
import { imageFieldsPromise } from '../../config/apolloClient.config';

export default {
  name: 'SelectImage',
  components: { VSelectImage, VLoader, VCropImage, VPagination, VImageFilter },
  emits: ['onLoadFiles', 'closeModal'],
  setup(_, { emit }) {
    const toast = useToast();
    const store = useNewsStore();

    const image = ref('/src/assets/images/storyPreview.png');
    const isDirty = ref(false);
    const cropperBig = ref(null);
    const cropperSmall = ref(null);
    const active = ref({
      id: null,
      src: null,
      name: null
    });
    const filter = ref([]);
    const fields = ref([]);

    const { currentPage, perPage, updatePage } = usePaginate(1, 20);

    const { result, loading, refetch } = useQuery(GET_IMAGES, {
      currentPage: currentPage.value,
      perPage: perPage.value
    });

    const pageInfo = computed(() => {
      return result.value?.getImages.paginatorInfo ?? [];
    });

    const { result: resultImgCategories } = useQuery(GET_IMAGE_CATEGORIES);

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    updatePage(() =>
      refetch({
        currentPage: currentPage.value,
        perPage: perPage.value
      })
    );

    const selectImage = (src) => {
      if (!isDirty.value) isDirty.value = true;
      image.value = src;
    };
    const submit = () => {
      if (!isDirty.value) return;
      const form = new FormData();
      const { canvas: canvasBig } = cropperBig.value.getResult();
      const { canvas: canvasSmall } = cropperSmall.value.getResult();
      if (canvasBig && canvasSmall) {
        canvasBig.toBlob((blob) => {
          form.append('files[]', blob);
          canvasSmall.toBlob((blob) => {
            form.append('files[]', blob);
            axios({
              method: 'post',
              url: '/api/v2/master-system/local/helper/file',
              data: form
            })
              .then((res) => {
                toast.success('Изображение выбрано');
                emit('onLoadFiles', {
                  id: res.data.data,
                  files: {
                    imgLandscape: canvasSmall.toDataURL('image/png'),
                    imgLibrary: canvasBig.toDataURL('image/png')
                  }
                });
              })
              .catch((e) => {
                toast.error(e.message);
              });
          }, 'image/jpeg');
        }, 'image/jpeg');
      }
    };

    imageFieldsPromise.then((schemaFields) => {
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
      store.variablesImages.searchStr = search;
      store.variablesImages.name = fields.value.find((field) => field.name === 'UF_TITLE')?.value;
      store.variablesImages.categories = fields.value
        .filter((field) => field.name === 'category' && field.value?.length)
        .map((field) => field.value.map((value) => value.ID.toString()))[0];
    };

    const updateFields = (newFields) => {
      fields.value = newFields;
    };

    return {
      store,
      currentPage,
      loading,
      image,
      cropperBig,
      cropperSmall,
      pageInfo,
      active,
      isDirty,
      imgCategories,
      filter,
      fields,
      selectImage,
      submit,
      filterTable,
      updateFields
    };
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />
