<template>
  <div class="brandList">
    <!-- top -->
    <div class="top">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="品牌名称">
          <Input v-model="formData.brandName" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryGoodsBrand()">查询</Button>
        <Button class="btn" type="primary" @click="addGoodsBrand()">新增</Button>
      </Form>
    </div>
    <!-- modal -->
    <div v-if="modlaFlg"><AddModal :modalType='modalType' :defaultData="defaultData" :flg="modlaFlg" @cls="closeModal" /></div>
    <!-- table -->
    <div class="table">
      <Table size="small" :columns="tableColumns" :data="tableData"></Table>
      <div class="page">
        <Page :total="total" @on-change='choosePage' :page-size='10' show-total />
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsBrandList, deleteGoodsBrandApi } from '@/api/goodsServer'
import AddModal from './addModal.vue'
export default {
  name: 'goodsBrandList',
  components: {
    AddModal
  },
  data () {
    return {
      modlaFlg: false,
      modalType: '',
      defaultData: '',
      total: 0,
      formData: {
        brandName: '',
        page: 1,
        rows: 10
      },
      tableColumns: [
        {
          title: '品牌logo',
          key: 'logo',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.logo
                },
                style: {
                  width: '100px',
                  marginTop: '5px'
                }
              })
            ])
          }
        },
        {
          title: '品牌名称',
          key: 'brandName'
        },
        {
          title: '品牌介绍',
          key: 'remark'
        },
        {
          title: '排序',
          key: 'orderNum'
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
                    this.editGoodsBrand(params.row)
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
                    this.deleteGoodsBrand(params.row.brandId)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    // 新增品牌
    addGoodsBrand () {
      this.modalType = 'add'
      this.defaultData = ''
      this.modlaFlg = true
    },
    // 编辑商品
    editGoodsBrand (data) {
      this.modalType = 'edit'
      this.defaultData = data
      this.modlaFlg = true
    },
    // 删除商品
    deleteGoodsBrand (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          deleteGoodsBrandApi(id).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
              this.queryGoodsBrand()
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    },
    // 关闭弹窗
    closeModal (type) {
      if (type) {
        this.queryGoodsBrand()
      }
      this.modlaFlg = false
    },
    // 查询品牌列表
    queryGoodsBrand () {
      getGoodsBrandList(this.formData).then((res) => {
        this.total = res.data.page.total
        this.tableData = res.data.page.rows
      })
    },
    choosePage (page) {
      this.formData.page = page
      this.queryGoodsBrand()
    }
  },
  created () {
    this.queryGoodsBrand()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.brandList{
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
