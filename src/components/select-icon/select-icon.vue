<template>
  <div class="select-icon">
    <v-image-placeholder :image="active" label="Добавить иконку" @deleteImage="deleteIcon" @openModal="openModal"/>
  </div>
  <v-select-image
    v-if="isOpen"
    v-model="active"
    :items="icons"
    :loading="loading"
    title="Выберите иконку"
    @closeModal="closeModal"
    @onSelect="selectIcon"
    @onSubmit="submit"
  >
    <template #filter>
      <v-filter-and-search
        v-model="filter"
        class="select-image-filter"
        :searchPlaceholderProp="'поиск'"
          :filterPlaceholderProp="'Фильтр'"
        :variant="'primary'"
        :filterList="imgCategories"
        @filterTable="filterTable"
        @setFilter="setFilter"
        @clearFilter="clearFilter"
        @setSearch="setSearch"
      />
    </template>
    <template #cropper>
      <div class="select-icon__icon">
        <img :src="defaultImage" alt="icon">
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
</template>

<script>
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { GET_ICONS } from "../../api/queries/getIcons";
import { GET_IMAGES_CATEGORIES } from "../../api/queries/getImagesCategories";
import useModal from "../../hooks/useModal";
import usePaginate from "../../hooks/usePaginate";
import vFilterAndSearch from "../ui/v-filter-and-search/v-filter-and-search.vue";
import VImagePlaceholder from "../ui/v-image-placeholder/v-image-placeholder.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VSelectImage from "../ui/v-select-image/v-select-image.vue";

export default {
  name: "select-icon",
  components: { VSelectImage, VImagePlaceholder, VPagination, vFilterAndSearch },
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
    const defaultImage = ref('/src/assets/images/storyPreview.png')
    const active = ref(props.icon)
    const filter = ref([])
    const search = ref("")
    const { isOpen, openModal, closeModal } = useModal()
    const { currentPage, perPage, updatePage } = usePaginate(1, 28)
    const { result, loading, refetch, load } = useLazyQuery(GET_ICONS, {
      currentPage: currentPage.value,
      perPage: perPage.value
    })
    updatePage(() => refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    }))

    const selectIcon = (src) => {
      defaultImage.value = src
    }

    const deleteIcon = () => {
      active.value = {
        id: null,
        src: null,
        name: null
      }
      defaultImage.value = '/src/assets/images/storyPreview.png'

      emit('saveIcon', active.value)
      toast.success('Иконка удалена')
    }

    const submit = () => {
      if (active.value && active.value.src) {
        emit('saveIcon', active.value)
        toast.success('Иконка выбрана')
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
      defaultImage.value = value.src ?? '/src/assets/images/storyPreview.png'
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
      clearFilter,
      setSearch,
      setFilter,
      filter,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
