import VCropImage from "./v-crop-image.vue";

const Template = (args) => ({
  components: { VCropImage },
  setup() {
    return { args };
  },
  template: '<v-crop-image v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {
  size: "small",
  img: "https://sun9-1.userapi.com/impg/EgA4UcSZILoxzTreULlf-VKglajOdj9waLRl-Q/5wfgs2XJ7zg.jpg?size=1620x2160&quality=95&sign=6c19335488f5f2d6fb5b27c5e18afc0f&type=album ",
};
export default {
  title: "UI Components/v-crop-image",
  component: { VCropImage },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "big"],
    },
  },
};
