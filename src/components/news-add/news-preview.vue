<template>
  <div class="news-add__preview">
    <v-card class="news-add__preview-card">
      <v-tabs>
        <v-tab title="AMIO">
          <v-tabs
            link-title
            class="news-add__preview-inner-tabs"
            v-model="currentTab"
          >
            <v-tab title="Превью">
              <amio-preview v-bind="{ ...form }" />
            </v-tab>
            <v-tab title="Подробная">
              <amio-detail v-bind="{ ...form }" @openModal="$emit('openModal')" />
            </v-tab>
            <v-tab title="Сторис">
              <amio-stories v-bind="{ ...form }" @openModal="openModal" />
            </v-tab>
          </v-tabs>
        </v-tab>
        <v-tab title="Alphaopen">
          <v-tabs link-title class="news-add__preview-inner-tabs">
            <v-tab title="Превью"> Alphaopen Превью </v-tab>
            <v-tab title="Подробная"> Alphaopen Подробная </v-tab>
            <v-tab title="Сторис"> Alphaopen Сторис </v-tab>
          </v-tabs>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card class="news-add__preview-icon" v-if="currentTab === 'Превью'">
      <select-icon :icon="props.form.icon" @saveIcon="saveIcon" />
    </v-card>
  </div>
</template>

<script>
	import { useQuery } from "@vue/apollo-composable";
	import { computed, ref, onMounted } from "vue";
	import { mask } from 'vue-the-mask'
	import { GET_COMPLEXES } from "../../api/queries/getComplexes";
	import useModal from "../../hooks/useModal";
	import AmioDetail from "../amio-news/amio-detail/amio-detail.vue";
	import AmioPreview from "../amio-news/amio-preview/amio-preview.vue";
	import AmioStories from "../amio-news/amio-stories/amio-stories.vue";
	import SelectBind from "../select-bind/select-bind.vue";
	import SelectIcon from "../select-icon/select-icon.vue";
	import SelectImage from "../select-image/select-image.vue";
	import VAddDocs from "../ui/v-add-docs/v-add-docs.vue";
	import VButton from "../ui/v-button/v-button.vue";
	import VCard from "../ui/v-card/v-card.vue";
	import VInputTags from "../ui/v-input-tags/v-input-tags.vue";
	import VInput from "../ui/v-input/v-input.vue";
	import VModal from "../ui/v-modal/v-modal.vue";
	import VSelect from "../ui/v-select/v-select.vue";
	import VTab from "../ui/v-tabs/v-tab/v-tab.vue";
	import VTabs from "../ui/v-tabs/v-tabs.vue";
	import VTextarea from "../ui/v-textarea/v-input.vue";
	
	export default {
		props:['form'],
		emits: ['openModal'],
		name: "news-preview",
		directives: { mask },
		components: {
			SelectIcon,
			SelectBind,
			SelectImage,
			VAddDocs,
			VButton,
			VModal,
			VInputTags,
			VTextarea,
			AmioDetail,
			AmioStories,
			AmioPreview,
			VTab,
			VTabs,
			VSelect,
			VInput,
			VCard
		},
		setup(props) {
			const { isOpen, openModal, closeModal } = useModal()
			const { isOpen: bindIsOpen, openModal: openBindModal, closeModal: closeBindModal } = useModal()
			const currentTab = ref('Превью')
			const { result: complexesData, loading: complexesLoading } = useQuery(GET_COMPLEXES)
			const complexes = computed(() => {
				return complexesData.value.getComplexes
			})
	
			const types = [
				'Новость',
				'Акция',
				'Оповещение'
			]
	
			// const form = ref({
			// 	date: '',
			// 	type: '',
			// 	complex: '',
			// 	title: '',
			// 	desc: '',
			// 	fullDesc: '',
			// 	phone: '',
			// 	docs: [],
			// 	links: [],
			// 	button: [],
			// 	imgLandscape: null,
			// 	imgLibrary: null,
			// 	icon: null
			// })
	
			const onLoadFiles = (value) => {
				form.value.imgLandscape = {
					id: value.id[0],
					file: value.files.imgLandscape
				}
				form.value.imgLibrary = {
					id: value.id[1],
					file: value.files.imgLibrary
				}
			}
	
			const saveIcon = (value) => {
				form.value.icon = {
					id: value.id,
					file: value.icon
				}
			}
			onMounted(() => {
      const dataForm = {...{...props.form}}
    })
	
			return {
				props,
				types,
				complexes,
				complexesLoading,
				isOpen,
				bindIsOpen,
				currentTab,
				openModal,
				closeModal,
				openBindModal,
				closeBindModal,
				onLoadFiles,
				saveIcon
			}
		}
	}
	</script>
	
	<style lang="scss" src="./style.scss" scoped/>
	