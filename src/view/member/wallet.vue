<template>
  <div class="memberWallet">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="会员名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="充值日期">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="充值状态">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导出</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">满送规则定义</Button>
      </Form>
    </div>
    <!-- table -->
    <div class="table">
      <Table size="small" :columns="tableColumns" :data="tableData"></Table>
      <div class="page">
        <Page :total="100" show-total />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'memberWallet',
  data () {
    return {
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      tableColumns: [
        {
          title: '会员账号',
          key: 'name'
        },
        {
          title: '会员名称',
          key: 'age'
        },
        {
          title: '账户总额',
          key: 'address'
        },
        {
          title: '可以用余额',
          key: 'address'
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
                    this.show(params.index)
                  }
                }
              }, '明细')
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
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.memberWallet{
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
