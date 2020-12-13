import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import tube from '../assets/meshes/tube.glb'
import purbottle from '../assets/meshes/purbottle.glb'
import phebottle from '../assets/meshes/phebottle.glb'

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

    console.log(scene.animationGroups)
    const myan = scene.animationGroups.find(a => a.name === 'All Animations')
    myan.stop()
    console.log(scene.animatables)

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

    settingGround()
    function settingGround() {
      const ground = BABYLON.MeshBuilder.CreateGround('myGround', { width: 500, height: 500 }, scene)
      const matGround = new BABYLON.StandardMaterial('matGround', scene)
      matGround.diffuseColor = new BABYLON.Color3(218 / 255, 218 / 255, 218 / 255)
      matGround.opacityFresnel = true
      ground.material = matGround
      ground.receiveShadows = true
    }

    const matBottle = new BABYLON.StandardMaterial('matBottle', scene)
    matBottle.diffuseColor = new BABYLON.Color3(1, 1, 1)
    matBottle.alpha = 0.3

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

    const frameRate = 12

    const takeDropper = new BABYLON.Animation(
      'takeDropper',
      'position',
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )
    const putoutFrames = []
    putoutFrames.push({
      frame: 0,
      value: new BABYLON.Vector3(80, 0, 80)
    })

    putoutFrames.push({
      frame: 1 * frameRate,
      value: new BABYLON.Vector3(80, 20, 80)
    })

    putoutFrames.push({
      frame: 4 * frameRate,
      value: new BABYLON.Vector3(0, 50, 0)
    })

    putoutFrames.push({
      frame: 7 * frameRate,
      value: new BABYLON.Vector3(0, 50, 0)
    })

    putoutFrames.push({
      frame: 10 * frameRate,
      value: new BABYLON.Vector3(80, 20, 80)
    })

    putoutFrames.push({
      frame: 11 * frameRate,
      value: new BABYLON.Vector3(80, 0, 80)
    })
    takeDropper.setKeys(putoutFrames)

    const liquidSphere = BABYLON.MeshBuilder.CreateSphere('liquidSphere', { diameter: 0.4, segments: 32 }, scene)
    const matLiquidSphere = new BABYLON.StandardMaterial('matLiquidSphere', scene)
    matLiquidSphere.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
    liquidSphere.visibility = 0
    liquidSphere.material = matLiquidSphere
    liquidSphere.position.y = 53

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
      frame: 5 * frameRate,
      value: 53
    })

    dropFrames.push({
      frame: 8 * frameRate,
      value: 5
    })

    dropFrames.push({
      frame: 9 * frameRate,
      value: 5
    })

    dropFrames.push({
      frame: 11 * frameRate,
      value: 53
    })
    dropLiquid.setKeys(dropFrames)

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
      frame: 5 * frameRate,
      value: new BABYLON.Vector3(1, 1, 1)
    })

    scaleFrames.push({
      frame: 7 * frameRate,
      value: new BABYLON.Vector3(3, 3, 3)
    })

    scaleFrames.push({
      frame: 11 * frameRate,
      value: new BABYLON.Vector3(1, 1, 1)
    })
    liquidScale.setKeys(scaleFrames)

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
      value: 0
    })

    visibileFrames.push({
      frame: 5 * frameRate,
      value: 0
    })

    visibileFrames.push({
      frame: 5.2 * frameRate,
      value: 1
    })

    visibileFrames.push({
      frame: 8 * frameRate,
      value: 1
    })

    visibileFrames.push({
      frame: 8.5 * frameRate,
      value: 0
    })

    liquidSphereVisible.setKeys(visibileFrames)

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
          matLiquidSphere.diffuseColor = new BABYLON.Color3(160 / 255, 32 / 255, 240 / 255)
          putoutFrames[0].value = new BABYLON.Vector3(80, 0, 80)
          putoutFrames[1].value = new BABYLON.Vector3(80, 20, 80)
          putoutFrames[4].value = new BABYLON.Vector3(80, 20, 80)
          putoutFrames[5].value = new BABYLON.Vector3(80, 0, 80)
          scene.beginDirectAnimation(purDropper, [takeDropper], 0, 12 * frameRate, false)
          scene.beginDirectAnimation(purLiquid, [takeDropper], 0, 12 * frameRate, false)
          scene.beginDirectAnimation(
            liquidSphere,
            [dropLiquid, liquidScale, liquidSphereVisible],
            0,
            12 * frameRate,
            false
          )
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
          matLiquidSphere.diffuseColor = new BABYLON.Color3(1, 1, 1)
          putoutFrames[0].value = new BABYLON.Vector3(100, 0, 80)
          putoutFrames[1].value = new BABYLON.Vector3(100, 20, 80)
          putoutFrames[4].value = new BABYLON.Vector3(100, 20, 80)
          putoutFrames[5].value = new BABYLON.Vector3(100, 0, 80)
          scene.beginDirectAnimation(pheDropper, [takeDropper], 0, 12 * frameRate, false)
          scene.beginDirectAnimation(pheLiquid, [takeDropper], 0, 12 * frameRate, false)
          scene.beginDirectAnimation(
            liquidSphere,
            [dropLiquid, liquidScale, liquidSphereVisible],
            0,
            12 * frameRate,
            false
          )
        }
      })
    )
  })

  return scene
}
