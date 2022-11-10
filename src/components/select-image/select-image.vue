<template>
  <v-select-image
    v-model="active"
    :items="images"
    :loading="loading"
    title="Выберите изображение"
    @closeModal="$emit('closeModal')"
    @onSelect="selectImage"
    @onSubmit="submit"
  >
    <template #filter>
			<!-- <v-image-filter
				:fields="fields"
				@filterTable="filterTable"
				@updateFields="newFields => updateFields(newFields)"
				@resetclearFilter="resetclearFilter"
				@selectFilter="selectFilter"
			/> -->
      <!-- <v-filter-and-search
        class="select-image-filter"
        v-model="filter"
        :searchPlaceholderProp="'поиск'"
        :filterPlaceholderProp="'Фильтр'"
        :variant="'primary'"
        :filterList="imgCategories"
        @filterTable="filterTable"
        @setFilter="setFilter"
        @clearFilter="clearFilter"
        @setSearch="setSearch"
      /> -->
    </template>
    <template #cropper>
      <v-crop-image ref="cropperSmall" :img="image"/>
      <v-crop-image ref="cropperBig" :img="image" size="big"/>
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
import { useQuery } from "@vue/apollo-composable";
import axios from "axios";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { GET_IMAGES } from "../../api/queries/getImages";
import { GET_IMAGE_CATEGORIES } from "../../api/queries/getImageCategories";
import useModal from "../../hooks/useModal";
import usePaginate from "../../hooks/usePaginate";
import VCropImage from "../ui/v-crop-image/v-crop-image.vue";
import VFilterAndSearch from "../ui/v-filter-and-search/v-filter-and-search.vue";
import VLoader from "../ui/v-loader/v-loader.vue";
import VPagination from "../ui/v-pagination/v-pagination.vue";
import VSelectImage from "../ui/v-select-image/v-select-image.vue";
import VImageFilter from "../news/image-filter/image-filter.vue"
import { useNewsStore } from "../../store/newsStore";
import {imageFieldsPromise} from '../../config/apolloClient.config'


export default {
  name: "select-image",
  components: { VSelectImage, VLoader, VCropImage, VPagination, VFilterAndSearch, VImageFilter },
  emits: ['onLoadFiles', 'closeModal'],
  setup(_, { emit }) {
    const image = ref('/src/assets/images/storyPreview.png')
    const isDirty = ref(false)
    const cropperBig = ref(null)
    const cropperSmall = ref(null)
    const active = ref({
      id: null,
      src: null,
      name: null
    })
    const toast = useToast();
    const filter = ref([])
    const search = ref("")

		const store = useNewsStore()
		const fields = ref([])

		imageFieldsPromise.then(schemaFields => {
			const filtersName = ['UF_TITLE','category']
			schemaFields.map(field => {
				if(filtersName.includes(field.name)){
					let newField = {
						name: field.name,
						label: field.description,
						checked: false,
						order: fields.value.length
					}
					switch (field.name) {
						case 'UF_TITLE':
							newField.type = 'string'
							newField.value = ""
							break;
						case 'category':
							newField.type = 'multi-select',
								newField.load = store.loadImageCategories,
								newField.result = computed(() => store.imageCategories),
								newField.value = []
								newField.checked = true
							break;
						default:
							break;
					}
					fields.value.push(newField)
				}
			})
		})

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

    const { result: resultImgCategories } = useQuery(GET_IMAGE_CATEGORIES)

    const imgCategories = computed(() => {
      return resultImgCategories.value?.getImageCategories ?? [];
    });

    updatePage(() => refetch({
      currentPage: currentPage.value,
      perPage: perPage.value
    }))

    const selectImage = (src) => {
      if (!isDirty.value) isDirty.value = true
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
      setSearch,
      clearFilter,
      setFilter,
      filter
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
