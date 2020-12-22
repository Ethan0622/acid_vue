<template>
  <div class="bubble" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    clickable: Boolean,
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.bubble {
  background-color: cyan;
}
</style>