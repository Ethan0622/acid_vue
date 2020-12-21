import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import * as GUI from '@babylonjs/gui'
import tube from '../assets/meshes/tube.glb'
import purbottle from '../assets/meshes/purbottle.glb'
import phebottle from '../assets/meshes/phebottle.glb'
import animationBox from './animationBox'

export default function(canvas, engine) {
  // 创建一个场景scene
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color3(240 / 255, 240 / 255, 240 / 255)
  scene.createDefaultCamera(true, true, true)

  Promise.all([
    BABYLON.SceneLoader.ImportMeshAsync('', tube, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', purbottle, '', scene, undefined, '.glb'),
    BABYLON.SceneLoader.ImportMeshAsync('', phebottle, '', scene, undefined, '.glb')
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

    console.log(tubeMesh)
    console.log(purbottleMesh)
    console.log(phebottleMesh)

    // 停止模型自带动画
    const myan = scene.animationGroups.find(a => a.name === 'All Animations')
    myan.stop()

    // 添加一个相机，并绑定鼠标事件
    const camera = scene.activeCamera
    settingCamera()
    function settingCamera() {
      camera.beta = Math.PI / 1.8
      camera.alpha = -Math.PI / 2
      camera.radius = 160
      camera.target.y += 10
      camera.lowerBetaLimit = (Math.PI / 2) * 0.02
      camera.upperBetaLimit = (Math.PI / 2) * 0.9
      camera.lowerRadiusLimit = 120
      camera.upperRadiusLimit = 250
      camera.attachControl(canvas, true)
      camera.panningSensibility = 0
      camera.wheelPrecision = 5
      // camera.useAutoRotationBehavior = true;
      camera.useBouncingBehavior = true
      camera.useFramingBehavior = true
      camera.targetScreenOffset = new BABYLON.Vector2(0, -10)
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

    //高光
    const highLight = new BABYLON.HighlightLayer('hl1', scene)

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

    // 定义试剂瓶、试管所需材质
    const matBottle = new BABYLON.StandardMaterial('matBottle', scene)
    matBottle.diffuseColor = new BABYLON.Color3(1, 1, 1)
    matBottle.alpha = 0.3

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

    // 定义试管中溶液增减动画的函数
    BABYLON.Mesh.prototype.scaleyFromPivot = function(pivotPoint, t) {
      let _sy = (this.scaling.y + t / 10) / this.scaling.y
      // this.scaling.y = this.scaling.y + t / 10
      // this.position.y = pivotPoint.y + _sy * (this.position.y - pivotPoint.y)

      const blscaleY = new BABYLON.Animation(
        'blscaleY',
        'scaling.y',
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )
      const blscaleYFrames = []
      blscaleYFrames.push({
        frame: 0,
        value: this.scaling.y
      })
      blscaleYFrames.push({
        frame: 1.8 * frameRate,
        value: this.scaling.y
      })
      blscaleYFrames.push({
        frame: 2.2 * frameRate,
        value: this.scaling.y + t / 10
      })
      blscaleY.setKeys(blscaleYFrames)

      const blpositionY = new BABYLON.Animation(
        'blpositionY',
        'position.y',
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      )
      const blpositionYFrames = []
      blpositionYFrames.push({
        frame: 0,
        value: this.position.y
      })
      blpositionYFrames.push({
        frame: 1.8 * frameRate,
        value: this.position.y
      })
      blpositionYFrames.push({
        frame: 2.2 * frameRate,
        value: pivotPoint.y + _sy * (this.position.y - pivotPoint.y)
      })
      blpositionY.setKeys(blpositionYFrames)

      return [blscaleY, blpositionY]
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

      purBottle.material = matBottle
      purDropper.getChildMeshes()[0].material = matBottle
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

      pheDropper.position = new BABYLON.Vector3(100, 0, 80)
      pheLiquid.position = new BABYLON.Vector3(100, 0, 80)
      pheBottle.position = new BABYLON.Vector3(100, 0, 80)
      pheSolution.position = new BABYLON.Vector3(100, 0, 80)

      const matPhesolution = new BABYLON.StandardMaterial('matPhesolution', scene)
      matPhesolution.diffuseColor = new BABYLON.Color3(1, 1, 1)
      matPhesolution.alpha = 0.9
      pheSolution.material = matPhesolution

      pheBottle.material = matBottle
      pheDropper.getChildMeshes()[0].material = matBottle
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

    const pheText = new GUI.TextBlock()
    pheText.text = '酚酞试剂'
    pheText.resizeToFit = true
    pheText.color = 'balck'
    pheText.fontSize = 20
    advancedTexture.addControl(pheText)
    pheText.linkWithMesh(pheBottle)

    // 右侧切换视角的按钮，临时使用，切换视角还有点小问题
    const cameraButton = new GUI.Button.CreateSimpleButton('but1', '切换视角')
    cameraButton.left = '800px'
    cameraButton.width = '150px'
    cameraButton.height = '40px'
    cameraButton.color = 'white'
    cameraButton.cornerRadius = 20
    cameraButton.background = 'green'
    advancedTexture.addControl(cameraButton)

    // 控制滴管滴溶液和放回的按钮，由于加了动画，刚进入不可见
    const addButton = new GUI.Button.CreateSimpleButton('addButton', '滴加试剂')
    addButton.width = '150px'
    addButton.height = '40px'
    addButton.color = 'white'
    addButton.alpha = 0
    addButton.cornerRadius = 20
    addButton.background = 'green'
    advancedTexture.addControl(addButton)
    addButton.linkWithMesh(tube)
    addButton.linkOffsetY = -280
    addButton.linkOffsetX = 180

    const backButton = new GUI.Button.CreateSimpleButton('backButton', '放回滴管')
    backButton.width = '150px'
    backButton.height = '40px'
    backButton.color = 'white'
    backButton.alpha = 0
    backButton.cornerRadius = 20
    backButton.background = 'green'
    advancedTexture.addControl(backButton)
    backButton.linkWithMesh(tube)
    backButton.linkOffsetY = -280
    backButton.linkOffsetX = -180

    // 模拟液滴
    const liquidSphere = BABYLON.MeshBuilder.CreateSphere('liquidSphere', { diameter: 0.4, segments: 32 }, scene)
    const matLiquidSphere = new BABYLON.StandardMaterial('matLiquidSphere', scene)
    matLiquidSphere.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
    liquidSphere.visibility = 0
    liquidSphere.material = matLiquidSphere
    liquidSphere.position.y = 53

    // 整个场景动画的帧率，这个参数要与animationBox中的数值保持一致
    const frameRate = 12

    // 移动相机的动画，暂时独立不出去
    const moveCamera = new BABYLON.Animation(
      'moveCamera',
      'position',
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )
    const moveFrames = []
    moveFrames.push({
      frame: 0,
      value: camera.position
    })
    moveFrames.push({
      frame: 6 * frameRate,
      value: new BABYLON.Vector3(90, 10, -50)
    })
    moveCamera.setKeys(moveFrames)

    let whichLiquid = ''

    // 换滴管使用时调用此函数
    function changeDropper() {
      if (purDropper.position._x == 0) {
        animationBox.backFrames[1].value = new BABYLON.Vector3(80, 20, 80)
        animationBox.backFrames[2].value = new BABYLON.Vector3(80, 0, 80)
        scene.beginDirectAnimation(purDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
        scene.beginDirectAnimation(purLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
      } else if (pheDropper.position._x == 0) {
        animationBox.backFrames[1].value = new BABYLON.Vector3(100, 20, 80)
        animationBox.backFrames[2].value = new BABYLON.Vector3(100, 0, 80)
        scene.beginDirectAnimation(pheDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
        scene.beginDirectAnimation(pheLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
      }
    }

    // 右侧切换视角按钮的点击事件
    cameraButton.onPointerUpObservable.add(function() {
      camera.setTarget(new BABYLON.Vector3(90, 20, 80))
      setTimeout(() => {
        scene.beginDirectAnimation(camera, [moveCamera], 0, 6 * frameRate, false, 6, function() {
          console.log('完成！')
        })
      }, 500)
    })

    // 定义试管中的液体缩放基准点
    let pivotAt = new BABYLON.Vector3(0, main_liquid.getBoundingInfo().boundingBox.vectorsWorld[0].y, 0) 

    // 滴加试剂按钮的点击事件
    addButton.onPointerUpObservable.add(function() {
      if (scene.animatables.length == 0) {
        if (whichLiquid == 'pur') {
          matLiquidSphere.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
          scene.beginDirectAnimation(
            liquidSphere,
            [animationBox.dropLiquid, animationBox.liquidScale, animationBox.liquidSphereVisible],
            0,
            2.2 * frameRate,
            false
          )
          scene.beginDirectAnimation(
            main_liquid,
            [main_liquid.scaleyFromPivot(pivotAt, 0.2)[0], main_liquid.scaleyFromPivot(pivotAt, 0.2)[1]],
            0,
            2.2 * frameRate,
            false
          )
        }
        if (whichLiquid == 'phe') {
          matLiquidSphere.diffuseColor = new BABYLON.Color3(1, 1, 1)
          scene.beginDirectAnimation(
            liquidSphere,
            [animationBox.dropLiquid, animationBox.liquidScale, animationBox.liquidSphereVisible],
            0,
            2.2 * frameRate,
            false
          )
          scene.beginDirectAnimation(
            main_liquid,
            [main_liquid.scaleyFromPivot(pivotAt, 0.2)[0], main_liquid.scaleyFromPivot(pivotAt, 0.2)[1]],
            0,
            2.2 * frameRate,
            false
          )
        }
      }
    })

    // 放回滴管按钮的点击事件
    backButton.onPointerUpObservable.add(function() {
      if (scene.animatables.length == 0) {
        if (whichLiquid == 'pur') {
          animationBox.backFrames[1].value = new BABYLON.Vector3(80, 20, 80)
          animationBox.backFrames[2].value = new BABYLON.Vector3(80, 0, 80)
          scene.beginDirectAnimation(purDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(purLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(addButton, [animationBox.hideButton], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(backButton, [animationBox.hideButton], 0, 3 * frameRate, false)
        }
        if (whichLiquid == 'phe') {
          animationBox.backFrames[1].value = new BABYLON.Vector3(100, 20, 80)
          animationBox.backFrames[2].value = new BABYLON.Vector3(100, 0, 80)
          scene.beginDirectAnimation(pheDropper, [animationBox.backDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(pheLiquid, [animationBox.backDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(addButton, [animationBox.hideButton], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(backButton, [animationBox.hideButton], 0, 3 * frameRate, false)
        }
      }
    })

    // 两个检测试剂瓶的鼠标监听事件
    purBottle.actionManager = new BABYLON.ActionManager(scene)
    pheBottle.actionManager = new BABYLON.ActionManager(scene)

    purBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(purBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(purDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      })
    )

    purBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(purBottle)
        highLight.removeMesh(purDropper.getChildMeshes()[0])
        highLight.removeMesh(purDropper.getChildMeshes()[1])
      })
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
          scene.beginDirectAnimation(addButton, [animationBox.showButton], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(backButton, [animationBox.showButton], 0, 3 * frameRate, false)
        }
      })
    )

    pheBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
        highLight.addMesh(pheBottle, BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[0], BABYLON.Color3.Magenta())
        highLight.addMesh(pheDropper.getChildMeshes()[1], BABYLON.Color3.Magenta())
      })
    )

    pheBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
        highLight.removeMesh(pheBottle)
        highLight.removeMesh(pheDropper.getChildMeshes()[0])
        highLight.removeMesh(pheDropper.getChildMeshes()[1])
      })
    )

    pheBottle.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
        if (scene.animatables.length == 0) {
          changeDropper()
          whichLiquid = 'phe'
          animationBox.outFrames[0].value = new BABYLON.Vector3(100, 0, 80)
          animationBox.outFrames[1].value = new BABYLON.Vector3(100, 20, 80)
          scene.beginDirectAnimation(pheDropper, [animationBox.outDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(pheLiquid, [animationBox.outDropper], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(addButton, [animationBox.showButton], 0, 3 * frameRate, false)
          scene.beginDirectAnimation(backButton, [animationBox.showButton], 0, 3 * frameRate, false)
        }
      })
    )
  })

  return scene
}
