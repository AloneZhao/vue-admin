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

export { getCommon, getCommonAll, getQiniuToken }
