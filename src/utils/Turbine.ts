import Three from "./Three";
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js";
import { isFunction } from "lodash-es";
const textureLoader = new THREE.TextureLoader()


type animationPropsType = {
  [key: string]: number;
};

class Turbine {
  threeInstance: Three;
  constructor(threeInstance: Three) {
    this.threeInstance = threeInstance;
    this.loadObject()
  }
  async loadObject() {
    const glb = await this.threeInstance.loadGLTF("turbine.glb");
    const mesh = glb.scene;
    const scale = 0.0003 * 1;
    mesh.scale.set(scale, scale, scale);
    // mesh.rotateX(Math.PI / 2);
    // mesh.rotateY(-Math.PI / 2);
    mesh.position.set(0, 0, 0);
    const metal = mesh.getObjectByName("颜色材质") as THREE.Object3D;
    console.log(metal)
    const metal2 = mesh.getObjectByName("线框材质") as THREE.Object3D;
    // metal2.visible = false;
    let localPlane1 = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5);
    console.log("localPlane1", localPlane1)
    let step = 0.01;
    let clippingPlanesStatus = true; // 避免一直render渲染

    metal.traverse(e => {
      if (e instanceof THREE.Mesh) {
        e.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 1,
          roughness: 0.7,
        })
        e.material.clippingPlanes = [localPlane1];

      }
    })
    this.threeInstance.addRenderCallback(() => {
      localPlane1.constant -= step;
      if (localPlane1.constant <= -1 || localPlane1.constant >= 101) {

        clippingPlanesStatus = false;
      }
    })
    this.threeInstance.addToGroup(mesh);
    this.threeInstance.animation(mesh, glb.animations, "Anim_0");
  }
  updateYawAngle(deg: number) {
    const oldAngle = this.threeInstance.group.rotation.z;
    const newAngle = deg * (Math.PI / 180);
    const updateCallback = (data: animationPropsType) => {
      this.threeInstance.group.rotation.z = data.angle;
    };
    this.animation(
      { angle: oldAngle },
      { angle: newAngle },
      2000,
      updateCallback
    );
  }
  animation(
    oldValue: animationPropsType,
    newValue: animationPropsType,
    during: number,
    updateCallback: (arg: animationPropsType) => void
  ) {
    const tween = new TWEEN.Tween(oldValue);
    tween.to(newValue, during);
    tween.onUpdate((object: any) => {
      isFunction(updateCallback) && updateCallback(object);
    });
    tween.easing(TWEEN.Easing.Linear.None);
    tween.start();
  }
}

export default Turbine