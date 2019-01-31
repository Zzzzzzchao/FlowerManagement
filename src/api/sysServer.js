import axios from '@/libs/api.request'

/*
  用户管理
*/

export const getUserList = data => {
  return axios.request({
    url: '/user/datagrid',
    data,
    method: 'get'
  })
}

export const addUser = data => {
  return axios.request({
    url: '/user/add',
    data,
    method: 'post'
  })
}

export const editUser = data => {
  return axios.request({
    url: '/user/update',
    data,
    method: 'post'
  })
}

/*
  角色管理
*/

export const getRoleList = data => {
  return axios.request({
    url: '/role/datagrid',
    data,
    method: 'get'
  })
}

export const addRole = data => {
  return axios.request({
    url: '/role/add',
    data,
    method: 'post'
  })
}

export const editRole = data => {
  return axios.request({
    url: '/role/update',
    data,
    method: 'post'
  })
}

export const getRoleMenuList = data => {
  return axios.request({
    url: '/role/listMenus/' + data,
    method: 'get'
  })
}

/*
  基础数据 base
*/

export const getBaseList = data => {
  return axios.request({
    url: '/datadic/list',
    data,
    method: 'get'
  })
}

export const addBase = data => {
  return axios.request({
    url: '/datadic/add',
    data,
    method: 'post'
  })
}

export const editBase = data => {
  return axios.request({
    url: '/datadic/update',
    data,
    method: 'post'
  })
}

/*
  日志
*/

export const getLog = data => {
  return axios.request({
    url: '/log/datagrid',
    data,
    method: 'get'
  })
}
