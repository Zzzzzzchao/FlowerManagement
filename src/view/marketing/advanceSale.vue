<template>
  <div class="advanceSaleList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="预售活动名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="预售活动区间">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="有效期">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">新增</Button>
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
  name: 'advanceSaleList',
  data () {
    return {
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      tableColumns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '优惠方式',
          key: 'age'
        },
        {
          title: '其他信息',
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
              }, '编辑'),
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
.advanceSaleList{
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
