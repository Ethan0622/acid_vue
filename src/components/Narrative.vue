<template>
  <div></div>
</template>

<script>
import script from '../assets/scripts/script'

export default {
  props: {
    babylon: Object,
  },
  data() {
    return {}
  },
  async mounted() {
    const p1 = script.paragraphs.find((p) => p.id == '初始画面')
    await this.$dialog({ paragraph: p1 })

    const p2 = script.paragraphs.find((p) => p.id == '选择酸溶液')
    await this.$dialog({ paragraph: p2 })

    this.babylon.pullInCamera()
  },
}
</script>