import { ref } from "vue";
import VCheckbox from "./v-checkbox.vue";

const Template = (args) => ({
  components: { VCheckbox },
  setup() {
    const state = ref("");
    return { args, state };
  },
  template: '<v-checkbox v-bind="args" v-model="state"/> {{ state }}',
});

export const Primary = Template.bind({});
Primary.args = {
  name: 'checkbox',
};
export default {
  title: "UI Components/v-checkbox ",
  component: { VCheckbox },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "danger",
        "success",
        "transparent",
        "bordered",
        "gray",
        "link",
      ],
    },
  },
};
