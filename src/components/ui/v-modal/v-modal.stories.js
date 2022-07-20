import { ref } from "vue";
import VModal from "./v-modal.vue";
import VButton from "../v-button/v-button.vue";

const Template = (args) => ({
  components: { VModal, VButton },
  setup() {
    const isModalOpen = ref(false)
    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value
    }
    return { args, isModalOpen, toggleModal };
  },
  template: '<v-button @click="toggleModal" @closeModal="toggleModal">Открыть</v-button><v-modal :showModal="isModalOpen" v-bind="args" @closeModal="toggleModal">Modal content</v-modal>',
});

export const Primary = Template.bind({});
Primary.args = {
  centered: false,
};
export default {
  title: "UI Components/v-modal",
  component: { VModal },
};
