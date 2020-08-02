<template>
  <div id="nav-wrap">
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             :collapse="isCollapse"
             background-color="transparent"
             text-color="#fff"
             active-text-color="#fff"
             router
             unique-opened>
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden"
                    :key="item.id"
                    :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title"
                  style="vertical-align: middle;">{{ item.meta.name }}
            </span>
          </template>

          <!-- 子菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item v-if="!subItem.hidden"
                          :key="subItem.id"
                          :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data () {
    return {
      routers: {}
    };
  },
  methods: {},
  computed: {
    isCollapse () {
      return this.$store.state.app.isCollapse;
    }
  },
  created () {
    this.routers = this.$router.options.routes;
  }
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navWidth;
  height: 100vh;
  background: #344a5f;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}
.close {
  #nav-wrap {
    width: 64px;
  }
}
.open {
  #nav-wrap {
    width: $navWidth;
  }
}
</style>
