<template>
  <div class="tags-wrapper">
    <div v-if="label" class="tags-wrapper__label">
      {{ label }}
    </div>
    <ul class="tags-wrapper__list">
      <li class="tags-wrapper__item" v-for="(tag, index) of tags" >
        {{ tag.name }}
        <div class="tags-wrapper__remove" @click="removeTag(index)">
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" >
            <path d="M7.125 1.875L1.87502 7.12498" stroke="#868D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.875 1.875L7.12498 7.12498" stroke="#868D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </li>
      <li class="tags-wrapper__add" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2 2.8V0H2.8V2.8H0V4.2H2.8V7H4.2V4.2H7V2.8H4.2Z" fill="#1058D0"/>
        </svg>
        Добавить
      </li>
    </ul>
      <v-modal :show-modal="isOpen" @closeModal="closeModal" centered>
        <div class="tags-wrapper__actions">
          <v-input v-model="currentTag.name" name="text" label="Текст ссылки" />
          <v-input class="input-link" v-model="currentTag.link" name="link" label="Ссылка"/>
          <div class="tags-wrapper__actions-add" @click="addTag">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M12.5 3.75L5.625 10.625L2.5 7.5" stroke="#4CAF50" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </v-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import useModal from "../../../hooks/useModal";
import VCard from "../v-card/v-card.vue";
import VInput from "../v-input/v-input.vue";
import VModal from "../v-modal/v-modal.vue";
export default {
  name: "v-input-tags",
  components: { VModal, VCard, VInput },
  props: {
    label: String,
  },
  setup() {
    const [isOpen, openModal, closeModal] = useModal()

    const tags = ref([])
    const currentTag = ref({
      name: '',
      link: ''
    })

    const addTag = () => {
      if (currentTag.value.name && currentTag.value.link) {
        tags.value.push({...currentTag.value})
        currentTag.value = {
          name: '',
          link: ''
        }
        closeModal()
      }
    }
    const removeTag = (index) => {
      tags.value.splice(index, 1)
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
