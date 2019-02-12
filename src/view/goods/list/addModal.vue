<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增商品' : '编辑商品'"
      :closable="false"
      :mask-closable="false"
      :width='60'
      >
      <div class="modalDiv">
        <Form  :model="formData" ref='formRef' :rules="ruleValidate" label-position="right" :label-width="80" inline>
          <FormItem label="一级分类" prop="topTypeId">
            <Select v-model="formData.topTypeId" @on-change="chooseOne">
              <Option v-for="item in typeList" :value="item.typeId" :key="`${item.typeId}`">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="二级分类" prop="subTypeId">
            <Select v-model="formData.subTypeId" class="search-col">
              <Option v-for="item in twoList" :value="item.typeId" :key="`search-col-${item.typeId}`">{{ item.name }}</Option>
            </Select>
          </FormItem>
           <FormItem label="商品品牌" prop="brandId">
             <Select v-model="formData.brandId" class="search-col">
              <Option v-for="item in brandList" :value="item.brandId" :key="`${item.brandId}`">{{ item.brandName }}</Option>
            </Select>
          </FormItem>
            <FormItem label="商品标签" prop="markId">
            <Select v-model="formData.markId" class="search-col">
              <Option v-for="item in markList" :value="item.markId" :key="`${item.markId}`">{{ item.markName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商品名称" prop="name">
            <Input v-model="formData.name" />
          </FormItem>
          <FormItem label="商品图片" style="width:92%">
            <Upload
            :on-success="handleSuccess"
            :show-upload-list="false"
            :action="`${baseUrl}/file/upload?type=goods_detail`"
            >
              <img class="img" :src="formData.pic ? formData.pic : require('../../../assets/images/img.png')" alt="" />
            </Upload>
          </FormItem>
          <FormItem label="商品描述">
            <Input v-model="formData.remark" />
          </FormItem>
          <FormItem label="计量单位" prop="unit">
            <Input v-model="formData.unit" />
          </FormItem>
          <FormItem label="成本价" prop="costPrice">
            <Input v-model="formData.costPrice" />
          </FormItem>
          <FormItem label="市场价" prop="marketPrice">
            <Input v-model="formData.marketPrice" />
          </FormItem>
          <FormItem label="一口价" prop="price">
            <Input v-model="formData.price" />
          </FormItem>
          <FormItem label="库存" prop="stockAmount">
            <Input v-model="formData.stockAmount" />
          </FormItem>
          <FormItem label="预警值" prop="warnAmount">
            <Input v-model="formData.warnAmount" />
          </FormItem>
          <FormItem label="商品编码" prop="goodsCode">
            <Input v-model="formData.goodsCode" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="$emit('cls')">取消</Button>
        <Button @click="ok" type="primary">确定</Button>
        <div></div>
      </div>
  </Modal>
</template>
<script>
import { addGoods, editGoods, getTypeData } from '@/api/goodsServer'
import config from '../../../config/index.js'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export default {
  data () {
    return {
      baseUrl: baseUrl,
      formData: {
        name: '', // 商品名称
        pic: '', // 商品图片路径
        brandId: '', // 品牌ID
        marketPrice: '', // 市场价
        costPrice: '', // 成本价
        price: '', // 一口价
        markId: '', // 标签ID
        remark: '', // 商品描述
        goodsCode: '', // 卖家信息
        status: '', // 商品状态
        stockAmount: '', // 库存
        topTypeId: '', // 商品分类
        unit: '', // 单位
        warnAmount: '', // 预警信息
        subTypeId: ''
      },
      reqPath: '',
      typeList: [],
      twoList: [],
      brandList: [],
      markList: [],
      ruleValidate: {
        topTypeId: [
          { required: true, message: '请选择分类', pattern: /.+/, trigger: 'change' }
        ],
        subTypeId: [
          { required: true, message: '请选择分类', pattern: /.+/, trigger: 'change' }
        ],
        brandId: [
          { required: true, message: '请选择品牌', pattern: /.+/, trigger: 'change' }
        ],
        markId: [
          { required: true, message: '请选择标签', pattern: /.+/, trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名称', pattern: /.+/, trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ],
        costPrice: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ],
        marketPrice: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ],
        stockAmount: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ],
        warnAmount: [
          { required: true, message: '请输入内容', pattern: /.+/, trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    modalType: {
      type: String
    },
    flg: {
      type: Boolean
    },
    baseData: '',
    defaultData: ''
  },
  created () {
    // 下拉框基础信息
    this.brandList = this.baseData.brandList
    this.markList = this.baseData.markList
    this.typeList = this.baseData.levelOneList
    // 编辑情况下基础值
    if (this.modalType !== 'add') {
      var data = {
        level: 1,
        pid: this.defaultData.topTypeId
      }
      getTypeData(data).then((res) => {
        this.twoList = res.data.list
        this.formData.subTypeId = this.defaultData.subTypeId
      })
      this.formData.topTypeId = this.defaultData.topTypeId
      this.formData.brandId = this.defaultData.brandId
      this.formData.markId = this.defaultData.markId
      this.formData.name = this.defaultData.name
      this.formData.pic = this.defaultData.pic
      this.formData.remark = this.defaultData.remark
      this.formData.unit = this.defaultData.unit
      this.formData.costPrice = this.defaultData.costPrice
      this.formData.marketPrice = this.defaultData.marketPrice
      this.formData.price = this.defaultData.price
      this.formData.stockAmount = this.defaultData.stockAmount
      this.formData.warnAmount = this.defaultData.warnAmount
      this.formData.goodsCode = this.defaultData.goodsCode
    }
  },
  methods: {
    ok () {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (this.modalType === 'add') {
            // 新增
            this.formData.pic = this.reqPath
            addGoods(this.formData).then((res) => {
              this.$emit('cls', 1)
            })
          } else {
            // 编辑
            this.formData.goodsId = this.defaultData.goodsId
            editGoods(this.formData).then((res) => {
              this.$emit('cls', 1)
            })
          }
        }
      })
    },
    close () {
      this.$emit('cls')
    },
    handleSuccess (files) {
      this.reqPath = files.path
      this.formData.pic = files.urlPrefix + files.path
    },
    chooseOne () {
      // 需要二级列表
      var data = {
        level: 1,
        pid: this.formData.topTypeId
      }
      getTypeData(data).then((res) => {
        this.twoList = res.data.list
        this.formData.subTypeId = ''
      })
    }
  }
}
</script>

<style lang="less">
.img{
  width: 100px;
}
.modalDiv{
  .ivu-form-item{
    width: 45%;
  }
}
</style>
