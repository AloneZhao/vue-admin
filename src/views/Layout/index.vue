<template>
  <div :class="[menuState ? 'close' : 'open']">
    <layout-nav></layout-nav>
    <layout-top></layout-top>
    <layout-main></layout-main>
  </div>
</template>

<script>
import LayoutNav from "@/components/Nav";
import LayoutTop from "@/components/Top";
import LayoutMain from "@/components/Main";
export default {
  name: "Layout",
  data() {
    return {};
  },
  computed: {
    menuState() {
      return this.$store.state.app.isCollapse;
    }
  },
  components: { LayoutNav, LayoutTop, LayoutMain }
};
</script>

<style lang="scss" scoped></style>
