<script>
import { h } from 'vue'

export default {
  name: 'v-table',
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
  setup({ rows }, { slots }) {
    const columns = slots.default(rows)

    return () => h('div', { class: 'table-wrapper' }, [
      h('table', { class: 'table' }, [
        h('thead', { class: 'table__thead' }, [
          h('tr', { class: 'table__tbody-tr' }, [
            Array.from(columns).map((column, index) => {
              return h('th', { class: 'table__thead-th', key: index }, [
                h('div', { class: 'table__thead-cell' }, [
                  (column.children && Object.keys(column.children).length > 2) ?
                      column.children.header({
                        title: column.props.title,
                        prop: column.props.prop
                      })
                      :
                      column.props.title
                ])
              ])
            })
          ])
        ]),
        h('tbody', { class: 'table__tbody' }, [
          Array.from(rows).map((row, index) => {
            return h('tr', { class: 'table__tbody-tr', key: index }, [
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
