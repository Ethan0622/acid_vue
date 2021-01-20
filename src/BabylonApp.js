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
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const pullInCamera = animationBox.moveCameraByPosition(
        this.scene.activeCamera,
        new BABYLON.Vector3(0, 50, -50),
        6 * frameRate
      )
      const showDropper = animationBox.showMesh(2 * frameRate)
      this.scene.activeCamera.setTarget(new BABYLON.Vector3(0, 60, 0))
      this.scene.beginDirectAnimation(this.scene.activeCamera, [pullInCamera], 0, 6 * frameRate, false)

      this.scene.beginDirectAnimation(this.scene.getMeshByName('dropper_primitive0'), [showDropper], 0, 2 * frameRate, false)
      this.scene.beginDirectAnimation(this.scene.getMeshByName('dropper_primitive1'), [showDropper], 0, 2 * frameRate, false)
      this.scene.beginDirectAnimation(this.scene.getMeshByName('dropliquid'), [showDropper], 0, 2 * frameRate, false, 1, () => {
        resolve()
      })
    })
  }

  firstDropLiqiud() {
    return new Promise((resolve, reject) => {
      const frameRate = 12
      const liquidSphere = this.scene.getMeshByName('liquidSphere')

      this.scene.beginDirectAnimation(
        liquidSphere,
        [animationBox.liquidSphereVisible, animationBox.liquidScale, animationBox.dropLiquid],
        0,
        2 * frameRate,
        false,
        1,
        () => {
          resolve()
        }
      )
    })
  }
}
