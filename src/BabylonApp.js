import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'
import createScene from './babylon/createScene'
import animationBox from './babylon/animationBox'

export default class BabylonApp {
  constructor(domId) {
    this.canvas = document.getElementById(domId) // 得到canvas对象的引用
    this.engine = new BABYLON.Engine(this.canvas, true) // 初始化 BABYLON 3D engine
    this.scene = createScene(this.canvas, this.engine)

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }

  pullInCamera() {
    const frameRate = 12
    const pullInCamera =  animationBox.pullInCamera(this.scene.activeCamera)
    this.scene.activeCamera.setTarget(new BABYLON.Vector3(0, 65, 0))
    setTimeout(() => {
      this.scene.beginDirectAnimation(this.scene.activeCamera, [pullInCamera], 0, 6 * frameRate, false, 6, function() {
        console.log('完成！')
      })
    }, 500)
  }
}
