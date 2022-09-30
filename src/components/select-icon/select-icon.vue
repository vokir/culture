<template>
  <div class="select-icon">
    <v-tags-list
      v-if="active && !active.src"
      label="Добавить иконку"
      @openModal="openModal"
    />
    <div
      class="select-icon__load"
      v-else
    >
      <div class="select-icon__label">
        Добавить иконку
      </div>
      <div class="select-icon__preview">
        <div class="select-icon__preview-icon">
          <img
            :src="active.src"
            :alt="active.name"
          >
        </div>
        <div class="select-icon__preview-name">
          {{ active.name }}
        </div>
        <div
          class="select-icon__preview-delete"
          @click="deleteIcon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M7.91406 2.0835L2.08075 7.91681"
              stroke="#9E9E9E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.08594 2.0835L7.91925 7.91681"
              stroke="#9E9E9E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <v-modal
    v-if="isOpen"
    class="modal-select-icon"
    :title="'Выберите изображение'"
    centered
    @closeModal="closeModal"
  >
    <div class="select-icon-container">
      <v-filter-and-search
        v-model="filter"
        class="select-image-filter"
        :placeholder="'Фильтр + поиск'"
        :variant="'primary'"
        :filterList="imgCategories"
        @filterTable="filterTable"
        @setFilter="setFilter"
        @clearFilter="clearFilter"
        @setSearch="setSearch"
      ></v-filter-and-search>

      <v-loader v-if="loading" />
      <div
        v-else
        class="select-icon-images"
      >
        <div
          :class="['icon-item', { 'icon-item--active': active.id ===  icon.file.ID }]"
          v-for="icon of icons"
          :key="icon.file.ID"
        >
          <img
            :src="icon.file.SRC"
            :alt="icon.UF_TITLE"
            @click="selectIcon(icon.file)"
          >
          <span>{{ icon.UF_TITLE }}</span>
        </div>
      </div>
      <div class="select-icon-crop">
        <v-crop-image
          ref="cropperSmall"
          :img="icon"
          class="cropper-icons"
        />
      </div>
      <div class="select-icon-actions">
        <v-pagination
          v-if="pageInfo.perPage < pageInfo.total"
          v-model="currentPage"
          :perPage="pageInfo.perPage"
          :total="pageInfo.total"
        />
        <v-button
          variant="link"
          @click="$emit('closeModal')"
        >Отменить</v-button>
        <v-button
          variant="success"
          @click="submit"
        >ВЫБРАТЬ ИЗОБРАЖЕНИЕ</v-button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { GET_ICONS } from "../../api/queries/getIcons";
import { GET_IMAGES_CATEGORIES } from "../../api/queries/getImagesCategories";
import useModal from "../../hooks/useModal";
import usePaginate from "../../hooks/usePaginate";
import VButton from "../ui/v-button/v-button.vue";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VModal from "../ui/v-modal/v-modal.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VTagsList from "../ui/v-tags-list/v-tags-list.vue";
import vFilterAndSearch from "../ui/v-filter-and-search/v-filter-and-search.vue";

export default {
  name: "select-icon",
  components: { VTagsList, VLoader, VCropImage, VButton, VPagination, VModal, vFilterAndSearch },
  emits: ['saveIcon'],
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
  setup(props, { emit }) {
    const toast = useToast();
    const icon = ref('/src/assets/images/storyPreview.png')
    const active = ref(props.icon)
    const filter = ref([])
    const search = ref("")

    const { isOpen, openModal, closeModal } = useModal()
    const { currentPage, perPage, updatePage } = usePaginate(1, 20)
    const { result, loading, refetch, load } = useLazyQuery(GET_ICONS, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    updatePage(() => refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    }))

    const selectIcon = (file) => {
      active.value = {
        id: file.ID,
        src: file.SRC,
        name: file.ORIGINAL_NAME
      }
      icon.value = file.SRC
    }

    const deleteIcon = () => {
      active.value = {
        id: null,
        src: null,
        name: null
      }
      icon.value = '/src/assets/images/storyPreview.png'
      emit('saveIcon', active.value)
      toast.success('Иконка удалена')
    }

    const submit = () => {
      if (active.value && active.value.src) {
        emit('saveIcon', active.value)
        toast.success('Иконка выбрано')
      }
    }

    const icons = computed(() => {
      return result.value?.getIcons.data ?? []
    })
    const pageInfo = computed(() => {
      return result.value?.getIcons.paginatorInfo ?? []
    })

    const { result: resultImgCategories } = useQuery(GET_IMAGES_CATEGORIES)

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    watch(isOpen, () => {
      if (!icons.value.length) {
        load()
      }
    })

    watch(() => props.icon, (value) => {
      active.value = value
      icon.value = value.src
    })


    const filterTable = () => {
      let filterArr = filter.value.map(option => option.UF_TITLE)
      refetch({
        currentPage: currentPage.value,
        perPage: perPage.value,
        filterStr: filterArr,
        searchStr: search.value
      })
    }

    const clearFilter = () => {
      filter.value = []
      search.value = ""
    }

    const setSearch = (str) => {
      search.value = str
    }

    const setFilter = (str) => {
      if (str.target?.tagName === 'BUTTON') {
        str = Number(str.target.dataset.filter)
        filter.value = filter.value.filter(option => {
          return option.ID !== str
        })
      }
      else {
        let isExists = filter.value.find(option => option.ID === str.ID) !== undefined
        if (!(isExists)) {
          filter.value.push(str)
        }
        else {
          filter.value = filter.value.filter(option => option !== str)
        }
      }
    }

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
      deleteIcon,
      submit,
      imgCategories,
      filterTable,
      clearFilter,
      setSearch,
      setFilter,
      filter,
    }
  }
}
</script>











<style lang="scss" src="./style.scss" scoped/>
