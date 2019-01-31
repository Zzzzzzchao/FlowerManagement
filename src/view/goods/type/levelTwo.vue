<template>
  <div class="ivu-table-row">
    <div class="marginBottom" v-for="(item,index) in row" :key="index">
      <Row class="expand-row" >
        <i-Col span="7">
          <span class="expand-value">{{ item.level + 1 }}</span>
        </i-Col>
        <i-Col span="6">
          <span class="expand-value">{{ item.name }}</span>
        </i-Col>
        <i-Col span="6">
          <span class="expand-value">{{ item.remark }}</span>
        </i-Col>
        <i-Col span="5">
          <span class="expand-value">
            <Button size='small' style="margin-right:5px;" class="btn" type="primary" @click="editGoodsType(item)">编辑</Button>
            <Button size='small' style="margin-right:5px;" class="btn" type="error" @click="deleteGoodsType(item.typeId)">删除</Button>
          </span>
        </i-Col>
      </Row>
      <div style="margin-left:20px" v-for="(three,index) in item.children" :key="index">
        <Row>
          <i-Col span="7">
            <span class="expand-value">{{ three.level + 1 }}</span>
          </i-Col>
          <i-Col span="6">
            <span class="expand-value">{{ three.name }}</span>
          </i-Col>
          <i-Col span="6">
            <span class="expand-value">{{ item.remark }}</span>
          </i-Col>
          <i-Col span="5">
            <span class="expand-value">
              <Button size='small' style="margin-right:5px;" class="btn" type="primary" @click="editGoodsType(item)">编辑</Button>
              <Button size='small' style="margin-right:5px;" class="btn" type="error" @click="deleteGoodsType(item.typeId)">删除</Button>
            </span>
          </i-Col>
        </Row>
      </div>
    </div>
    <div v-if="editFlg"><EditModal :defaultData='editData' :flg="editFlg" @cls="closeEditModal" /></div>
  </div>
</template>
<script>
import { deleteGoodsTypeApi } from '@/api/goodsServer'
import EditModal from './editModal.vue'
export default {
  components: {
    EditModal
  },
  data () {
    return {
      editData: '',
      editFlg: false
    }
  },
  props: {
    row: ''
  },
  methods: {
    // 编辑分类
    editGoodsType (data) {
      this.editData = data
      this.editFlg = true
    },
    closeEditModal (type) {
      this.editFlg = false
    },
    deleteGoodsType (id) {
      this.$Modal.confirm({
        title: '确定要删除么?',
        onOk: () => {
          deleteGoodsTypeApi(id).then((res) => {
            if (res.data.code === 1) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
td.ivu-table-expanded-cell{
  padding: 20px 10px 10px 50px
}
.expand-value{
  padding: 0 18px;
}
.marginBottom{
  .ivu-col{
    margin-bottom: 10px;
  }
}
</style>
