<template>
  <div class="orderList">
    <!-- top -->
    <div class="top">
       <Tabs :animated="false">
        <TabPane label="所有订单"></TabPane>
        <TabPane label="待付款"></TabPane>
        <TabPane label="待发货"></TabPane>
        <TabPane label="已发货"></TabPane>
        <TabPane label="成功订单"></TabPane>
        <TabPane label="已关闭"></TabPane>
        <TabPane label="历史订单"></TabPane>
      </Tabs>
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="订单编号号">
          <Input v-model="formLeft.input1" />
        </FormItem>
        <FormItem label="订单状态">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="会员名称">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="时间区间">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="商品名称">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="收货人">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="联系电话">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">查询</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导出</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">批量打印订单详情</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">批量打印订单快递单</Button>
      </Form>
    </div>
    <!-- table -->
    <div class="table">
      <Table size="small" :columns="tableColumns" :data="tableData"></Table>
      <div class="page">
        <Page :total="100" show-total />
      </div>
    </div>
    <!-- modal -->
    <div v-if="modlaFlg"><InfoModal :defaultData="defaultData" :flg="modlaFlg" @cls="closeModal" /></div>
  </div>
</template>
<script>
import InfoModal from './infoModal.vue'
export default {
  name: 'orderList',
  components: {
    InfoModal
  },
  data () {
    return {
      modlaFlg: false,
      defaultData: '',
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderCode'
        },
        {
          title: '订单金额',
          key: 'orderFee'
        },
        {
          title: '折扣金额',
          key: 'saleFee'
        },
        {
          title: '运费',
          key: 'postFee'
        },
        {
          title: '实付金额',
          key: 'payFee'
        },
        {
          title: '订单状态',
          key: 'status'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          width: 180,
          key: 'address',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.openInfo(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '发货'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [
        {
          name: '123'
        }
      ]
    }
  },
  methods: {
    // 详情
    openInfo (id) {
      this.defaultData = id
      this.modlaFlg = true
    },
    // 关闭弹窗
    closeModal () {
      this.modlaFlg = false
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.orderList{
  height: 100%;
  .top{
    margin-bottom: 10px;
    .ivu-form-item{
      margin-bottom: 14px;
      margin-right: 0px;
    }
    .btn{
      margin-left: 10px;
    }
  }
  .table{
    .page{
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
