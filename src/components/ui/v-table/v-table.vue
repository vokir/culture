<script>
import { h, resolveComponent, ref, onUpdated } from 'vue'
import VCheckbox from "../v-checkbox/v-checkbox.vue";

export default {
  name: 'v-table',
  components: { VCheckbox },
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
  setup({ rows }, { slots }) {
    const columns = slots.default(rows)
    const VCheckbox = resolveComponent('VCheckbox')


    return () => h('div', { class: 'table-wrapper' }, [
      h('table', { class: 'table' }, [
        h('thead', { class: 'table__thead' }, [
          h('tr', { class: 'table__tbody-tr' }, [
            h('th', { class: 'table__thead-th' }, [
              h(VCheckbox)
            ]),
            h('th', { class: 'table__thead-th' }, [
              h('svg', {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "17",
                viewBox: "0 0 16 17",
                fill: "none"
              }, [
                h('path', {
                  'fill-rule': "evenodd",
                  'clip-rule': "evenodd",
                  d: "M13.91 7.5H16V9.5H13.91C13.7621 10.3683 13.4203 11.1921 12.91 11.91L15.01 13.73L13.57 15.51L11.26 13.5C10.5765 13.9521 9.80717 14.2584 9 14.4V16.5H7V14.41C6.19233 14.2702 5.42264 13.9637 4.74 13.51L2.43 15.51L0.99 13.73L3.09 11.9C2.58701 11.1828 2.24893 10.3632 2.1 9.5H0V7.5H2.09C2.23791 6.6317 2.57972 5.80793 3.09 5.09L0.99 3.27L2.43 1.48999L4.74 3.5C5.42437 3.04958 6.19335 2.74334 7 2.59999V0.5H9V2.59999C9.80717 2.74154 10.5765 3.04792 11.26 3.5L13.57 1.48999L15.01 3.27L12.91 5.09C13.42 5.807 13.762 6.63 13.91 7.5ZM8 11.5C9.65685 11.5 11 10.1569 11 8.5C11 6.84315 9.65685 5.5 8 5.5C6.34315 5.5 5 6.84315 5 8.5C5 10.1569 6.34315 11.5 8 11.5Z",
                  fill: "#9E9E9E"
                })
              ])
            ]),
            Array.from(columns).map((column, index) => {
              return h('th', { class: 'table__thead-th', key: index }, column.props.title)
            })
          ])
        ]),
        h('tbody', { class: 'table__tbody' }, [
          Array.from(rows).map((row, index) => {
            return h('tr', { class: 'table__tbody-tr', key: index }, [
              h('td', { class: 'table__thead-td' }, [
                h(VCheckbox)
              ]),
              h('th', { class: 'table__thead-th' }, [
                h('svg', {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "14",
                  height: "10",
                  viewBox: "0 0 14 10",
                  fill: "none"
                }, [
                  h('path', {
                    'fill-rule': "evenodd",
                    'clip-rule': "evenodd",
                    d: "M14 0.0195312V2.00954H0V0.0195312H14ZM7.425 3.99953H14V5.98953H0V3.99953H7.425ZM14 7.98953V9.97954H0V7.98953H14Z",
                    fill: "#9E9E9E"
                  })
                ])
              ]),
              Array.from(columns).map((column, index) => {
                return h('td', { class: 'table__tbody-td', key: index }, [
                  column.children ? column.children.default({ row, items: rows }) : row[column.props.prop]
                ])
              })
            ])
          })
        ])
      ])
    ])
  }
};
</script>
<style lang="scss" src="./style.scss" scoped/>
