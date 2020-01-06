<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  data() {
    return {
      msg: "hellow111",
      svgClass: "aaa"
    };
  }
};
</script>

<style lang="scss" scoped></style>
