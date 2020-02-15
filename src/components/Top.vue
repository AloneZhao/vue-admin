<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="setIsCollapse">
      <i class="el-icon-menu"></i>
    </div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">{{ setUserName }}</div>
      <div class="pull-left header-icon" @click="exit()">
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {};
  },
  computed: {
    setUserName() {
      return this.$store.state.app.userName;
    }
  },
  methods: {
    setIsCollapse() {
      this.$store.commit("app/setIsCollapse");
    },
    exit() {
      this.$store.dispatch("app/exit").then(() => {
        this.$router.push({
          name: "Login"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  left: $navWidth;
  right: 0;
  height: $headerHeight;
  background: #fff;
  box-shadow: 0 3px 16px 0 rgba($color: #000000, $alpha: 0.1);
  line-height: 75px;
  .header-icon {
    padding: 0 13px;
    i {
      margin-bottom: -8px;
      font-size: 25px;
      cursor: pointer;
    }
    .user-info {
      height: 100%;
      padding: 0 32px;
      border-right: 1px solid #ededed;
    }
  }
}
.open {
  #header-wrap {
    left: $navWidth;
  }
}
.close {
  #header-wrap {
    left: 64px;
  }
}
</style>
