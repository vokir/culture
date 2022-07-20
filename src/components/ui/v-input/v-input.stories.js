import { ref } from "vue";
import VInput from "./v-input.vue";

const Template = (args) => ({
  components: { VInput },
  setup() {
    const state = ref("");
    return { args, state };
  },
  template: '<v-input v-model="state" v-bind="args">Кнопка</v-input>',
});

export const Primary = Template.bind({});

Primary.args = {
  name: 'input1',
  label: 'Название*',
  maxLength: 10,
  textarea: false,
  rows: 10
};
export default {
  title: "UI Components/v-input",
  component: { VInput },
};
