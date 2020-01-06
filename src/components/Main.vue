<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#main-wrap {
  height: 100vh;
  position: fixed;
  left: $navWidth;
  top: $headerHeight;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  background: #f7f7f7;
}
.main-content {
  width: 100%;
  height: 100%;
  padding: 15px 15px 0 15px;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  background: #fff;
}

.open {
  #main-wrap {
    left: $navWidth;
  }
}
.close {
  #main-wrap {
    left: 64px;
  }
}
</style>
