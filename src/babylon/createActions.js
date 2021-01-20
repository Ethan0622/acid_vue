import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import animationBox from './animationBox'

export const createActions = (
  scene,
  { purBottle, purDropper, purLiquid, pheBottle, pheDropper, pheLiquid, purText, pheText }
) => {
  const frameRate = 12
  let whichLiquid = ''

  //高光
  const highLight = new BABYLON.HighlightLayer('hl1', scene)

  // 换滴管使用时调用此函数
  function changeDropper() {
    if (purDropper.position._x == 0) {
      animationBox.backFrames[1].value = new BABYLON.Vector3(80, 20, 80)
      animationBox.backFrames[2].value = new BABYLON.Vector3(80, 0, 80)
      scene.beginDirectAnimation(purDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
      scene.beginDirectAnimation(purLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
    } else if (pheDropper.position._x == 0) {
      animationBox.backFrames[1].value = new BABYLON.Vector3(110, 20, 80)
      animationBox.backFrames[2].value = new BABYLON.Vector3(110, 0, 80)
      scene.beginDirectAnimation(pheDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
      scene.beginDirectAnimation(pheLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
    }
  }

  // 两个检测试剂瓶的鼠标监听事件
  purBottle.actionManager = new BABYLON.ActionManager(scene)
  pheBottle.actionManager = new BABYLON.ActionManager(scene)

  purBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOverTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(purBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, purText, 'alpha', 1, 300)
    ])
  )

  purBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOutTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(purBottle)
        highLight.removeMesh(purDropper.getChildMeshes()[0])
        highLight.removeMesh(purDropper.getChildMeshes()[1])
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, purText, 'alpha', 0, 300)
    ])
  )

  purBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
      if (scene.animatables.length == 0) {
        changeDropper()
        whichLiquid = 'pur'
        animationBox.outFrames[0].value = new BABYLON.Vector3(80, 0, 80)
        animationBox.outFrames[1].value = new BABYLON.Vector3(80, 20, 80)
        scene.beginDirectAnimation(purDropper, [animationBox.outDropper], 0, 3 * frameRate, false)
        scene.beginDirectAnimation(purLiquid, [animationBox.outDropper], 0, 3 * frameRate, false)
      }
    })
  )

  pheBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOverTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(pheBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, pheText, 'alpha', 1, 300)
    ])
  )

  pheBottle.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPointerOutTrigger, [
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(pheBottle)
        highLight.removeMesh(pheDropper.getChildMeshes()[0])
        highLight.removeMesh(pheDropper.getChildMeshes()[1])
      }),
      new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, pheText, 'alpha', 0, 300)
    ])
  )

  pheBottle.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
      if (scene.animatables.length == 0) {
        changeDropper()
        whichLiquid = 'phe'
        animationBox.outFrames[0].value = new BABYLON.Vector3(110, 0, 80)
        animationBox.outFrames[1].value = new BABYLON.Vector3(110, 20, 80)
        scene.beginDirectAnimation(pheDropper, [animationBox.outDropper], 0, 3 * frameRate, false)
        scene.beginDirectAnimation(pheLiquid, [animationBox.outDropper], 0, 3 * frameRate, false)
      }
    })
  )
}
