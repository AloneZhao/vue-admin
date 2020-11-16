<template>
  <div class="overflow-h">
    <el-row :gutter="10">
      <el-col :span="6"
              v-if="initSelect.province">
        <el-select v-model="provinceValueData"
                   @change="handlerProvince"
                   clearable>
          <el-option v-for="item in provinceList"
                     :key="item.PROVINCE_ID"
                     :label="item.PROVINCE_NAME"
                     :value="item.PROVINCE_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"
              v-if="initSelect.city">
        <el-select v-model="cityValueData"
                   @change="handlerCity"
                   clearable>
          <el-option v-for="item in cityList"
                     :key="item.CITY_ID"
                     :label="item.CITY_NAME"
                     :value="item.CITY_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"
              v-if="initSelect.area">
        <el-select v-model="areaValueData"
                   @change="handlerArea"
                   clearable>
          <el-option v-for="item in areaList"
                     :key="item.AREA_ID"
                     :label="item.AREA_NAME"
                     :value="item.AREA_CODE">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"
              v-if="initSelect.street">
        <el-select v-model="streetValueData"
                   @change="handlerStreet"
                   clearable>
          <el-option v-for="item in streetList"
                     :key="item.STREET_ID"
                     :label="item.STREET_NAME"
                     :value="item.STREET_CODE"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cityPicker from '@/mixins/cityPicker'
export default {
  name: 'city-picker', // 省 市 区 街道组件名
  mixins: [cityPicker],
  watch: {
    resultData: {
      handler(newValue) {
        console.log('newValue', newValue)
        this.$emit('update:cityPicker', newValue)
      },
      deep: true
    }
  },
  data() {
    return {
      initSelect: {
        province: false,
        city: false,
        area: false,
        street: false
      }
    }
  },
  props: {
    cityPicker: {
      type: Object,
      defautl: () => {}
    },
    cityPickLevel: {
      type: Array,
      defautl: () => []
    }
  },
  methods: {
    // 初始默认需要的选择项
    ininPickCity() {
      console.log('this.city', this.cityPickLevel)
      if (this.cityPickLevel.length === 0) {
      } else {
        this.cityPickLevel.forEach(item => {
          this.initSelect[item] = true
        })
      }
    }
  },
  mounted() {
    this.getCityPicker()
    this.ininPickCity()
  }
}
</script>

<style lang="" scoped></style>
