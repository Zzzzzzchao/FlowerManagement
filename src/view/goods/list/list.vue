<template>
  <div class="goodsList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="商品分类">
          <Input v-model="formLeft.input1" />
        </FormItem>
        <FormItem label="商品名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <FormItem label="商品状态">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="商品品牌">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="商家编码">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <FormItem label="商品编码">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">查询</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">新增</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导入</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导出</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">批量删除</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">批量上下架</Button>
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
  name: 'goodsList',
  data () {
    return {
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
          title: '商品货号',
          key: 'name'
        },
        {
          title: '商品名称',
          key: 'age'
        },
        {
          title: '商品分类',
          key: 'address'
        },
        {
          title: '商品品牌',
          key: 'address'
        },
        {
          title: '商品简介',
          key: 'address'
        },
        {
          title: '商品标签',
          key: 'address'
        },
        {
          title: '商品单位',
          key: 'address'
        },
        {
          title: '商品状态',
          key: 'address'
        },
        {
          title: '市场价',
          key: 'address'
        },
        {
          title: '一口价',
          key: 'address'
        },
        {
          title: '成本价',
          key: 'address'
        },
        {
          title: '库存信息',
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
.goodsList{
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
