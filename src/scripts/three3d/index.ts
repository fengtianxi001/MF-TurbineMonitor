import ThreeBase from "./ThreeBase"
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js";
import { MODELSCALES, MODELPOSITION } from "configs/three3d";
import { isFunction } from "lodash-es";
import { BaseOptionsType, animationPropsType } from "./types";
// @ts-ignore
import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
class Three3D extends ThreeBase {
    equipmentMaterialMap: Map<string, THREE.Mesh>;
    equipments: THREE.Group;
    constructor(element: HTMLElement, options?: BaseOptionsType) {
        super(element, options)
        this.equipmentMaterialMap = new Map()
        this.equipments = new THREE.Group
        this.addLights()
        this.adjustConfigs()
    }
    addLights() {
        const lights = [
            [100, 100, 100],
            [-100, 100, 100],
            [100, -100, 100],
        ];
        lights.map(([x, y, z]) => {
            const spotLight = new THREE.DirectionalLight(0xffffff, 3);
            spotLight.position.set(x, y, z);
            this.scene.add(spotLight);
        });
    }
    adjustConfigs() {
        this.camera.position.set(-2, 4, 4)
        this.control.target = new THREE.Vector3(0, 2.5, 0)
        this.control.update()
    }
    async loadTurbineSkeleton() {
        const gltf = await this.loadGLTF("turbine.glb")
        const object = gltf.scene
        object.scale.set(...MODELSCALES)
        object.position.set(...MODELPOSITION);
        const shellModel = object.getObjectByName("颜色材质") as THREE.Object3D;
        const wireFrameModel = object.getObjectByName("线框材质") as THREE.Object3D;
        //白色外壳消隐效果
        const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5);
        shellModel.traverse(mesh => {
            if (!(mesh instanceof THREE.Mesh)) return void 0
            mesh.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0.7,
            })
            mesh.material.clippingPlanes = [localPlane];
        })
        this.renderMixins.push(() => {
            if (localPlane.constant <= -1) return void 0;
            localPlane.constant -= 0.01
        })
        if (this.groups.has("turbine")) {
            this.groups.get("turbine")?.add(object)
        } else {
            this.createGroup("turbine").add(object)
        }
        this.palyAnimation(object, gltf.animations, "Anim_0")
        this.updateTurbineYawAngle(this.groups.get("turbine") as THREE.Group)
    }
    private updateTurbineYawAngle(trubineGroup: THREE.Group) {
        setInterval(() => {
            const random = Math.floor(Math.random() * 90) - 45 // 正负45
            const oldAngle = trubineGroup.rotation.y;
            //在oldAngle基础上转动正负45°
            const newAngle = (random * (Math.PI / 180)) + oldAngle;
            const updateCallback = (data: animationPropsType) => {
                trubineGroup.rotation.y = data.angle;
            };
            this.animation(
                { angle: oldAngle },
                { angle: newAngle },
                2000,
                updateCallback
            );
        }, 5 * 1000)
    }
    private animation(
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
    async loadTurbinePlane() {
        const gltf = await this.loadGLTF("plane.glb")
        const texture = gltf.scene.children[0].material.map
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        this.renderMixins.push(() => {
            const count = texture.repeat.y
            if (count <= 10) {
                texture.repeat.x += 0.01;
                texture.repeat.y += 0.02;
                // texture.offset.x += 10;
            } else {
                texture.repeat.x = 0
                texture.repeat.y = 0
            }
        })
        let mesh = gltf.scene
        mesh.scale.set(...MODELSCALES)
        mesh.position.set(0, 0, 0);
        if (this.groups.has("turbine")) {
            this.groups.get("turbine")?.add(mesh)
        } else {
            this.createGroup("trubine").add(mesh)
        }
    }
    async loadTurbineEquipment() {
        const gltf = await this.loadGLTF("equipment.glb");
        const object = gltf.scene;
        this.equipments = object;
        object.scale.set(...MODELSCALES);
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const meshChild = child as THREE.Mesh;
                const material = meshChild.material as any;
                meshChild.material = material.clone();
                this.equipmentMaterialMap.set(child.name, child);
            }
        });
        if (this.groups.has("turbine")) {
            this.groups.get("turbine")?.add(object)
        } else {
            this.createGroup("trubine").add(object)
        }
        this.alarmEquipment();
        document.addEventListener("click", this.equipmentClick.bind(this))
    }
    private alarmEquipment() {

        const equipments = [
            "主轴",
            "偏航电机",
            "发电机",
            "变桨系统",
            "控制柜",
            "油冷装置",
            "转子",
            "风冷装置",
            "齿轮箱",
        ];
        setInterval(() => {
            const equipment = this.equipmentMaterialMap.get(
                equipments[Math.floor(Math.random() * 9)]
            );
            if (equipment) {
                //@ts-ignore
                equipment.material.emissive.setHex(equipment.currentHex);
            }
            equipment.currentHex = equipment.material.emissive.getHex();
            equipment.material.emissive.setHex(0xff0000);
            setTimeout(() => {
                if (equipment) equipment.material.emissive.setHex(equipment.currentHex);
            }, 4000);
        }, 5000);
    }
    private equipmentClick(event: MouseEvent) {
        const mouse = new THREE.Vector2(
            (event.clientX / this.element.offsetWidth) * 2 - 1,
            -(event.clientY / this.element.offsetHeight) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObject(this.equipments, true);
        if (intersects.length <= 0) return false;
        const selectedObject = intersects[0].object;
        if (selectedObject.type === "Mesh") {
            this.outline([selectedObject]);
        }
    }
    private outline(selectedObjects: THREE.Object3D<THREE.Event>[], color = 0x15c5e8) {
        const { renderer, camera, scene } = this;
        const composer = new EffectComposer(renderer);
        var renderPass = new RenderPass(scene, camera);
        var outlinePass = new OutlinePass(
            new THREE.Vector2(this.element.offsetWidth, this.element.offsetWidth),
            scene,
            camera,
            selectedObjects
        );
        outlinePass.renderToScreen = true;
        outlinePass.selectedObjects = selectedObjects;
        composer.addPass(renderPass);
        composer.addPass(outlinePass);
        const params = {
            edgeStrength: 10,
            edgeGlow: 0,
            edgeThickness: 50.0,
            pulsePeriod: 1,
            usePatternTexture: false,
        };
        outlinePass.edgeStrength = params.edgeStrength;
        outlinePass.edgeGlow = params.edgeGlow;
        outlinePass.visibleEdgeColor.set(color);
        outlinePass.hiddenEdgeColor.set(color);
        composer.render(scene, camera);
        this.composers.push(composer)
    }


}

export default Three3D