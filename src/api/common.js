// 获取信息分类的公共方法
import { GetCategory, GetCategoryAll } from '@/api/news'
import service from '@/utils/request'

/**
 *
 * @param {成功后的回调函数} callback
 */
function getCommon(callback) {
  GetCategory({})
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 获取分类（含子级）
 */

function getCommonAll(callback) {
  GetCategoryAll({})
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 获取七牛云token
 */
function getQiniuToken(data) {
  service.request({
    url: '/uploadImgToken/',
    method: 'post',
    data
  })
}

/**
 * 用户信息列表的获取
 */
function getUserList(params) {
  return service.request({
    url: params.url,
    method: params.method || 'post',
    data: params.data || {}
  })
}

/**
 * 获取省、市、区
 */
function loadCity(data) {
  return service.request({
    url: '/cityPicker/',
    method: 'post',
    data
  })
}
export { getCommon, getCommonAll, getQiniuToken, getUserList, loadCity }
