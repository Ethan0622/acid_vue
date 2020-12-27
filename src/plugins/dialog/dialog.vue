<template>
  <div class="dialog">
    <dialog-bubble-vue class="bubble" @click="next" :clickable="!this.typer.typing">
      <p class="text">{{ typed }}</p>
    </dialog-bubble-vue>
    <div class="choices" v-if="showChoicesView">
      <div v-for="choice in paragraph.responses" :key="choice.name" @click="feedback(choice)" class="choice">
        {{ choice.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Typer from '../../plugins/typer'
import DialogBubbleVue from './DialogBubble.vue'


export default {
  components: { DialogBubbleVue },

  data() {
    return {
      paragraph: {},
      typed: '',
      typer: new Typer('initial'),
      typeTargetName: 'TALKS', // TALKS or FEEDBACKS
      typeContent: [],
      typeIndex: -1,
      showChoicesView: false,
    }
  },

  methods: {
    show(cb) {
      typeof cb === 'function' && cb.call(this)
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },

    talk() {
      this.typeIndex++
      this.typer.reset(this.typeContent[this.typeIndex]).type(
        (str) => {
          this.typed = str
        },
        () => {}
      )
    },

    next() {
      // 打字队列是否完成，如果完成了，进行接下来的环节
      if (this.typeIndex + 1 == this.typeContent.length) {
        // 是否在进行 TALKS 环节
        if (this.typeTargetName == 'TALKS') {
          // 判断有没有后续的玩家选择环节（responses），如果有则弹出选择 UI
          if (this.paragraph.responses && this.paragraph.responses.length > 0) {
            this.showChoice()
          } else {
            // 如果没有 responses 环节， 则结束这个段落的对话
            this.hide('FINISH_PARAGRAPH')
          }
        } else {
          this.hide('FINISH_PARAGRAPH')
        }
      }

      // 如果没完成，继续打字队列
      else {
        this.talk()
      }
    },

    hide(msg) {
      this.resolve(msg)
      document.body.removeChild(document.getElementById('dialog'))
      this.$destroy()
    },

    showChoice() {
      this.showChoicesView = true
    },

    hideChoice() {
      this.showChoicesView = false
    },

    feedback(choice) {
      this.hideChoice()
      this.typeTargetName = 'FEEDBACKS'
      this.typeContent = choice.feedbacks
      this.typeIndex = -1
      this.talk()
    },
  },

  mounted() {
    this.typeContent = this.paragraph.talks
    this.talk()
  },
}
</script>

<style scoped lang="scss">
.dialog {
  width: 80%;
  min-height: 30%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  .bubble {
    display: flex;
    flex-direction: column;
    background: white;
    min-height: 150px;
    cursor: pointer;
    .text {
      flex-grow: 1;
      margin: 16px;
    }
    .button {
      align-self: flex-end;
      background: darkblue;
      color: white;
      padding: 5px 20px;
      border-radius: 5px;
      margin: 15px;
      cursor: pointer;
    }
  }
  .choices {
    align-self: flex-end;
    margin: 5px 0;
    .choice {
      background: rgb(247, 218, 166);
      padding: 5px 50px;
      margin: 5px 0;
      cursor: pointer;
    }
  }
}
</style>