<template>
  <div class="labelList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="标签名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">查询</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">新增</Button>
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
  name: 'labelList',
  data () {
    return {
      formLeft: {
        input1: ''
      },
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标签编号',
          key: 'name'
        },
        {
          title: '标签名称',
          key: 'name'
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
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
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
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.labelList{
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
