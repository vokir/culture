<template>
  <v-button @click="state.increment()">{{ state.counter }}</v-button>
  <br>
  <v-button @click="open = true">открыть попап</v-button>
  <br>
  <v-input type="text" name="name" v-model="message" textarea label="Название*"/>
  <br>
  <v-crop-image v-model="imgRes" size="big" :img="img"/>
  <v-modal :showModal="open" centered @closeModal="close">Modal content</v-modal>
  <br>
  <v-checkbox v-model:checked="check" name="check"/>
  {{ check }}
</template>

<script>
import { ref } from 'vue'
import { useState } from '../../store'

import VCheckbox from "../../components/ui/v-checkbox/v-checkbox.vue";
import VModal from "../../components/ui/v-modal/v-modal.vue";
import VButton from '../../components/ui/v-button/v-button.vue'
import VInput from '../../components/ui/v-input/v-input.vue'
import VCropImage from "../../components/ui/v-crop-image/v-crop-image.vue";

export default {
  setup() {
    const message = ref('')
    const check = ref(false)
    let imgRes = ref()
    let open = ref(false)
    const state = useState()
    state.randomizeCounter()
    const img = 'https://sun9-1.userapi.com/impg/EgA4UcSZILoxzTreULlf-VKglajOdj9waLRl-Q/5wfgs2XJ7zg.jpg?size=1620x2160&quality=95&sign=6c19335488f5f2d6fb5b27c5e18afc0f&type=album';
    const close = () => {
      open.value = !open.value
    }
    return {
      state,
      message,
      img,
      imgRes,
      open,
      close,
      check
    }
  },

  components: {
    VSelect,
    VCheckbox,
    VModal,
    VCropImage,
    VButton,
    VInput,
  }
}
</script>
