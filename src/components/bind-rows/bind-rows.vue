<template>
  <pre>
    {{ bindRows }}
  </pre>
</template>

<script>
import { computed } from "vue";
import _ from 'lodash'

export default {
  name: 'bind-rows',
  props: {
    bind: Object
  },
  setup(props) {


    const bindRows = computed(() => {
      let rows = []

      if (props.bind.premises.length) {
        const premises = props.bind.premises.map(e => ({...e, houseID: e.floor.approache.house.ID }))
        const union = _.unionBy([...premises], 'houseID')
        console.log(union)
      }

      return rows
    })

    return {
      bindRows
    }
  }
}
</script>
