<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增商品' : '编辑商品'"
      :closable="false"
      :mask-closable="false"
      :width='60'
      >
      <div class="modalDiv">
        <Form  :model="formData" label-position="right" :label-width="80" inline>
          <FormItem label="商品分类">
            <Select v-model="formData.typeId" class="search-col">
              <Option v-for="item in 10" :value="item" :key="`search-col-${item}`">{{ item }}</Option>
            </Select>
          </FormItem>
           <FormItem label="商品品牌">
             <Select v-model="formData.brandId" class="search-col">
              <Option v-for="item in brandList" :value="item" :key="`search-col-${item}`">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商品名称">
            <Input v-model="formData.name" />
          </FormItem>
          <FormItem label="商品图片" style="width:92%">
            <Upload
            :on-success="handleSuccess"
            :show-upload-list="false"
            action="http://test.51flowerin.com/file/upload?type=goods_detail"
            >
              <img class="img" :src="formData.pic ? formData.pic : require('../../../assets/images/img.png')" alt="" />
            </Upload>
          </FormItem>
          <FormItem label="商品描述">
            <Input v-model="formData.remark" />
          </FormItem>
          <FormItem label="商品标签">
            <Select v-model="formData.markId" class="search-col">
              <Option v-for="item in markList" :value="item" :key="`search-col-${item}`">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="计量单位">
            <Input v-model="formData.unit" />
          </FormItem>
          <FormItem label="成本价">
            <Input v-model="formData.costPrice" />
          </FormItem>
          <FormItem label="市场价">
            <Input v-model="formData.marketPrice" />
          </FormItem>
          <FormItem label="一口价">
            <Input v-model="formData.price" />
          </FormItem>
          <FormItem label="库存">
            <Input v-model="formData.stockAmount" />
          </FormItem>
          <FormItem label="预警值">
            <Input v-model="formData.warnAmount" />
          </FormItem>
          <FormItem label="商品编码">
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
import { addGoods, editGoods, getGoodsTypeList } from '@/api/goodsServer'
export default {
  data () {
    return {
      formData: {
        name: '', // 商品名称
        pic: '1', // 商品图片路径
        brandId: '', // 品牌ID
        marketPrice: '', // 市场价
        costPrice: '', // 成本价
        price: '', // 一口价
        markId: '', // 标签ID
        remark: '', // 商品描述
        goodsCode: '', // 卖家信息
        status: '', // 商品状态
        stockAmount: '', // 库存
        typeId: '4', // 商品分类
        unit: '', // 单位
        warnAmount: '' // 预警信息
      },
      reqPath: '',
      typeList: [],
      brandList: [],
      markList: []
    }
  },
  props: {
    modalType: {
      type: String
    },
    flg: {
      type: Boolean
    }
  },
  created () {
    getGoodsTypeList().then((res) => {
      this.typeList = res.data.list
    })
  },
  methods: {
    ok () {
      if (this.modalType === 'add') {
        // 新增
        this.formData.pic = this.reqPath
        addGoods(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      } else {
        // 编辑
        editGoods(this.formData).then((res) => {
          console.log(res)
          this.$emit('cls')
        })
      }
    },
    close () {
      this.$emit('cls')
    },
    handleSuccess (files) {
      this.reqPath = files.path
      this.formData.pic = files.urlPrefix + files.path
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
