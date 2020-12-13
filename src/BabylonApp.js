import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import "@babylonjs/loaders/glTF"
import createScene from "./babylon/createScene"

export default class BabylonApp {
    constructor(domId) {
        let canvas = document.getElementById(domId) // 得到canvas对象的引用
        let engine = new BABYLON.Engine(canvas, true) // 初始化 BABYLON 3D engine
        let scene = createScene(canvas, engine)

        engine.runRenderLoop(() => { scene.render() })

        window.addEventListener("resize", () => { engine.resize() });
    }
}