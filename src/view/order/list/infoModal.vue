<template>
    <Modal
      v-model="flg"
      title="订单详情"
      :closable="false"
      :styles="{top: '25px'}"
      @on-cancel="close">
      <div class="modal">
        <div>
          <p>当前订单状态</p>
          <Button class="btn" @click="$emit('cls')">修改价格</Button>
          <Button class="btn" @click="$emit('cls')">修改收货地址</Button>
          <Button class="btn" @click="$emit('cls')">关闭订单</Button>
          <Button class="btn" @click="$emit('cls')">备注</Button>
        </div>
        <div>
          <p>买家信息</p>
          <p>会员名称：</p>
          <p>联系电话</p>
          <p>真实姓名：</p>
          <p>收货地址</p>
          <p>买家备注</p>
        </div>
        <div>
          <p>商品信息</p>
          <Table size="small" :columns="tableColumns" :data="tableData"></Table>
        </div>
        <div>
          <p>订单信息</p>
          <p>订单编号</p>
          <p>订单时间</p>
          <p>购物车小计</p>
          <p>运费</p>
          <p>支付方式</p>
          <p>订单可得积分</p>
          <p>订单实收款</p>
        </div>
      </div>
      <div slot="footer">
        <Button @click="$emit('cls')">关闭</Button>
      </div>
  </Modal>
</template>
<script>
import { orderInfo } from '@/api/orderServer'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        status: '', // 密码
        type: '' // 昵称
      },
      tableColumns: [
        {
          title: '商品信息',
          key: 'orderCode'
        },
        {
          title: '商品单价',
          key: 'orderFee'
        },
        {
          title: '购买数量',
          key: 'saleFee'
        },
        {
          title: '小计（元）',
          key: 'postFee'
        }
      ],
      tableData: []
    }
  },
  props: {
    flg: {
      type: Boolean
    },
    defaultData: ''
  },
  created () {
    orderInfo(this.defaultData).then((res) => {
      console.log(res)
    })
  },
  methods: {
    close () {
      this.$emit('cls')
    }
  }
}
</script>

<style lang="less" scoped>
.modal{
  .btn{
    margin-right: 5px;
  }
  p{
    line-height: 32px;
  }
}
</style>
