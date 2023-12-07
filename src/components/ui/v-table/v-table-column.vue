<script>
export default {
  name: 'VTableColumn',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: false
    },
    width: {
      type: String,
      required: false
    }
  }
};
</script>
