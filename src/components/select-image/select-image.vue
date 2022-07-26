<template>
  <v-modal v-if="isOpen" class="modal-select-image" centered @closeModal="$emit('closeModal')">
    <div class="modal-title">Выберите изображение</div>
    <div class="select-image-container">
      <v-loader v-if="loading"/>
      <div v-else class="select-image-images">
        <div :class="['image-item', { 'image-item--active': active === index }]" v-for="(image, index) of images">
          <img :src="image.file.SRC" :alt="image.UF_TITLE" @click="selectImage(image.file.SRC, index)">
          <span>{{ image.UF_TITLE }}</span>
        </div>
      </div>
      <div class="select-image-crop">
        <v-crop-image ref="cropperSmall" :img="image"/>
        <v-crop-image ref="cropperBig" size="big" :img="image"/>
      </div>
      <div class="select-image-actions">
        <v-pagination v-if="pageInfo.perPage < pageInfo.total" v-model="currentPage" :perPage="pageInfo.perPage"
                      :total="pageInfo.total"/>
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
import usePaginate from "../../hooks/usePaginate";
import VButton from "../ui/v-button/v-button.vue";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";

export default {
  name: "select-image",
  components: { VLoader, VButton, VCropImage, VPagination, VModal },
  emits: ['onLoadFiles', 'closeModal'],
  props: {
    isOpen: Boolean,
  },
  setup(_, { emit }) {
    const image = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const cropperBig = ref(null)
    const cropperSmall = ref(null)
    const active = ref(null)
    const toast = useToast();
    const { currentPage, perPage, updatePage } = usePaginate(1, 2)
    const { result, loading, refetch } = useQuery(GET_IMAGES, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })

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
              url: '/api/management/local/file',
              data: form,
            })
              .then(res => {
                toast.success('Изображение выбрано')
                emit('onLoadFiles', {
                  id: res.data.response,
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

    const images = computed(() => {
      return result.value ? result.value.getImages.data : false
    })
    const pageInfo = computed(() => {
      return result.value ? result.value.getImages.paginatorInfo : false
    })

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
      submit
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
