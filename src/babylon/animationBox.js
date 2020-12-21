import * as BABYLON from '@babylonjs/core/Legacy/legacy'

const frameRate = 12

// 拿出试剂瓶上的滴灌
const outDropper = new BABYLON.Animation(
  'outDropper',
  'position',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const outFrames = []
outFrames.push({
  frame: 0,
  value: new BABYLON.Vector3(80, 0, 80)
})
outFrames.push({
  frame: 1 * frameRate,
  value: new BABYLON.Vector3(80, 20, 80)
})
outFrames.push({
  frame: 3 * frameRate,
  value: new BABYLON.Vector3(0, 50, 0)
})
outDropper.setKeys(outFrames)

// 放回试剂瓶上的滴灌
const backDropper = new BABYLON.Animation(
  'backDropper',
  'position',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const backFrames = []
backFrames.push({
  frame: 0,
  value: new BABYLON.Vector3(0, 50, 0)
})
backFrames.push({
  frame: 2 * frameRate,
  value: new BABYLON.Vector3(80, 20, 80)
})
backFrames.push({
  frame: 3 * frameRate,
  value: new BABYLON.Vector3(80, 0, 80)
})
backDropper.setKeys(backFrames)

// 滴管中滴出溶液的过程
const dropLiquid = new BABYLON.Animation(
  'dropLiquid',
  'position.y',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const dropFrames = []
dropFrames.push({
  frame: 0,
  value: 53
})
dropFrames.push({
  frame: 2 * frameRate,
  value: 5
})
dropFrames.push({
  frame: 2.2 * frameRate,
  value: 53
})
dropLiquid.setKeys(dropFrames)

const easingFunction = new BABYLON.QuadraticEase()
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN)
dropLiquid.setEasingFunction(easingFunction)

// 液滴变大的过程
const liquidScale = new BABYLON.Animation(
  'liquidScale',
  'scaling',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const scaleFrames = []
scaleFrames.push({
  frame: 0,
  value: new BABYLON.Vector3(1, 1, 1)
})
scaleFrames.push({
  frame: 0.8 * frameRate,
  value: new BABYLON.Vector3(3, 3, 3)
})
liquidScale.setKeys(scaleFrames)

// 控制液滴可见性
const liquidSphereVisible = new BABYLON.Animation(
  'liquidSphereVisible',
  'visibility',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const visibileFrames = []
visibileFrames.push({
  frame: 0,
  value: 1
})
visibileFrames.push({
  frame: 1.9 * frameRate,
  value: 1
})
visibileFrames.push({
  frame: 2 * frameRate,
  value: 0
})
liquidSphereVisible.setKeys(visibileFrames)

// 滴管拿出来时，响应的控制按钮出现动画
const showButton = new BABYLON.Animation(
  'showButton',
  'alpha',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const showFrames = []
showFrames.push({
  frame: 0,
  value: 0
})
showFrames.push({
  frame: 2 * frameRate,
  value: 0
})
showFrames.push({
  frame: 3 * frameRate,
  value: 1
})
showButton.setKeys(showFrames)

// 滴管放回去时，响应的控制按钮消失动画
const hideButton = new BABYLON.Animation(
  'hideButton',
  'alpha',
  frameRate,
  BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
)
const hideFrames = []
hideFrames.push({
  frame: 0,
  value: 1
})
hideFrames.push({
  frame: 1 * frameRate,
  value: 0
})
hideButton.setKeys(hideFrames)

const animationBox = new Object({
  outDropper: outDropper,
  outFrames: outFrames,
  backDropper: backDropper,
  backFrames: backFrames,
  dropLiquid: dropLiquid,
  liquidScale: liquidScale,
  liquidSphereVisible: liquidSphereVisible,
  showButton: showButton,
  hideButton: hideButton
})

export default animationBox
