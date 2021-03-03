<script>
/*eslint-disable */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
export default {
	inject: ["global"],
	methods: {
		loadTurbine() {
			const url = "/model/turbine2.glb";
			let loader = new GLTFLoader();
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("/draco/");
			dracoLoader.preload();
			loader.setDRACOLoader(dracoLoader);
			loader.load(url, (object) => {
				console.log(object);
				// this.matrixTurbine = object;
				let mesh = object.scene;
				this.turbineAnimation = object.animations;
				let scale = 0.001 * 1;
				mesh.scale.set(scale, scale, scale);
				this.global.scene.add(mesh);
				mesh.rotateX(Math.PI / 2);
				mesh.rotateY(-Math.PI / 2);
				// resolve(object);
			});
		},
		initLight() {
			const scene = this.global.scene;
			const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
			hemiLight.position.set(0, 5, 0);
			scene.add(hemiLight);
			var helper = new THREE.HemisphereLightHelper( hemiLight, 5 );
			scene.add(helper);


			const dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(0, 20, 10);
			scene.add(dirLight);
		},
	},
	mounted() {
		this.loadTurbine();
		this.initLight();
	},
	render() {
		return null;
	},
};
</script>
