<template>
  <div class="RoleList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" user-position="right" :user-width="80" inline>
        <FormItem user="角色名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryRole()">查询</Button>
        <Button class="btn" type="primary" @click="addRole()">新增</Button>
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
import { getRoleList, getRoleMenuList } from '@/api/sysServer'
import AddModal from './addModal.vue'
export default {
  name: 'RoleList',
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
          title: '角色名',
          key: 'name'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '创建人',
          key: 'createUser'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新人',
          key: 'update_user'
        },
        {
          title: '更新时间',
          key: 'update_time'
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
                    this.showRoleMenu(params.index)
                  }
                }
              }, '菜单'),
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
                    this.editRole(params.index)
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
    addRole () {
      this.modalType = 'add'
      this.modlaFlg = true
    },
    // 编辑
    editRole (data) {
      this.modalType = 'edit'
      this.defaultData = data
      this.modlaFlg = true
    },
    // 删除
    deleteRole (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          // deleteRoleApi(id).then((res) => {
          //   if (res.data.code === 1) {
          //     this.$Message.success('删除成功')
          //   } else {
          //     this.$Message.error('删除失败')
          //   }
          // })
        }
      })
    },
    // 查看角色菜单
    showRoleMenu (id) {
      getRoleMenuList(id).then(() => {
        console.log('查看编辑菜单弹窗')
      })
    },
    // 关闭弹窗
    closeModal () {
      this.modlaFlg = false
    },
    // 查询品牌列表
    queryRole () {
      let data = {

      }
      getRoleList(data).then((res) => {
        console.log(res)
        // this.tableData = res.data.page.rows
      })
    }
  },
  created () {
    this.queryRole()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.RoleList{
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
