import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import '@babylonjs/loaders/glTF'
import createScene from './babylon/createScene'

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
    const camera = this.scene.activeCamera
    const frameRate = 12
    const pullInCamera = new BABYLON.Animation(
      'pullInCamera',
      'position',
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )
    const pullInCameraFrames = []
    pullInCameraFrames.push({
      frame: 0,
      value: camera.position
    })
    pullInCameraFrames.push({
      frame: 6 * frameRate,
      value: new BABYLON.Vector3(0, 50, -50)
    })
    pullInCamera.setKeys(pullInCameraFrames)
    camera.setTarget(new BABYLON.Vector3(0, 60, 0))
    setTimeout(() => {
      this.scene.beginDirectAnimation(camera, [pullInCamera], 0, 6 * frameRate, false, 6, function() {
        console.log('完成！')
      })
    }, 500)
  }
}
