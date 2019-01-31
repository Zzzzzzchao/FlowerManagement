import axios from '@/libs/api.request'
import qs from 'qs'

/*
  商品列表
*/

export const getGoodsList = data => {
  return axios.request({
    url: '/goodsDetail/page',
    data,
    method: 'get'
  })
}

export const addGoods = data => {
  return axios.request({
    url: '/goodsDetail/add',
    data,
    method: 'post'
  })
}

export const editGoods = data => {
  return axios.request({
    url: '/goodsDetail/update',
    data,
    method: 'post'
  })
}

export const deleteGoodsApi = data => {
  return axios.request({
    url: '/goodsDetail/delete/' + data,
    method: 'get'
  })
}

export const batchDeleteApi = data => {
  return axios.request({
    url: '/goodsDetail/batchDelete',
    data,
    method: 'post'
  })
}

/*
  商品品牌
*/

export const getGoodsBrandList = data => {
  return axios.request({
    url: '/goodsBrand/page?' + qs.stringify(data),
    method: 'get'
  })
}

export const addGoodsBrand = data => {
  return axios.request({
    url: '/goodsBrand/add',
    data,
    method: 'post'
  })
}

export const editGoodsBrand = data => {
  return axios.request({
    url: '/goodsBrand/update',
    data,
    method: 'post'
  })
}

export const deleteGoodsBrandApi = data => {
  return axios.request({
    url: '/goodsBrand/delete/' + data,
    method: 'get'
  })
}

/*
  商品标签
*/

export const getGoodsMarkList = data => {
  return axios.request({
    url: '/goodsMark/page?' + qs.stringify(data),
    method: 'get'
  })
}

export const addGoodsMark = data => {
  return axios.request({
    url: '/goodsMark/add',
    data,
    method: 'post'
  })
}

export const editGoodsMark = data => {
  return axios.request({
    url: '/goodsMark/update',
    data,
    method: 'post'
  })
}

export const deleteGoodsMarkApi = data => {
  return axios.request({
    url: '/goodsMark/delete/' + data,
    method: 'get'
  })
}

/*
  商品分类
*/

export const getGoodsTypeList = data => {
  return axios.request({
    url: '/goodsType/tree' + qs.stringify(data),
    method: 'get'
  })
}

export const addGoodsType = data => {
  return axios.request({
    url: '/goodsType/add',
    data,
    method: 'post'
  })
}

export const editGoodsType = data => {
  return axios.request({
    url: '/goodsType/update',
    data,
    method: 'post'
  })
}

export const deleteGoodsTypeApi = data => {
  return axios.request({
    url: '/goodsType/delete/' + data,
    method: 'get'
  })
}

export const getTypeData = data => {
  return axios.request({
    url: '/goodsType/list?' + qs.stringify(data),
    method: 'get'
  })
}
