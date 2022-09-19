<template>
  <div class="news-preview">
    <v-card class="news-preview__card">
      <v-tabs>
        <v-tab title="AMIO">
          <v-tabs
            link-title
            class="news-preview__inner-tabs"
            v-model="currentTab"
          >
            <v-tab title="Превью">
              <amio-preview v-bind="{ ...modelValue }" />
            </v-tab>
            <v-tab title="Подробная">
              <amio-detail v-bind="{ ...modelValue }" @openModal="openModal" />
            </v-tab>
            <v-tab title="Сторис">
              <amio-stories v-bind="{ ...modelValue }" @openModal="openModal" />
            </v-tab>
          </v-tabs>
        </v-tab>
        <v-tab title="Alphaopen">
          <v-tabs link-title class="news-preview__inner-tabs">
            <v-tab title="Превью"> Alphaopen Превью </v-tab>
            <v-tab title="Подробная"> Alphaopen Подробная </v-tab>
            <v-tab title="Сторис"> Alphaopen Сторис </v-tab>
          </v-tabs>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card class="news-preview__icon" v-if="currentTab === 'Превью'">
      <select-icon @saveIcon="saveIcon"/>
    </v-card>
  </div>
  <select-image
    v-if="isOpen"
    @closeModal="closeModal"
    @onLoadFiles="onLoadFiles"
  />
</template>

<script>
	import { ref } from "vue";
	import useModal from "../../../hooks/useModal";
	import AmioDetail from "../../amio-news/amio-detail/amio-detail.vue";
	import AmioPreview from "../../amio-news/amio-preview/amio-preview.vue";
	import AmioStories from "../../amio-news/amio-stories/amio-stories.vue";
	import SelectIcon from "../../select-icon/select-icon.vue";
	import SelectImage from "../../select-image/select-image.vue";
	import VCard from "../../ui/v-card/v-card.vue";
	import VTab from "../../ui/v-tabs/v-tab/v-tab.vue";
	import VTabs from "../../ui/v-tabs/v-tabs.vue";
	
	export default {
		name: "news-preview",
		components: {
			SelectIcon,
			SelectImage,
			AmioDetail,
			AmioStories,
			AmioPreview,
			VTab,
			VTabs,
			VCard
		},
		emits: ['openModal', 'update:modelValue'],
		props: {
		  modelValue: Object
    },
		setup({ modelValue }, { emit }) {
			const { isOpen, openModal, closeModal } = useModal()
			const currentTab = ref('Превью')

			const onLoadFiles = (value) => {
        emit('update:modelValue', {
          ...modelValue,
          imgLandscape: {
            id: value.id[0],
            file: value.files.imgLandscape
          },
          imgLibrary: {
            id: value.id[1],
            file: value.files.imgLibrary
          },
        })
			}
	
			const saveIcon = (value) => {
        emit('update:modelValue', {
          ...modelValue,
          icon: {
            id: value.id,
            file: value.icon
          }
        })
			}

			return {
				isOpen,
				currentTab,
				openModal,
				closeModal,
        onLoadFiles,
        saveIcon
			}
		}
	}
	</script>
	
	<style lang="scss" src="./style.scss" scoped/>
