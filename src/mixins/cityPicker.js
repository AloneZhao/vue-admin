import { loadCity } from '@/api/common'
let cityPicker = {
  data() {
    return {
      provinceValueData: '',
      cityValueData: '',
      areaValueData: '',
      streetValueData: '',
      resultData: {
        provinceValueData: '',
        cityValueData: '',
        areaValueData: '',
        streetValueData: ''
      },
      provinceList: [], // 省
      cityList: [], // 市
      areaList: [], // 区县
      streetList: [] // 街道
    }
  },
  methods: {
    getCityPicker() {
      loadCity({
        type: 'province'
      }).then(res => {
        this.provinceList = res.data.data
      })
    },
    // 选择省份获取城市
    handlerProvince(val) {
      this.retrunData()
      this.clearnPicker({
        type: 'city'
      })
      loadCity({
        type: 'city',
        province_code: val
      }).then(res => {
        this.cityList = res.data.data
      })
    },
    // 城市改变获取区县
    handlerCity(val) {
      this.retrunData()
      this.clearnPicker({
        type: 'area'
      })
      loadCity({
        type: 'area',
        city_code: val
      }).then(res => {
        this.areaList = res.data.data
      })
    },
    // 获取区县街道
    handlerArea(val) {
      this.retrunData()
      this.clearnPicker({
        type: 'street'
      })
      loadCity({
        type: 'street',
        area_code: val
      }).then(res => {
        this.streetList = res.data.data
      })
    },
    handlerStreet() {
      this.retrunData()
    },
    /**
     * @param {Object} params 类型
     * 重置选项
     */
    clearnPicker(params) {
      const pickers = {
        city: ['cityValueData', 'areaValueData', 'streetValueData'], // 省 改变
        area: ['areaValueData', 'streetValueData'], // 市
        street: ['streetValueData'] // 区县
      }
      pickers[params.type].forEach(item => {
        this[item] = ''
      })
    },
    /**
     * 返回数据集合
     */
    retrunData() {
      for (const key in this.resultData) {
        this.resultData[key] = this[key]
      }
    }
  }
}
export default cityPicker
