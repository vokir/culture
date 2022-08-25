<template>
  <div class="select-icon">
    <v-tags-list label="Добавить иконку" @openModal="openModal"/>
  </div>
  <v-modal v-if="isOpen" class="modal-select-icon" centered @closeModal="closeModal">
    <div class="modal-title">Выберите изображение</div>
    <div class="select-icon-container">
      <v-loader v-if="loading"/>
      <div v-else class="select-icon-images">
        <div :class="['icon-item', { 'icon-item--active': active === index }]" v-for="(icon, index) of icons">
          <img :src="icon.file.SRC" :alt="icon.UF_TITLE" @click="selectIcon(icon.file.SRC, index)">
          <span>{{ icon.UF_TITLE }}</span>
        </div>
      </div>
      <div class="select-icon-crop">
        <v-crop-image ref="cropperSmall" :img="icon" class="cropper-icons"/>
      </div>
      <div class="select-icon-actions">
        <v-pagination v-if="pageInfo.perPage < pageInfo.total" v-model="currentPage" :perPage="pageInfo.perPage" :total="pageInfo.total"/>
        <v-button variant="link" @click="$emit('closeModal')">Отменить</v-button>
        <v-button variant="success" @click="submit">ВЫБРАТЬ ИЗОБРАЖЕНИЕ</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { GET_ICONS } from "../../api/queries/getIcons";
import useModal from "../../hooks/useModal";
import usePaginate from "../../hooks/usePaginate";
import VButton from "../ui/v-button/v-button.vue";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VTagsList from "../ui/v-tags-list/v-tags-list.vue";

export default {
  name: "select-icon",
  components: { VTagsList, VLoader, VCropImage, VButton, VPagination, VModal },
  setup() {
    const icon = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const active = ref(null)
    const { isOpen, openModal, closeModal } = useModal()
    const { currentPage, perPage, updatePage } = usePaginate(1, 2)
    const { result, loading, refetch } = useQuery(GET_ICONS, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    updatePage(()=> refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    }))

    const selectIcon = (src, idx) => {
      if (!isDirty.value) isDirty.value = true
      active.value = idx
      icon.value = src
    }

    const submit = () => {
			
    }

    const icons = computed(()=> {
      return result.value ? result.value.getIcons.data : false
    })
    const pageInfo = computed(()=> {
      return result.value ? result.value.getIcons.paginatorInfo : false
    })

    return {
      isOpen,
      icons,
      icon,
      pageInfo,
      currentPage,
      loading,
      active,
      openModal,
      closeModal,
      selectIcon,
      submit,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
