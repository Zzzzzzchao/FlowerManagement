<template>
    <Modal
      v-model="modal1"
      title="新增标签"
      @on-ok="ok"
      @on-cancel="cancel">
      新增标签弹窗
  </Modal>
</template>
<script>
export default {
  data () {
    return {
      modal1: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
