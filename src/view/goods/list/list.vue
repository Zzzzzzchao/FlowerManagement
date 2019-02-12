<template>
  <div class="goodsList">
    <!-- top -->
    <div class="top">
      <Form :model="formData" label-position="right" :label-width="80" inline>
        <FormItem label="商品分类" style="width:200px;">
          <Select v-model="formData.typeId" class="search-col">
            <Option :value="''">全部</Option>
            <Option v-for="item in levelOneList" :value="item.typeId" :key="`search-col-${item.typeId}`">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品状态" style="width:200px;">
          <Select v-model="formData.status" class="search-col">
            <Option v-for="item in statusList" :value="item.id" :key="`search-col-${item.id}`">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品品牌" style="width:200px;">
          <Select v-model="formData.brandId" class="search-col">
            <Option :value="''">全部</Option>
            <Option v-for="item in brandList" :value="item.brandId" :key="`search-col-${item.brandId}`">{{ item.brandName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品名称" style="width:200px;">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="商品编码">
          <Input v-model="formData.goodsCode" />
        </FormItem>
        <Button class="btn" type="primary" @click="queryGoods()">查询</Button>
        <Button class="btn" type="primary" @click="addGoods()">新增</Button>
        <Upload
          style="display:inline-block"
          :on-success="handleSuccess"
          :show-upload-list="false"
          :action='`${baseUrl}/goodsDetail/importExcel`'
          >
          <Button class="btn" type="primary">导入</Button>
        </Upload>
        <Button class="btn" type="primary" @click="downExcel()">导出</Button>
        <Button class="btn" type="primary" @click="batchDelete()">批量删除</Button>
        <Button class="btn" type="primary" @click="batchUpdate()">批量上下架</Button>
      </Form>
    </div>
    <!-- modal -->
    <div v-if="modlaFlg"><AddModal :modalType='modalType' :baseData='baseData' :defaultData="defaultData" :flg="modlaFlg" @cls="closeModal" /></div>
    <!-- table -->
    <div class="table">
      <Table size="small" @on-selection-change="batchDetail" :columns="tableColumns" :data="tableData"></Table>
      <div class="page">
        <Page :total="total" @on-change='choosePage' :page-size='10' show-total />
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsList, deleteGoodsApi, batchDeleteApi, batchUpdateApi, getGoodsBrandAll, getGoodsMarkAll, getTypeData } from '@/api/goodsServer'
import AddModal from './addModal.vue'
import config from '../../../config/index.js'
import qs from 'qs'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  name: 'goodsList',
  components: {
    AddModal
  },
  data () {
    return {
      baseUrl: baseUrl,
      modlaFlg: false,
      modalType: '',
      defaultData: '',
      formData: {
        brandId: '',
        typeId: '',
        name: '',
        status: '',
        goodsCode: '',
        page: 1,
        rows: 10
      },
      total: 0,
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品货号',
          key: 'goodsCode'
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '商品品牌',
          key: 'brandName'
        },
        {
          title: '商品简介',
          key: 'remark'
        },
        {
          title: '商品标签',
          key: 'markName'
        },
        {
          title: '商品单位',
          key: 'unit'
        },
        {
          title: '商品状态',
          key: 'status',
          render: (h, params) => {
            return h('span', params.row.status === 0 ? '下架' : '上架')
          }
        },
        {
          title: '市场价',
          key: 'marketPrice'
        },
        {
          title: '一口价',
          key: 'price'
        },
        {
          title: '成本价',
          key: 'costPrice'
        },
        {
          title: '库存信息',
          key: 'stockAmount'
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
                    this.editGoods(params.row)
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
                    this.deleteGoods(params.row.goodsId)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [],
      baseData: {},
      brandList: [],
      markList: [],
      levelOneList: [],
      idList: [],
      polist: [],
      statusList: [
        {
          name: '全部',
          id: ''
        },
        {
          name: '下架',
          id: 0
        },
        {
          name: '上架',
          id: 1
        }
      ]
    }
  },
  created () {
    this.queryGoods()
    // 获取基础数据
    getGoodsBrandAll().then((res) => {
      this.brandList = res.data.list
    })
    getGoodsMarkAll().then((res) => {
      this.markList = res.data.list
    })
    getTypeData({level: 0}).then((res) => {
      this.levelOneList = res.data.list
    })
  },
  methods: {
    // 新增商品
    addGoods () {
      let data = {
        brandList: this.brandList,
        markList: this.markList,
        levelOneList: this.levelOneList
      }
      this.baseData = data
      this.modalType = 'add'
      this.modlaFlg = true
    },
    // 编辑商品
    editGoods (datas) {
      let data = {
        brandList: this.brandList,
        markList: this.markList,
        levelOneList: this.levelOneList
      }
      this.baseData = data
      this.modalType = 'edit'
      this.defaultData = datas
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
              this.queryGoods()
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    },
    // 批量删除
    batchDelete () {
      if (this.idList.length === 0) {
        this.$Message.error('请选择数据')
        return
      }
      this.$Modal.confirm({
        title: '确定要删除选中的商品么?',
        onOk: () => {
          batchDeleteApi(this.idList).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
              this.queryGoods()
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    },
    batchUpdate () {
      if (this.idList.length === 0) {
        this.$Message.error('请选择数据')
        return
      }
      let data = {
        ids: this.idList,
        po: this.polist
      }
      this.$Modal.confirm({
        title: '确定要操作选中的商品么?',
        onOk: () => {
          batchUpdateApi(data).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('成功')
              this.queryGoods()
            } else {
              this.$Message.error('失败')
            }
          })
        }
      })
    },
    // 关闭弹窗
    closeModal (type) {
      if (type) {
        this.queryGoods()
      }
      this.modlaFlg = false
    },
    // 查询商品
    queryGoods () {
      getGoodsList(this.formData).then((res) => {
        this.total = res.data.page.total
        this.tableData = res.data.page.rows
      })
    },
    choosePage (page) {
      this.formData.page = page
      this.queryGoods()
    },
    /*
      表格多选
    */
    batchDetail (value) {
      if (value.length > 0) {
        this.idList = []
        this.polist = []
        value.forEach(element => {
          this.polist.push(element)
          this.idList.push(element.goodsId)
        })
      }
    },
    downExcel () {
      delete this.formData.page
      delete this.formData.rows
      window.open(`${baseUrl}/goodsDetail/exportExcel?` + qs.stringify(this.formData))
    },
    handleSuccess (res) {
      if (res.code === 1) {
        this.queryGoods()
      }
    }
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
