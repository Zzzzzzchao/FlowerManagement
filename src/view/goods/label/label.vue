<template>
  <div class="labelList">
    <!-- top -->
    <div class="top">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="标签名称">
          <Input v-model="formData.markName" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryGoodsMark()">查询</Button>
        <Button class="btn" type="primary" @click="addGoodsMark()">新增</Button>
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
import { getGoodsMarkList, deleteGoodsMarkApi } from '@/api/goodsServer'
import AddModal from './addModal.vue'
export default {
  name: 'labelList',
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
        markName: '',
        page: 1,
        rows: 10
      },
      tableColumns: [
        {
          title: '标签名称',
          key: 'markName'
        },
        {
          title: '标签描述',
          key: 'remark'
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
                    this.editGoodsMark(params.row)
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
                    this.deleteGoodsMark(params.row.markId)
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
    // 新增标签
    addGoodsMark () {
      this.modalType = 'add'
      this.defaultData = ''
      this.modlaFlg = true
    },
    // 编辑标签
    editGoodsMark (data) {
      this.modalType = 'edit'
      this.defaultData = data
      this.modlaFlg = true
    },
    // 删除商品
    deleteGoodsMark (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          deleteGoodsMarkApi(id).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
              this.queryGoodsMark()
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
        this.queryGoodsMark()
      }
      this.modlaFlg = false
    },
    // 查询品牌列表
    queryGoodsMark () {
      getGoodsMarkList(this.formData).then((res) => {
        this.total = res.data.page.total
        this.tableData = res.data.page.rows
      })
    },
    choosePage (page) {
      this.formData.page = page
      this.queryGoodsMark()
    }
  },
  created () {
    this.queryGoodsMark()
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
