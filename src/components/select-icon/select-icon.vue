<template>
  <div class="select-icon">
    <v-tags-list v-if="!isDirty" label="Добавить иконку" @openModal="openModal"/>
    <div class="select-icon__load" v-else>
      <div class="select-icon__label">
        Добавить иконку
      </div>
      <div class="select-icon__preview">
        <div class="select-icon__preview-icon">
          <img :src="active.icon" :alt="active.name">
        </div>
        <div class="select-icon__preview-name">
          {{ active.name }}
        </div>
        <div class="select-icon__preview-delete" @click="deleteIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7.91406 2.0835L2.08075 7.91681" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.08594 2.0835L7.91925 7.91681" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <v-modal v-if="isOpen" class="modal-select-icon" centered @closeModal="closeModal">
    <div class="modal-title">Выберите изображение</div>
    <div class="select-icon-container">
      <v-loader v-if="loading"/>
      <div v-else class="select-icon-images">
        <div :class="['icon-item', { 'icon-item--active': active.id ===  icon.file.ID }]" v-for="icon of icons"
             :key="icon.file.ID">
          <img :src="icon.file.SRC" :alt="icon.UF_TITLE" @click="selectIcon(icon.file)">
          <span>{{ icon.UF_TITLE }}</span>
        </div>
      </div>
      <div class="select-icon-crop">
        <v-crop-image ref="cropperSmall" :img="icon" class="cropper-icons"/>
      </div>
      <div class="select-icon-actions">
        <v-pagination v-if="pageInfo.perPage < pageInfo.total" v-model="currentPage" :perPage="pageInfo.perPage"
                      :total="pageInfo.total"/>
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
  emits: ['saveIcon'],
  setup(_, { emit }) {
    const icon = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const active = ref({
      id: null,
      icon: null,
      name: null
    })
    const { isOpen, openModal, closeModal } = useModal()
    const { currentPage, perPage, updatePage } = usePaginate(1, 2)
    const { result, loading, refetch } = useQuery(GET_ICONS, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    updatePage(() => refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    }))

    const selectIcon = (file) => {
      if (!isDirty.value) isDirty.value = true
      active.value = {
        id: file.ID,
        icon: file.SRC,
        name: file.ORIGINAL_NAME
      }
      icon.value = file.SRC
    }

    const deleteIcon = () => {
      active.value = {
        id: null,
        icon: null,
        name: null
      }
      icon.value = '/src/assets/images/storyPreview.png'
      isDirty.value = false
      emit('saveIcon', active.value)
    }

    const submit = () => {
      if (isDirty.value && active.value) emit('saveIcon', active.value)
    }

    const icons = computed(() => {
      return result.value ? result.value.getIcons.data : false
    })
    const pageInfo = computed(() => {
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
      isDirty,
      openModal,
      closeModal,
      selectIcon,
      deleteIcon,
      submit,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
