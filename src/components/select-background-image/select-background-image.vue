<template>
  <div class="select-image">
    <v-image-placeholder :image="active" label="Добавить изображение" @openModal="openModal" @deleteImage="deleteImage"/>
    <v-select-image
      v-if="isOpen"
      v-model="active"
      :items="images"
      :loading="loading"
      title="Выберите изображение"
      @closeModal="closeModal"
      @onSelect="selectImage"
      @onSubmit="submit"
    >
      <template #filter>
        <v-filter-and-search
          :filterList="imgCategories"
          class="select-image-filter"
          variant="primary"
          @filterTable="filterTable"
        />
      </template>

      <template #cropper>
        <div class="select-image__crop">
          <v-crop-image ref="cropperSmall" :img="image"/>
        </div>
      </template>

      <template #pagination>
        <v-pagination
          v-if="pageInfo.perPage < pageInfo.total"
          v-model="currentPage"
          :perPage="pageInfo.perPage"
          :total="pageInfo.total"
        />
      </template>

    </v-select-image>
  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import axios from "axios";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { GET_IMAGES } from "../../api/queries/getImages";
import { GET_IMAGES_CATEGORIES } from "../../api/queries/getImagesCategories";
import useModal from "../../hooks/useModal";
import usePaginate from "../../hooks/usePaginate";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VFilterAndSearch from "../ui/v-filter-and-search/v-filter-and-search.vue";
import VImagePlaceholder from "../ui/v-image-placeholder/v-image-placeholder.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VSelectImage from "../ui/v-select-image/v-select-image.vue";

export default {
  name: "select-background-image",
  components: { VImagePlaceholder, VPagination, VCropImage, VFilterAndSearch, VSelectImage },
  emits: ['onLoadFiles', 'closeModal'],
  inheritAttrs: false,
  props: {
    image: {
      type: Object,
      default: () => ({
        id: null,
        src: null,
        name: null
      })
    }
  },
  setup(props, { emit }) {
    const image = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const cropperSmall = ref(null)
    const active = ref(props.image)
    const toast = useToast();
    const {isOpen, openModal, closeModal} = useModal()
    const { currentPage, perPage, updatePage } = usePaginate(1, 20)

    const { result, loading, refetch } = useQuery(GET_IMAGES, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    const images = computed(() => {
      return result.value?.getImages.data ?? []
    })
    const pageInfo = computed(() => {
      return result.value?.getImages.paginatorInfo ?? []
    })

    const { result: resultImgCategories } = useQuery(GET_IMAGES_CATEGORIES)

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    const filterTable = (filter, search) => {
      refetch({
        currentPage: currentPage.value,
        perPage: perPage.value,
        filterStr: filter,
        searchStr: search
      })
    }
    const deleteImage = () => {
      active.value = {
        id: null,
        src: null,
        name: null
      }
      image.value = '/src/assets/images/storyPreview.png'

      emit('saveIcon', active.value)
      toast.success('Изображение удаленно')
    }
    const selectImage = (src) => {
      if (!isDirty.value) isDirty.value = true
      image.value = src
    }

    const submit = () => {
      if (!isDirty.value) return
      const form = new FormData()
      const { canvas: canvasSmall } = cropperSmall.value.getResult()
      if (canvasSmall) {
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
                  image: canvasSmall.toDataURL("image/png"),
                }
              })
            })
            .catch(e => {
              toast.error(e.message)
            })
        }, 'image/jpeg');
      }
    }

    return {
      isOpen,
      images,
      loading,
      active,
      imgCategories,
      currentPage,
      pageInfo,
      image,
      cropperSmall,
      deleteImage,
      openModal,
      closeModal,
      selectImage,
      submit,
      filterTable
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
