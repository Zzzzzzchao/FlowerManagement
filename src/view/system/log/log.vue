<template>
  <div class="LogList">
    <!-- top -->
    <div class="top">
      <Form :model="formLeft" user-position="right" :user-width="80" inline>
        <FormItem user="用户名称">
          <Input v-model="formLeft.input2" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryLog()">查询</Button>
        <Button class="btn" type="primary" @click="addLog()">新增</Button>
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
import { getLog } from '@/api/sysServer'
export default {
  name: 'LogList',
  components: {
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
          title: '用户名',
          key: 'username'
        },
        {
          title: '用户操作',
          key: 'operation'
        },
        {
          title: '地址',
          key: 'url'
        },
        {
          title: '请求方法',
          key: 'method'
        },
        {
          title: '参数',
          key: 'params'
        },
        {
          title: '结果',
          key: 'result'
        },
        {
          title: '时长',
          key: 'time'
        },
        {
          title: 'IP地址',
          key: 'ip'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          width: 180,
          key: ''
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
    // 查询
    queryLog () {
      let data = {

      }
      getLog(data).then((res) => {
        console.log(res)
        this.tableData = res.data.page.rows
      })
    }
  },
  created () {
    this.queryLog()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.LogList{
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
