import { GUIHelp } from '@orillusion/debug/GUIHelp';
import { Stats } from '@orillusion/stats'
import { Engine3D, Scene3D, AtmosphericComponent, CameraUtil, HoverCameraController, Object3D, MeshRenderer, BoxGeometry, LitMaterial, DirectLight, KelvinUtil, View3D, Vector3, Vector3Ex, UnLitMaterial, InstanceDrawComponent, LambertMaterial, Time, BoundingBox, Color, OcclusionSystem, PostProcessingComponent, GlobalFog, SphereGeometry } from '@orillusion/core';
import { GUIUtil } from '@samples/utils/GUIUtil';

// simple base demo
class Sample_drawCall {
    scene: Scene3D;
    public anim: boolean = false;
    async run() {

        Engine3D.setting.pick.enable = false;
        // init engine
        await Engine3D.init({ renderLoop: () => this.renderLoop() });

        OcclusionSystem.enable = false;
        // create new Scene
        this.scene = new Scene3D();

        // add performance stats
        this.scene.addComponent(Stats);

        // add an Atmospheric sky enviroment
        let sky = this.scene.addComponent(AtmosphericComponent);
        sky.sunY = 0.6

        // init camera3D
        let mainCamera = CameraUtil.createCamera3D(null, this.scene);
        mainCamera.perspective(60, Engine3D.aspect, 1, 2000.0);

        // add a basic camera controller
        let hoverCameraController = mainCamera.object3D.addComponent(HoverCameraController);
        hoverCameraController.setCamera(15, -15, 300);

        // add a basic direct light
        let lightObj = new Object3D();
        lightObj.rotationX = 45;
        lightObj.rotationY = 60;
        lightObj.rotationZ = 150;
        let dirLight = lightObj.addComponent(DirectLight);
        dirLight.lightColor = KelvinUtil.color_temperature_to_rgb(5500);
        dirLight.intensity = 100;
        dirLight.indirect = 1;
        this.scene.addChild(lightObj);

        sky.relativeTransform = dirLight.transform;

        // create a view with target this.scene and camera
        let view = new View3D();
        view.scene = this.scene;
        view.camera = mainCamera;

        // start render
        Engine3D.startRenderView(view);
        GUIHelp.init();
        // let post = view.scene.addComponent(PostProcessingComponent);
        // let fog = post.addPost(GlobalFog);
        // fog.fogColor = new Color(136 / 255, 215 / 255, 236 / 255, 1);
        // fog.start = 0;
        // fog.overrideSkyFactor = 0.0764;
        // fog.ins = 1;
        // fog.falloff = 0.626;
        // fog.scatteringExponent = 3;
        // fog.dirHeightLine = 10;
        // GUIUtil.renderGlobalFog(fog);

        GUIHelp.add(this, "anim").onChange = () => {
            this.anim != this.anim;
        };



        this.initScene();
    }


    private _list: Object3D[] = [];
    private _rotList: number[] = [];
    initScene() {
        let shareGeometry = new BoxGeometry();
        // let material = new UnLitMaterial();
        let materials = [
            // new LitMaterial(),
            new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
            // new LambertMaterial(),
        ];

        for (let i = 0; i < materials.length; i++) {
            const element = materials[i];
            // element.metallic = 0.97;
            // element.roughness = 0.15;
            // element.baseColor = new Color().hexToRGB(Color.GOLD);
            element.baseColor = new Color(
                Math.random(),
                Math.random(),
                Math.random(),
            );
        }

        // let material = new LitMaterial();

        let group = new Object3D();
        let count = 50000;

        GUIHelp.addFolder('info');
        GUIHelp.open();
        GUIHelp.addInfo(`count `, count);

        let ii = 0;
        // let count = 70000;
        for (let i = 0; i < count; i++) {
            let pos = Vector3Ex.sphereXYZ(ii * 60 + 20, ii * 60 + 100, 100, i * 0.001 + 10, 100);
            // let pos = Vector3Ex.getRandomXYZ(-2, 2);
            let obj = new Object3D();
            let mr = obj.addComponent(MeshRenderer);
            mr.geometry = shareGeometry;// Math.random() > 0.5 ? new BoxGeometry(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5) : new SphereGeometry(Math.random() + 0.5, Math.floor(Math.random() * 15 + 8), Math.floor(Math.random() * 15 + 8));
            // mr.geometry = Math.random() > 0.5 ? new BoxGeometry(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5) : new SphereGeometry(Math.random() + 0.5, Math.floor(Math.random() * 15 + 8), Math.floor(Math.random() * 15 + 8));
            mr.material = materials[Math.floor(Math.random() * materials.length)];
            obj.localPosition = pos;
            group.addChild(obj);
            this._list.push(obj);

            obj.transform.scaleX = Math.random() * 2 + 0.2;
            obj.transform.scaleY = Math.random() * 2 + 0.2;
            obj.transform.scaleZ = Math.random() * 2 + 0.2;

            obj.transform.rotationX = Math.random() * 360;
            obj.transform.rotationY = Math.random() * 360;
            obj.transform.rotationZ = Math.random() * 360;
            // if (i < count - 1) {
            //     obj.localPosition = Vector3.ZERO;
            // }

            this._rotList.push((Math.random() * 1 - 1 * 0.5) * 2.0 * Math.random() * 100);
            obj.transform.rotatingY = 16 * 0.01 * this._rotList[i];

            if (i % 10000 == 0) {
                ii++;
            }
        }

        group.addComponent(InstanceDrawComponent);
        this._rotList.push(1.0);
        group.transform.rotatingY = 16 * 0.01 * 1;

        group.bound = new BoundingBox(Vector3.SAFE_MIN, Vector3.SAFE_MAX);
        this._list.push(group);
        this.scene.addChild(group);
    }

    renderLoop() {
        if (this.anim) {
            let i = 0;
            for (let i = 0; i < this._list.length; i++) {
                const element = this._list[i];
                // element.transform.rotationY += Time.delta * 0.01 * this._rotList[i];
                element.transform._localRot.y += Time.delta * 0.01 * this._rotList[i];
                element.transform._localChange = true;
            }
        }
    }
}

new Sample_drawCall().run()