import '../src/assets/style/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  decorators: [() => ({ template: '<div style="padding: 3em;"><story/></div>' })],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
