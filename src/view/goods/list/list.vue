<template>
  <div class="goodsList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" label-position="right" :label-width="80" inline>
        <FormItem label="商品分类" style="width:200px;">
          <Select v-model="formLeft.input1" class="search-col">
            <Option v-for="item in 10" :value="item" :key="`search-col-${item}`">{{ item }}</Option>
          </Select>
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
        <FormItem label="商品编码">
          <Input v-model="formLeft.input3" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryGoods('formInline')">查询</Button>
        <Button class="btn" type="primary" @click="addGoods('formInline')">新增</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导入</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">导出</Button>
        <Button class="btn" type="primary" @click="batchDelete('formInline')">批量删除</Button>
        <Button class="btn" type="primary" @click="handleSubmit('formInline')">批量上下架</Button>
      </Form>
    </div>
    <!-- modal -->
    <div v-if="modlaFlg"><AddModal :modalType='modalType' :defaultData="defaultData" :flg="modlaFlg" @cls="closeModal" /></div>
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
import { getGoodsList, deleteGoodsApi, batchDeleteApi } from '@/api/goodsServer'
import AddModal from './addModal.vue'
export default {
  name: 'goodsList',
  components: {
    AddModal
  },
  data () {
    return {
      modlaFlg: false,
      modalType: '',
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
                    this.editGoods(params)
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
                    this.deleteGoods(1)
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
    // 新增商品
    addGoods () {
      this.modalType = 'add'
      this.modlaFlg = true
    },
    // 编辑商品
    editGoods (data) {
      this.modalType = 'edit'
      this.defaultData = data
      this.modlaFlg = true
    },
    // 删除商品
    deleteGoods (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          deleteGoodsApi(id).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    },
    // 批量删除
    batchDelete () {
      let data = {
        ids: [1, 2, 3]
      }
      this.$Modal.confirm({
        title: '确定要删除选中的商品么?',
        onOk: () => {
          batchDeleteApi(data).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    },
    // 关闭弹窗
    closeModal () {
      this.modlaFlg = false
    },
    // 查询商品
    queryGoods () {
      let data = {

      }
      getGoodsList(data).then((res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.queryGoods()
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
