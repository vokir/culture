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
        <v-tab title="Web-ЛК">
          <v-tabs link-title class="news-preview__inner-tabs">
            <v-tab title="Превью">
              <web-lk-news v-bind="{ ...modelValue }" @openModal="openModal"/>
            </v-tab>
            <v-tab title="Подробная">
              <web-lk-news v-bind="{ ...modelValue }" @openModal="openModal" detail/>
            </v-tab>
          </v-tabs>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card class="news-preview__icon" v-if="currentTab === 'Превью' && !hideIcon">
      <select-icon @saveIcon="saveIcon" v-bind="{ ...modelValue }"/>
    </v-card>
  </div>
  <select-image
    v-if="isOpen"
    @closeModal="closeModal"
    @onLoadFiles="onLoadFiles"
    no-landscape
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
  import WebLkNews from "../../web-lk-news/web-lk-news.vue";
	
	export default {
		name: "news-preview",
		components: {
      WebLkNews,
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
		  modelValue: Object,
      hideIcon: Boolean
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
            src: value.src,
            name: value.name
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
