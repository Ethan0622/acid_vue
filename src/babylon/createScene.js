import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import * as GUI from '@babylonjs/gui'
import tube from '../assets/meshes/tube.glb'
import purbottle from '../assets/meshes/purbottle.glb'
import phebottle from '../assets/meshes/phebottle.glb'
import dropper from '../assets/meshes/dropper.glb'
import animationBox from './animationBox'
import { createActions } from './createActions'

export default function(canvas, engine) {
  // 整个场景动画的帧率，这个参数要与animationBox中的数值保持一致，本项目帧率保持12不变
  const frameRate = 12

  // 创建一个场景scene
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
  scene.createDefaultCamera(true, true, true)

  Promise.all([
    BABYLON.SceneLoader.ImportMeshAsync('', tube, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', purbottle, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', phebottle, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', dropper, '', scene, undefined, '.glb')
  ]).then(function() {
    const tubeMesh = []
    tubeMesh.push(scene.getMeshByName('tube'))
    tubeMesh.push(scene.getMeshByName('bottom_liquid'))
    tubeMesh.push(scene.getMeshByName('main_liquid'))

    const purbottleMesh = []
    purbottleMesh.push(scene.getTransformNodeByName('purdropper'))
    purbottleMesh.push(scene.getMeshByName('purliquid'))
    purbottleMesh.push(scene.getMeshByName('purbottle'))
    purbottleMesh.push(scene.getMeshByName('pursolution'))

    const phebottleMesh = []
    phebottleMesh.push(scene.getTransformNodeByName('phedropper'))
    phebottleMesh.push(scene.getMeshByName('pheliquid'))
    phebottleMesh.push(scene.getMeshByName('phebottle'))
    phebottleMesh.push(scene.getMeshByName('phesolution'))

    const dropperMesh = []
    dropperMesh.push(scene.getTransformNodeByName('dropper'))
    dropperMesh.push(scene.getMeshByName('dropliquid'))

    // 停止模型自带动画
    const myan = scene.animationGroups.find(a => a.name === 'All Animations')
    myan.stop()

    // 添加一个相机，并绑定鼠标事件
    const camera = scene.activeCamera
    settingCamera()
    function settingCamera() {
      camera.beta = Math.PI / 1.8
      camera.alpha = -Math.PI / 2
      camera.setTarget(new BABYLON.Vector3(0, 10, 0))
      camera.lowerBetaLimit = (Math.PI / 2) * 0.02
      camera.upperBetaLimit = (Math.PI / 2) * 0.9
      camera.lowerRadiusLimit = 50
      camera.upperRadiusLimit = 250
      camera.attachControl(canvas, true)
      camera.panningSensibility = 1
      camera.wheelPrecision = 3
      camera.useBouncingBehavior = true
      camera.useFramingBehavior = true
      camera.position = new BABYLON.Vector3(0, 50, -160)
    }

    // 添加一组灯光到场景
    settingLight()
    function settingLight() {
      const light1 = new BABYLON.HemisphericLight('HemisphericLight', new BABYLON.Vector3(150, -500, 0), scene)
      const light2 = new BABYLON.HemisphericLight('HemisphericLight2', new BABYLON.Vector3(100, 500, 0), scene)
      const shadowLight = new BABYLON.DirectionalLight('shadowControlLight', new BABYLON.Vector3(100, -100, 0), scene)
      shadowLight.position = new BABYLON.Vector3(-80, 80, 0)
      light1.intensity = 0.6
      light2.intensity = 0.6
      shadowLight.intensity = 0.7
    }

    // 添加一个地面
    settingGround()
    function settingGround() {
      const ground = BABYLON.MeshBuilder.CreateGround('myGround', { width: 500, height: 500 }, scene)
      const matGround = new BABYLON.StandardMaterial('matGround', scene)
      matGround.diffuseColor = new BABYLON.Color3(218 / 255, 218 / 255, 218 / 255)
      matGround.opacityFresnel = true
      ground.material = matGround
      ground.receiveShadows = true
    }

    // 定义试剂瓶、试管的玻璃透明材质
    const matGlass = new BABYLON.StandardMaterial('matGlass', scene)
    matGlass.diffuseColor = new BABYLON.Color3(1, 1, 1)
    matGlass.alpha = 0.3

    // 设置试管参数
    let tube = tubeMesh[0]
    let bottom_liquid = tubeMesh[1]
    let main_liquid = tubeMesh[2]
    modifyTubeMeshes()
    function modifyTubeMeshes() {
      tube.parent = null
      bottom_liquid.parent = null
      main_liquid.parent = null

      const matTube = new BABYLON.StandardMaterial('matTube', scene)
      matTube.diffuseColor = new BABYLON.Color3(1, 1, 1)
      matTube.alpha = 0.7
      tube.material = matTube

      const matLiquid = new BABYLON.StandardMaterial('matLiquid', scene)
      matLiquid.diffuseColor = new BABYLON.Color3(0, 0, 1)
      bottom_liquid.material = matLiquid
      main_liquid.material = matLiquid
    }

    // 设置紫色石蕊试剂参数
    let purDropper = purbottleMesh[0]
    let purLiquid = purbottleMesh[1]
    let purBottle = purbottleMesh[2]
    let purSolution = purbottleMesh[3]
    modifyPurbottlMeshes()
    function modifyPurbottlMeshes() {
      purDropper.parent = null
      purLiquid.parent = null
      purBottle.parent = null
      purSolution.parent = null

      purDropper.position = new BABYLON.Vector3(80, 0, 80)
      purLiquid.position = new BABYLON.Vector3(80, 0, 80)
      purBottle.position = new BABYLON.Vector3(80, 0, 80)
      purSolution.position = new BABYLON.Vector3(80, 0, 80)

      const matPursolution = new BABYLON.StandardMaterial('matPursolution', scene)
      matPursolution.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
      matPursolution.alpha = 0.9
      purSolution.material = matPursolution
      purLiquid.material = matPursolution

      purBottle.material = matGlass
      purDropper.getChildMeshes()[0].material = matGlass
    }

    // 设置无色酚酞试剂参数
    let pheDropper = phebottleMesh[0]
    let pheLiquid = phebottleMesh[1]
    let pheBottle = phebottleMesh[2]
    let pheSolution = phebottleMesh[3]
    modifyPhebottleMeshes()
    function modifyPhebottleMeshes() {
      pheDropper.parent = null
      pheLiquid.parent = null
      pheBottle.parent = null
      pheSolution.parent = null

      pheDropper.position = new BABYLON.Vector3(110, 0, 80)
      pheLiquid.position = new BABYLON.Vector3(110, 0, 80)
      pheBottle.position = new BABYLON.Vector3(110, 0, 80)
      pheSolution.position = new BABYLON.Vector3(110, 0, 80)

      const matPhesolution = new BABYLON.StandardMaterial('matPhesolution', scene)
      matPhesolution.diffuseColor = new BABYLON.Color3(1, 1, 1)
      matPhesolution.alpha = 0.9
      pheSolution.material = matPhesolution

      pheBottle.material = matGlass
      pheDropper.getChildMeshes()[0].material = matGlass
    }

    // 设置添加溶液的滴管参数
    let dropper = dropperMesh[0]
    let dropliquid = dropperMesh[1]
    modifyDropperMeshes()
    function modifyDropperMeshes() {
      dropper.getChildMeshes()[0].material = matGlass

      dropper.position.y = 50
      dropliquid.position.y = 50

      dropliquid.visibility = 0
      dropper.getChildMeshes()[0].visibility = 0
      dropper.getChildMeshes()[1].visibility = 0
    }

    // 添加阴影
    settingShadow()
    function settingShadow() {
      let directionalLight = scene.getLightByName('shadowControlLight')
      const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight)
      shadowGenerator.addShadowCaster(main_liquid)
      shadowGenerator.addShadowCaster(purBottle)
      shadowGenerator.addShadowCaster(pheBottle)
      shadowGenerator.useExponentialShadowMap = true
      shadowGenerator.setTransparencyShadow(true)
      shadowGenerator.setDarkness(0.36) //阴影灰度，0为全黑，1为无阴影
      shadowGenerator.useBlurExponentialShadowMap = true
      shadowGenerator.useKernelBlur = true
      shadowGenerator.blurKernel = 150
    }

    const advancedTexture = new GUI.AdvancedDynamicTexture.CreateFullscreenUI('uiContainer')

    // 试剂瓶上的提示，动画暂未添加
    const purText = new GUI.TextBlock()
    purText.text = '紫色石蕊试剂'
    purText.resizeToFit = true
    purText.color = 'balck'
    purText.fontSize = 20
    advancedTexture.addControl(purText)
    purText.linkWithMesh(purBottle)
    purText.linkOffsetY = 50
    purText.alpha = 0

    const pheText = new GUI.TextBlock()
    pheText.text = '酚酞试剂'
    pheText.resizeToFit = true
    pheText.color = 'balck'
    pheText.fontSize = 20
    advancedTexture.addControl(pheText)
    pheText.linkWithMesh(pheBottle)
    pheText.linkOffsetY = 50
    pheText.alpha = 0

    // 模拟液滴
    const liquidSphere = BABYLON.MeshBuilder.CreateSphere('liquidSphere', { diameter: 0.4, segments: 32 }, scene)
    const matLiquidSphere = new BABYLON.StandardMaterial('matLiquidSphere', scene)
    matLiquidSphere.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
    liquidSphere.visibility = 0
    liquidSphere.material = matLiquidSphere
    liquidSphere.position.y = 53

    // 定义试管中的液体缩放基准点
    let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0)

    createActions(scene, { purBottle, purDropper, purLiquid, pheBottle, pheDropper, pheLiquid, purText, pheText })
  })

  return scene
}
