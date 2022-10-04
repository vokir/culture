<template>
  <v-tags-list
    :label="label"
    :max-tags="maxTags"
    :tags="tags"
    @removeTag="removeTag"
    @openModal="openModal"
  >
    <v-modal
      v-if="isOpen"
      @closeModal="closeModal"
      centered
      class="modal-tags"
    >
      <div class="tags-wrapper__actions">
        <v-input
          v-model="currentTag.name"
          name="text"
          :label="inputLabel"
        />
        <v-input
          class="input-link"
          v-model="currentTag.link"
          name="link"
          :label="inputLabelLink"
        />
        <div
          class="tags-wrapper__actions-add"
          @click="addTag"
          v-if="currentTag.name && currentTag.link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M12.5 3.75L5.625 10.625L2.5 7.5"
              stroke="#4CAF50"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </v-modal>
  </v-tags-list>
</template>

<script>
import { ref } from "vue";
import useModal from "../../../hooks/useModal";
import VCard from "../v-card/v-card.vue";
import VInput from "../v-input/v-input.vue";
import VModal from "../v-modal/v-modal.vue";
import VTagsList from "../v-tags-list/v-tags-list.vue";

export default {
  name: "v-input-tags",
  emits: ['update:modelValue', 'onRemove', 'onAdd'],
  components: { VTagsList, VModal, VCard, VInput },
  props: {
    label: String,
    modelValue: [Array, Object, String],
    inputLabel: String,
    inputLabelLink: String,
    maxTags: Number,
  },
  setup({ modelValue }, { emit }) {
    const { isOpen, openModal, closeModal } = useModal()

    const tags = ref(modelValue)

    const currentTag = ref({
      name: '',
      link: '',
      id: null
    })

    const addedTags = ref([])
    const removedTags = ref([])

    const addTag = () => {
      tags.value.push(currentTag.value)
      addedTags.value.push(currentTag.value)
      emit('onAdd', addedTags.value)
      emit('update:modelValue', tags.value)

      currentTag.value = {
        name: '',
        link: '',
        id: null
      }
      closeModal()
    }
    const removeTag = (index) => {
      let removedItem = tags.value[index]
      let isExists = addedTags.value.find(item => item === removedItem) !== undefined
      if (isExists) {
        addedTags.value.splice(addedTags.value.indexOf(removedItem), 1)
        emit('onAdd', addedTags.value)
        tags.value.splice(index, 1)
      }
      else {
        removedItem = tags.value.splice(index, 1)
        removedTags.value.push(removedItem[0])
        emit('onRemove', removedTags.value)
      }
      emit('update:modelValue', tags.value)
    }

    return {
      tags,
      currentTag,
      isOpen,
      openModal,
      closeModal,
      addTag,
      removeTag,
    }
  }
}
</script>



<style lang="scss" src="./style.scss" scoped/>
