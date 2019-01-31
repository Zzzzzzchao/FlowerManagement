<template>
  <div class="userList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" user-position="right" :user-width="80" inline>
        <FormItem user="用户名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryUser()">查询</Button>
        <Button class="btn" type="primary" @click="addUser()">新增</Button>
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
import { getUserList } from '@/api/sysServer'
import AddModal from './addModal.vue'
export default {
  name: 'userList',
  components: {
    AddModal
  },
  data () {
    return {
      modlaFlg: false,
      modalType: '',
      defaultData: '',
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
          title: '类型名称',
          key: 'type'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '状态',
          key: 'status'
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
                    this.editUser(params.index)
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
                    this.deleteGoodsType(params.index)
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
    // 新增
    addUser () {
      this.modalType = 'add'
      this.modlaFlg = true
    },
    // 编辑
    editUser (data) {
      this.modalType = 'edit'
      this.defaultData = data
      this.modlaFlg = true
    },
    // 删除
    deleteUser (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          // deleteUserApi(id).then((res) => {
          //   if (res.data.code === 1) {
          //     this.$Message.success('删除成功')
          //   } else {
          //     this.$Message.error('删除失败')
          //   }
          // })
        }
      })
    },
    // 关闭弹窗
    closeModal () {
      this.modlaFlg = false
    },
    // 查询品牌列表
    queryUser () {
      let data = {

      }
      getUserList(data).then((res) => {
        console.log(res)
        this.tableData = res.data.page.rows
      })
    }
  },
  created () {
    this.queryUser()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.userList{
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
