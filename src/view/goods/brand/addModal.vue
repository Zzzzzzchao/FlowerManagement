<template>
    <Modal
      v-model="flg"
      :title="modalType === 'add' ? '新增品牌' : '编辑品牌'"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" ref='formRef' :rules="ruleValidate" label-position="right" :label-width="80">
        <FormItem label="品牌名称" prop="brandName">
          <Input v-model="formData.brandName" />
        </FormItem>
        <FormItem label="品牌logo">
          <Upload
          :on-success="handleSuccess"
          :show-upload-list="false"
          action="http://47.96.98.24:88/file/upload?type=goods_brand"
          >
            <img class="img" :src="formData.logo ? formData.logo : require('../../../assets/images/img.png')" alt="">
          </Upload>
        </FormItem>
        <FormItem label="品牌描述" prop="remark">
          <Input v-model="formData.remark" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="$emit('cls')">取消</Button>
        <Button @click="ok" type="primary">确定</Button>
        <div></div>
      </div>
  </Modal>
</template>
<script>
import { addGoodsBrand, editGoodsBrand } from '@/api/goodsServer'
// import { uploadReq } from '@/api/common'
export default {
  data () {
    return {
      formData: {
        brandName: '', // 品牌名称
        logo: '', // 品牌图片路径
        remark: '' // 品牌描述
      },
      reqPath: '',
      ruleValidate: {
        brandName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入描述', trigger: 'blur' }
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
    defaultData: ''
  },
  created () {
    this.formData.brandName = this.defaultData.brandName || ''
    this.formData.logo = this.defaultData.logo || ''
    this.formData.remark = this.defaultData.remark || ''
  },
  methods: {
    ok () {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (!this.formData.logo) {
            this.$Message.error('请上传图片')
            return
          }
          this.formData.logo = this.reqPath
          if (this.modalType === 'add') {
            // 新增
            addGoodsBrand(this.formData).then((res) => {
              this.$Message.success(res.data.msg)
              this.$emit('cls', 1)
            })
          } else {
            // 编辑
            this.formData.brandId = this.defaultData.brandId
            editGoodsBrand(this.formData).then((res) => {
              this.$Message.success(res.data.msg)
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
      this.formData.logo = files.urlPrefix + files.path
    }
  }
}
</script>

<style lang="less" scoped>
.img{
  width: 100px;
}
</style>
