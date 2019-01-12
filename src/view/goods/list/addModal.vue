<template>
    <Modal
      v-model="modal1"
      title="新增商品"
      @on-ok="ok"
      @on-cancel="cancel">
      新增商品弹窗
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
