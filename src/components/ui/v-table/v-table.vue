<script>
import {h, useSlots} from 'vue'

export default {
  name: 'v-table',
  props: {
    rows: {
      type: Array,
      required: true
    },
    activeRowClass: {
      type: String,
      required: false,
      default: 'table__tbody-tr--selected'
    }
  },
  setup(props, {emit}) {
    const slots = useSlots()
    let columns = slots.default(props.rows)
    if (slots.columns) {
      slots.columns(props.row)[0].children
        .filter(child => child.props.checked)
        .map(child => columns.push(child))
    }

    return () => h('div', {class: 'table-wrapper'}, [
      h('table', {class: 'table'}, [
        h('thead', {class: 'table__thead'}, [
          h('tr', {class: 'table__thead-tr'}, [
            Array.from(columns).map((column, index) => {
              console.log(column)
              return h('th', {
                class: ['table__thead-th', column.props?.class],
                style: {width: column.props.width},
                key: index
              }, [
                h('div', {class: 'table__thead-cell'}, [
                  (column.children && Object.keys(column.children).length > 2) ?
                    column.children.header({
                      title: column.props.title,
                      id: column.props.id
                    })
                    :
                    column.props.title
                ])
              ])
            })
          ])
        ]),
        h('tbody', {class: 'table__tbody'}, [
          Array.from(props.rows).map((row, index) => {
            return h('tr', {
              class: ['table__tbody-tr', {[props.activeRowClass]: row.selected}],
              key: index,
              onClick(event) {
                emit('rowClick', {event, row})
              }
            }, [
              Array.from(columns).map((column, index) => {
                return h('td', {class: 'table__tbody-td', key: index}, [
                  h('div', {class: 'table__thead-cell'}, [
                    column.children ? column.children.default({row, items: props.rows}) : row[column.props.id]
                  ])
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

<style lang="scss" scoped src="./style.scss"/>
