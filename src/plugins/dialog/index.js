import Vue from 'vue'
import DialogVue from './dialog.vue'

let _dialogInstance = null

let DialogConstructor = Vue.extend(DialogVue)

let init = options => {
  _dialogInstance = new DialogConstructor()
  Object.assign(_dialogInstance, options)

  const node = document.createElement('DIV')
  node.setAttribute('id', 'dialog')
  document.body.appendChild(node)
  document.getElementById('dialog').appendChild(_dialogInstance.$mount().$el)
}

let caller = options => {
  if (!_dialogInstance) {
    init(options)
  }
  return _dialogInstance.show(vm => {
    _dialogInstance = null
  })
}

export default {
  install(vue) {
    vue.prototype.$dialog = caller
  }
}
