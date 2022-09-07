import VButton from "./v-button.vue";

const Template = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<v-button v-bind="args">Кнопка</v-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  variant: "primary",
};
export default {
  title: "UI Components/v-button",
  component: { VButton },
  decorators: [
    () => ({
      template:
          '<div style="padding: 3em; background: #F2F4F5;"><story/></div>',
    }),
  ],
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
