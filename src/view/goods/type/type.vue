<template>
  <div class="typeList">
    <!-- top -->
    <div class="top">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <!-- <FormItem label="分类名称">
          <Input v-model="formData.input2" />
        </FormItem> -->
        <Button class="btn" type="primary" @click="queryGoodsType()">刷新</Button>
        <Button class="btn" type="primary" @click="addGoodsType()">新增</Button>
      </Form>
    </div>
    <!-- modal -->
    <div v-if="modlaFlg"><AddModal :modalType='modalType' :defaultData="defaultData" :flg="modlaFlg" @cls="closeModal" /></div>
    <div v-if="editFlg"><EditModal :defaultData='editData' :flg="editFlg" @cls="closeEditModal" /></div>
    <!-- table -->
    <div class="table">
      <Table size="small" :columns="tableColumns" :data="tableData"></Table>
      <!-- <div class="page">
        <Page :total="100" show-total />
      </div> -->
    </div>
  </div>
</template>
<script>
import { getGoodsTypeList, deleteGoodsTypeApi } from '@/api/goodsServer'
import LevelTwo from './levelTwo.vue'
import AddModal from './addModal.vue'
import EditModal from './editModal.vue'
export default {
  name: 'typeList',
  components: {
    AddModal,
    LevelTwo,
    EditModal
  },
  data () {
    return {
      modlaFlg: false,
      modalType: '',
      defaultData: '',
      editData: '',
      editFlg: false,
      formData: {
        input1: ''
      },
      tableColumns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(LevelTwo, {
              props: {
                row: params.row.children
              }
            })
          }
        },
        {
          title: '分类级别',
          key: 'level',
          render: (h, params) => {
            return h('div', params.row.level + 1)
          }
        },
        {
          title: '分类名称',
          key: 'name'
        },
        {
          title: '分类描述',
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
                    this.editGoodsType(params.row)
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
                    this.deleteGoodsType(params.row.typeId)
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
    // 新增分类
    addGoodsType () {
      this.modalType = 'add'
      this.modlaFlg = true
    },
    // 编辑分类
    editGoodsType (data) {
      this.editData = data
      this.editFlg = true
    },
    // 删除商品
    deleteGoodsType (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          deleteGoodsTypeApi(id).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
              this.queryGoodsType()
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
        this.queryGoodsType()
      }
      this.modlaFlg = false
    },
    closeEditModal (type) {
      if (type) {
        this.queryGoodsType()
      }
      this.editFlg = false
    },
    // 查询品牌列表
    queryGoodsType () {
      getGoodsTypeList().then((res) => {
        this.tableData = res.data.list
      })
    }
  },
  created () {
    this.queryGoodsType()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.typeList{
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
