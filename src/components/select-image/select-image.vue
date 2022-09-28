<template>
  <v-modal class="modal-select-image" centered @closeModal="$emit('closeModal')">
    <div class="modal-title">Выберите изображение</div>
    <div class="select-image-container">
      <v-filter-and-search class="select-image-filter" :variant="'primary'" @filterTable="filterTable" :filterList="imgCategories"></v-filter-and-search>
      <v-loader v-if="loading"/>
      <div v-else class="select-image-images">
        <div
          :class="['image-item', { 'image-item--active': active === index }]"
          v-for="(image, index) of images"
        >
          <img :src="image.file.SRC" :alt="image.UF_TITLE" @click="selectImage(image.file.SRC, index)">
          <span>{{ image.UF_TITLE }}</span>
        </div>
      </div>
      <div class="select-image-crop">
        <v-crop-image ref="cropperSmall" :img="image"/>
        <v-crop-image ref="cropperBig" size="big" :img="image"/>
      </div>
      <div class="select-image-actions">
        <v-pagination
          v-if="pageInfo.perPage < pageInfo.total"
          v-model="currentPage"
          :perPage="pageInfo.perPage"
          :total="pageInfo.total"
        />
        <v-button variant="link" @click="$emit('closeModal')">Отменить</v-button>
        <v-button variant="success" @click="submit" :disabled="!isDirty" loading>ВЫБРАТЬ ИЗОБРАЖЕНИЕ</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import axios from "axios";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { GET_IMAGES } from "../../api/queries/getImages";
import { GET_IMAGES_CATEGORIES } from "../../api/queries/getImagesCategories";
import usePaginate from "../../hooks/usePaginate";
import VButton from "../ui/v-button/v-button.vue";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VFilterAndSearch from "../ui/v-filter-and-search/v-filter-and-search.vue";
import useModal from "../../hooks/useModal";

export default {
  name: "select-image",
  components: { VLoader, VButton, VCropImage, VPagination, VModal, VFilterAndSearch },
  emits: ['onLoadFiles', 'closeModal'],
  props:{
    imgFilterOpened: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  setup(_, { emit }) {
    const image = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const cropperBig = ref(null)
    const cropperSmall = ref(null)
    const active = ref(null)
    const toast = useToast();
    const { currentPage, perPage, updatePage } = usePaginate(1, 20)
    const { result, loading, refetch } = useQuery(GET_IMAGES, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    const { isOpen: filterPopupImg, openModal: openFilterPopupImg, closeModal: closeFilterPopupImg } = useModal();
    const images = computed(() => {
      return result.value?.getImages.data ?? []
    })
    const pageInfo = computed(() => {
      return result.value?.getImages.paginatorInfo ?? []
    })

    const {result:resultImgCategories} = useQuery(GET_IMAGES_CATEGORIES)

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    updatePage(() => refetch({
      currentPage: currentPage.value,
      perPage: perPage.value

    }))

    const selectImage = (src, idx) => {
      if (!isDirty.value) isDirty.value = true
      active.value = idx
      image.value = src
    }
    const submit = () => {
      if (!isDirty.value) return
      const form = new FormData()
      const { canvas: canvasBig } = cropperBig.value.getResult()
      const { canvas: canvasSmall } = cropperSmall.value.getResult()
      if (canvasBig && canvasSmall) {
        canvasBig.toBlob(blob => {
          form.append('files[]', blob)
          canvasSmall.toBlob(blob => {
            form.append('files[]', blob)
            axios({
              method: 'post',
              url: '/api/v2/master-system/local/helper/file',
              data: form,
            })
              .then(res => {
                toast.success('Изображение выбрано')
                emit('onLoadFiles', {
                  id: res.data.data,
                  files: {
                    imgLandscape: canvasSmall.toDataURL("image/png"),
                    imgLibrary: canvasBig.toDataURL("image/png")
                  }
                })
              })
              .catch(e => {
                toast.error(e.message)
              })
          }, 'image/jpeg');
        }, 'image/jpeg');
      }
    }

    const filterTable = (filter, search) => {
      refetch({
      currentPage: currentPage.value,
      perPage: perPage.value,
      filterStr: filter,
      searchStr: search
    })
    }
    
    return {
      currentPage,
      images,
      loading,
      image,
      cropperBig,
      cropperSmall,
      pageInfo,
      active,
      isDirty,
      selectImage,
      submit,
      imgCategories,
      filterTable,
      filterPopupImg,
      openFilterPopupImg,
      closeFilterPopupImg,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
