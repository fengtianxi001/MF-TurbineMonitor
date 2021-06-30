<template>
    <ul
        class="equipmentLabel"
        ref="demo"
        :class="{ hide: labelHide }"
        @click="labelHide = true"
    >
        <li></li>
        <li class="labelInfo">
            <div>
                <header>
                    <div class="cn">{{ nowLabelData.cn }}</div>
                    <span class="en">{{ nowLabelData.en }}</span>
                </header>
                <ul>
                    <li v-for="(item, index) in nowLabelData.list" :key="index">
                        <span>{{ item.name }}:</span>
                        <span>{{ item.value }}</span>
                        <span>{{ item.unit }}</span>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>
<script>
/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import TWEEN from "@tweenjs/tween.js";

export default {
    name: "TTurebine",
    inject: ["global"],
    data() {
        return {
            matrixTurbine: null,
            wireframe: null,
            metal: null,
            mouse: new THREE.Vector2(),
            raycaster: new THREE.Raycaster(),
            equipment: null,
            equipmentMaterialMap: new Map(),
            wholeGroup: new THREE.Group(),
            plane: null,
            wholeGroupall: new THREE.Group(),
            turbineLabel: null,
            labelHide: true,
            labelData: {
                polySurface152: {
                    cn: "变桨系统",
                    en: "Variable-Pitch System",
                    list: [
                        {
                            name: "轴箱1变桨位置",
                            value: "0.03",
                            unit: null
                        },
                        {
                            name: "轴箱2变桨位置",
                            value: "0.01",
                            unit: null
                        },
                        {
                            name: "轴箱3变桨位置",
                            value: "0.02",
                            unit: null
                        }
                    ]
                },
                polySurface258: {
                    cn: "主轴",
                    en: "Principal Axis",
                    list: [
                        {
                            name: "额定电压",
                            value: "110",
                            unit: "v"
                        },
                        {
                            name: "额定电流",
                            value: "101",
                            unit: "A"
                        },
                        {
                            name: "额定功率",
                            value: "2",
                            unit: "kw"
                        },
                        {
                            name: "功率频率",
                            value: "100",
                            unit: "Hz"
                        }
                    ]
                },
                polySurface230: {
                    cn: "齿轮箱",
                    en: "Gear Box",
                    list: [
                        {
                            name: "油槽温度",
                            value: "51",
                            unit: "°C"
                        },
                        {
                            name: "入口轴温度",
                            value: "41",
                            unit: "°C"
                        },
                        {
                            name: "输入轴温度",
                            value: "66",
                            unit: "°C"
                        },
                        {
                            name: "输出轴温度",
                            value: "60",
                            unit: "°C"
                        }
                    ]
                },
                pasted__pCube97: {
                    cn: "风冷装置",
                    en: "Air Cooling System",
                    list: [
                        {
                            name: "风冷温度",
                            value: "7",
                            unit: "°C"
                        },
                        {
                            name: "风冷功率",
                            value: "300",
                            unit: "kWh"
                        },
                        {
                            name: "功率",
                            value: "200",
                            unit: "kw"
                        },
                        {
                            name: "温度",
                            value: "24",
                            unit: "°C"
                        }
                    ]
                },
                pasted__extrudedSurface2: {
                    cn: "油冷装置",
                    en: "oil Cooling System",
                    list: [
                        {
                            name: "额定功率",
                            value: "7",
                            unit: "kw"
                        },
                        {
                            name: "油箱容量",
                            value: "300",
                            unit: "L"
                        },
                        {
                            name: "机器油耗",
                            value: "200",
                            unit: "G/KW.H"
                        },
                        {
                            name: "工作时间",
                            value: "24",
                            unit: "H"
                        }
                    ]
                },
                pasted__extrudedSurface8: {
                    cn: "发电机",
                    en: "Generator",
                    list: [
                        {
                            name: "轴承A温度",
                            value: "33",
                            unit: "°C"
                        },
                        {
                            name: "轴承B温度",
                            value: "34",
                            unit: "°C"
                        },
                        {
                            name: "叶轮转速",
                            value: "8",
                            unit: "RPM"
                        },
                        {
                            name: "转速",
                            value: "1322",
                            unit: "RPM"
                        }
                    ]
                }
            },
            nowLabelData: {
                cn: "暂无数据",
                en: "暂无数据",
                list: [
                    {
                        name: "暂无数据",
                        value: "暂无数据",
                        unit: "暂无数据"
                    }
                ]
            }
        };
    },
    methods: {
        loadTurbine() {
            const loader = new GLTFLoader()
            const onProgress=xhr=>{
                this.$emit("progress",xhr.loaded/xhr.total*100)
            }
            loader.load(`${process.env.BASE_URL}model/untitled1.glb`, object => {
                this.$emit("complete")
                this.matrixTurbine = object;
                let mesh = object.scene;
                this.mesh = mesh;
                this.metal = mesh.getObjectByName("颜色材质");
                this.wireframe = mesh.getObjectByName("线框材质");
                this.metal.visible = false;
                this.turbineAnimation = object.animations;
                let scale = 0.0003 * 1;
                mesh.scale.set(scale, scale, scale);
                mesh.rotateX(Math.PI / 2);
                mesh.rotateY(-Math.PI / 2);
                const plane = object.scene.getObjectByName("polySurface136");
                mesh.remove(plane);
                this.wholeGroup.add(mesh);
                mesh.position.set(0, 0, -2.42);
                this.changeAnimation(mesh, "Anim_0");
            },onProgress);
            
        },
        loadEquipment() {
            let loader = new GLTFLoader();
            loader.load(`${process.env.BASE_URL}model/equipment.glb`, object => {
                let mesh = object.scene;
                this.equipment = mesh;
                mesh.traverse(child => {
                    if (child.isMesh) {
                        const material = child.material.clone();
                        child.material = material;
                        // console.log(material.uuid)
                        this.equipmentMaterialMap.set(child.name, child);
                    }
                });
                let scale = 0.0003 * 1;
                mesh.scale.set(scale, scale, scale);
                mesh.rotateX(Math.PI / 2);
                mesh.rotateY(-Math.PI / 2);
                this.wholeGroup.add(mesh);
                // this.wholeGroup2.add(mesh);

                mesh.position.set(0, 0, -2.42);
            });
        },
        loadingPlane() {
            let loader = new GLTFLoader();
            loader.load(`${process.env.BASE_URL}model/plane.glb`, object => {
                let mesh = object.scene;
                // this.equipment = mesh;
                let scale = 0.0003 * 1;
                mesh.scale.set(scale, scale, scale);
                mesh.rotateX(Math.PI / 2);
                mesh.rotateY(-Math.PI / 2);
                this.global.scene.add(mesh);
                mesh.position.set(0, 0, -2.42);
            });
        },
        //添加和改变风机旋转动画
        changeAnimation(turbine, animationName) {
            const animations = this.matrixTurbine.animations;
            const mixer = new THREE.AnimationMixer(turbine);
            const clip = THREE.AnimationClip.findByName(
                animations,
                animationName
            );
            const key = "AA";
            if (clip) {
                const action = mixer.clipAction(clip);
                action.play();
                this.global.mixers.set(key, mixer);
            } else {
                this.global.mixers.delete(key);
            }
        },
        onPointerClick(event) {
            const [w, h] = [window.innerWidth, window.innerHeight];
            const { mouse, global, equipment, raycaster } = this;
            this.mouse.x = (event.clientX / w) * 2 - 1;
            this.mouse.y = -(event.clientY / h) * 2 + 1;
            raycaster.setFromCamera(mouse, global.camera);
            const intersects = raycaster.intersectObject(equipment, true);
            if (intersects.length <= 0) return false;
            const selectedObject = intersects[0].object;
            if (selectedObject.isMesh) {
                // alert();
                // console.log(intersects[0].point);
                this.outline([selectedObject]);
                this.nowLabelData = this.labelData[intersects[0].object.name];
                this.updateLabal(intersects[0]);
            }
        },
        outline(selectedObjects, color = 0x15c5e8) {
            const { renderer, camera, scene } = this.global;
            const [w, h] = [window.innerWidth, window.innerHeight];
            var compose = new EffectComposer(renderer);
            var renderPass = new RenderPass(scene, camera);
            var outlinePass = new OutlinePass(
                new THREE.Vector2(w, h),
                scene,
                camera,
                selectedObjects
            );
            outlinePass.renderToScreen = true;
            outlinePass.selectedObjects = selectedObjects;
            compose.addPass(renderPass);
            compose.addPass(outlinePass);
            const params = {
                edgeStrength: 10,
                edgeGlow: 0,
                edgeThickness: 50.0,
                pulsePeriod: 1,
                usePatternTexture: false
            };
            outlinePass.edgeStrength = params.edgeStrength;
            outlinePass.edgeGlow = params.edgeGlow;
            outlinePass.visibleEdgeColor.set(color);
            outlinePass.hiddenEdgeColor.set(color);
            compose.render(scene, camera);
            this.$set(this.global, "compose", compose);
        },
        //过度动画
        animation(oldObject, newObject, time, update, complete) {
            var tween = new TWEEN.Tween(oldObject);
            tween.to(newObject, time);
            tween.onUpdate(function(object) {
                update && update(object);
            });
            tween.onComplete(function() {
                complete && complete();
            });
            tween.easing(TWEEN.Easing.Linear.None);
            tween.start();
        },
        //更新风机的偏航角
        updataTurbineYawAngle() {
            setInterval(() => {
                const curAngle = this.wholeGroup.rotation.z;
                const newAngle = parseInt(Math.random() * 90) * (Math.PI / 180);
                const update = data => {
                    // let polySurface189 = this.wholeGroup.getObjectByName("polySurface189")
                    // console.log();
                    // polySurface189.rotation.y = data.angle;
                    this.wholeGroup.rotation.z = data.angle;
                };
                const complete = () => {
                    // this.turbineYawAngle.set(entityId, newAngle);
                };
                this.animation(
                    { angle: curAngle },
                    { angle: newAngle },
                    2000,
                    update,
                    complete
                );
            }, 5000);
        },
        createCssObject(str) {
            const dom = $(str)[0];
            let CSSObject = new CSS2DObject(dom);
            // console.log("CSSObject", CSSObject);
            return CSSObject;
        },
        createTurbineLabel() {
            let label = new CSS2DObject(this.$refs.demo);
            this.turbineLabel = label;
            this.global.scene.add(label);
        },
        updateLabal(intersect) {
            this.labelHide = false;
            const point = intersect.point;
            this.turbineLabel.position.set(point.x, point.y, point.z);
        },
        alarm() {
            const nameList = [
                "pasted__extrudedSurface2",
                "pasted__extrudedSurface8",
                "pasted__group59_pCylinder158",
                "pasted__pCube70",
                "pasted__pCube97",
                "polySurface152",
                "polySurface156",
                "polySurface230",
                "polySurface258"
            ];
            setInterval(() => {
                const random = parseInt(Math.random() * 9);
                const equipment = this.equipmentMaterialMap.get(
                    nameList[random]
                );
                if (equipment) {
                    equipment.material.emissive.setHex(equipment.currentHex);
                }
                equipment.currentHex = equipment.material.emissive.getHex();
                equipment.material.emissive.setHex(0xff0000);
                setTimeout(() => {
                    if (equipment)
                        equipment.material.emissive.setHex(
                            equipment.currentHex
                        );
                }, 4000);
            }, 5000);
        }
    },
    mounted() {
        this.loadTurbine();
        this.loadEquipment();
        this.loadingPlane();
        this.updataTurbineYawAngle();
        this.createTurbineLabel();
        this.alarm();
        this.global.scene.add(this.wholeGroup);
        document.addEventListener("click", this.onPointerClick);
    }
};
</script>
<style lang="scss" scoped>
.hide {
    display: none;
}
.show {
    display: block !important;
}
.equipmentLabel {
    z-index: 999;
    // display: flex;
    width: 988px;
    height: 451px;
    // background-color: red;
    & > li:nth-child(1) {
        color: #fff;
        width: 191.5px;
        height: 225.5px;
        background-image: url("../../../../assets/images/1.png");
        background-size: 191.5px auto;
        position: absolute;
        right: 302.5px;
        top: 0px;
    }
    .labelInfo {
        width: 302.5px;
        height: 225.5px;
        background-image: url("../../../../assets/images/2.png");
        background-size: 302.5px auto;
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 10px;
        box-sizing: border-box;
        & > div {
            width: 100%;
            height: 100%;
            background-color: #04669e73;
            border: 1px solid #15c5e8;
            box-sizing: border-box;
            padding: 20px 20px;
            header {
                width: 100%;
                // height: 40px;
                text-align: left;
                font-size: 14px;
                line-height: 20px;
                color: #fff;
                border-bottom: 1px dashed aqua;
                padding-bottom: 14px;
                .en {
                    font-size: 12px;
                    color: aqua;
                }
            }
            ul {
                width: 100%;
                color: #fff;
                li {
                    line-height: 30px;
                    font-size: 14px;
                    display: flex;
                    // justify-content: space-between;
                    text-align: left;
                    align-items: center;
                    span:nth-child(1) {
                        width: 40%;
                    }
                    span:nth-child(2) {
                        width: 10%;
                        color: #f0c002;
                    }
                    span:nth-child(3) {
                        width: 30%;
                    }
                }
            }
        }
    }
}
</style>
