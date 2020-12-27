<template>
  <div></div>
</template>

<script>
import script from '../assets/scripts/script'
import operation from '../babylon/operation'

export default {
  props: {
    babylon: Object,
  },
  data() {
    return {}
  },
  async mounted() {
    console.log(this.babylon)
    const p1 = script.paragraphs.find((p) => p.id == '初始画面')
    await this.$dialog({ paragraph: p1 })

    const p2 = script.paragraphs.find((p) => p.id == '选择酸溶液')
    await this.$dialog({ paragraph: p2 })

    this.babylon.pullInCamera()
  },
}
</script>