<template>
  <div class="narrative">
    <button v-for="i in 2" :key="i" @click="open(i - 1)">NPC 说话{{ i }}</button>
  </div>
</template>

<script>
import script from '../assets/scripts/script'
export default {
  data() {
    return {}
  },
  methods: {
    async open(index) {
      const res = await this.$Dialog({
        paragraph: script.paragraphs[index],
      })
      console.log(res)
    },
  },
}
</script>

<style scoped>
.narrative {
  background-color: rgba(255, 155, 60, 0.5);
  pointer-events: all;
}
</style>