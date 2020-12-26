import Vue from 'vue'
import DialogVue from './dialog.vue'

let newInstance = null
//将 vue 组件变为构造函数
let DialogConstructor = Vue.extend(DialogVue)

let init = options => {
  newInstance = new DialogConstructor()
  Object.assign(newInstance, options)
  //document.body.appendChild(newInstance.$mount().$el)
  //document.getElementById('app').appendChild(newInstance.$mount().$el)

  let div = document.createElement('DIV')
  div.setAttribute('id', 'dialog')
  document.body.appendChild(div)
  document.getElementById('dialog').appendChild(newInstance.$mount().$el)
}

let caller = options => {
  if (!newInstance) {
    init(options)
  }
  return newInstance.show(vm => {
    newInstance = null
  })
}

export default {
  install(vue) {
    vue.prototype.$dialog = caller
  }
}
