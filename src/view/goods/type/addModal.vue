<template>
    <Modal
      v-model="flg"
      title="新增类型"
      :closable="false"
      @on-ok="ok"
      @on-cancel="close">
      <Form :model="formData" label-position="right" :label-width="80">
        <FormItem label="类型级别">
          <Select v-model="formData.level" class="search-col" @on-change="chooseType">
            <Option v-for="(item,index) in levelList" :value="index" :key="`search-col-${index}`">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="一级分类" v-if='formData.level !== 0'>
          <Select v-model="one" class="search-col" @on-change="chooseType">
            <Option v-for="(item,index) in oneListData" :value="item.typeId" :key="`search-col-${index}`">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="二级分类" v-if='formData.level === 2'>
          <Select v-model="two" class="search-col">
            <Option v-for="(item,index) in twoListData" :value="item.typeId" :key="`search-col-${index}`">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="类型名称">
          <Input v-model="formData.name" />
        </FormItem>
        <FormItem label="类型描述">
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
import { addGoodsType, getTypeData } from '@/api/goodsServer'
export default {
  data () {
    return {
      formData: {
        level: 0, // 类型级别
        name: '', // 类型名称
        pid: '', // 父类ID
        remark: '' // 类型描述
      },
      one: '',
      oneListData: [],
      two: '',
      twoListData: [],
      levelList: ['一级分类', '二级分类', '三级分类']
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
    getTypeData({level: 0}).then((res) => {
      this.oneListData = res.data.list
    })
  },
  methods: {
    ok () {
      if (this.modalType === 'add') {
        // 新增
        var data = {
          level: this.formData.level,
          pid: this.formData.level === 0 ? 0 : (this.formData.level === 1 ? this.one : this.two),
          name: this.formData.name,
          remark: this.formData.remark
        }
        addGoodsType(data).then((res) => {
          this.$Message.success(res.data.msg)
          this.$emit('cls', 1)
        })
      }
    },
    close () {
      this.$emit('cls')
    },
    chooseType () {
      if (this.formData.level === 2) {
        // 需要二级列表
        var data = {
          level: 1,
          pid: this.one
        }
        getTypeData(data).then((res) => {
          this.twoListData = res.data.list
        })
      }
    }
  }
}
</script>
