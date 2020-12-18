import { Nullable } from "babylonjs/types";
import { SerializationHelper } from "babylonjs/Misc/decorators";
import { Matrix, Vector3, Vector4 } from "babylonjs/Maths/math.vector";
import { IAnimatable } from 'babylonjs/Animations/animatable.interface';
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { MaterialDefines } from "babylonjs/Materials/materialDefines";
import { MaterialHelper } from "babylonjs/Materials/materialHelper";
import { IEffectCreationOptions } from "babylonjs/Materials/effect";
import { PushMaterial } from "babylonjs/Materials/pushMaterial";
import { VertexBuffer } from "babylonjs/Meshes/buffer";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { SubMesh } from "babylonjs/Meshes/subMesh";
import { Mesh } from "babylonjs/Meshes/mesh";
import { Scene } from "babylonjs/scene";
import { _TypeStore } from 'babylonjs/Misc/typeStore';
import { Color3 } from 'babylonjs/Maths/math.color';
import { BlobTextureData } from './fluentBlob';

import "./fluent.fragment";
import "./fluent.vertex";
import { EffectFallbacks } from 'babylonjs/Materials/effectFallbacks';
import { Texture } from "babylonjs";

class FluentMaterialDefines extends MaterialDefines {
    public Relative_Width = true;
    public Enable_Fade = true;
    public _needNormals = true;
    public _needUVs = true;

    constructor() {
        super();
        this.rebuild();
    }
}

export class FluentMaterial extends PushMaterial {
    private _blobTexture: Texture;

    constructor(name: string, scene: Scene) {
        super(name, scene);
        this.disableDepthWrite = true;
        this.backFaceCulling = false;

        this._blobTexture = Texture.CreateFromBase64String(
            BlobTextureData,
            "fluentBlobTexture",
            scene,
            true, false,
            Texture.NEAREST_SAMPLINGMODE);
    }

    public needAlphaBlending(): boolean {
        return true;
    }

    public needAlphaTesting(): boolean {
        return true;
    }

    public getAlphaTestTexture(): Nullable<BaseTexture> {
        return null;
    }

    // Methods
    public isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean {
        if (this.isFrozen) {
            if (subMesh.effect && subMesh.effect._wasPreviouslyReady) {
                return true;
            }
        }

        if (!subMesh._materialDefines) {
            subMesh._materialDefines = new FluentMaterialDefines();
        }

        var defines = <FluentMaterialDefines>subMesh._materialDefines;
        var scene = this.getScene();

        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }

        var engine = scene.getEngine();

        // Attribs
        MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, false);

        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();

            scene.resetCachedMaterial();

            // Fallbacks
            var fallbacks = new EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }

            MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);

            if (defines.NUM_BONE_INFLUENCERS > 0) {
                fallbacks.addCPUSkinningFallback(0, mesh);
            }

            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;

            //Attributes
            var attribs = [VertexBuffer.PositionKind];

            if (defines.NORMAL) {
                attribs.push(VertexBuffer.NormalKind);
            }

            if (defines.UV1) {
                attribs.push(VertexBuffer.UVKind);
            }

            if (defines.UV2) {
                attribs.push(VertexBuffer.UV2Kind);
            }

            if (defines.VERTEXCOLOR) {
                attribs.push(VertexBuffer.ColorKind);
            }

            if (defines.TANGENT) {
                attribs.push(VertexBuffer.TangentKind);
            }

            MaterialHelper.PrepareAttributesForInstances(attribs, defines);

            // Legacy browser patch
            var shaderName = "fluent";
            var join = defines.toString();

            var uniforms = [
                "world", "viewProjection", "cameraPosition",

                "_Edge_Width_",
                "_Edge_Color_",
                "_Relative_Width_",
                "_Proximity_Max_Intensity_",
                "_Proximity_Far_Distance_",
                "_Proximity_Near_Radius_",
                "_Proximity_Anisotropy_",
                "_Selection_Fuzz_",
                "_Selected_",
                "_Selection_Fade_",
                "_Selection_Fade_Size_",
                "_Selected_Distance_",
                "_Selected_Fade_Length_",
                "_Blob_Enable_",
                "_Blob_Position_",
                "_Blob_Intensity_",
                "_Blob_Near_Size_",
                "_Blob_Far_Size_",
                "_Blob_Near_Distance_",
                "_Blob_Far_Distance_",
                "_Blob_Fade_Length_",
                "_Blob_Inner_Fade_",
                "_Blob_Pulse_",
                "_Blob_Fade_",
                "_Blob_Texture_",
                "_Blob_Enable_2_",
                "_Blob_Position_2_",
                "_Blob_Near_Size_2_",
                "_Blob_Inner_Fade_2_",
                "_Blob_Pulse_2_",
                "_Blob_Fade_2_",
                "_Active_Face_Dir_",
                "_Active_Face_Up_",
                "_Enable_Fade_",
                "_Fade_Width_",
                "_Smooth_Active_Face_",
                "_Show_Frame_",

                "Use_Global_Left_Index",
                "Use_Global_Right_Index",
                "Global_Left_Index_Tip_Position",
                "Global_Right_Index_Tip_Position",
                "Global_Left_Thumb_Tip_Position",
                "Global_Right_Thumb_Tip_Position",
                "Global_Left_Index_Tip_Proximity",
                "Global_Right_Index_Tip_Proximity"
            ];
            var samplers: string[] = ["_Blob_Texture_"];
            var uniformBuffers = new Array<string>();

            MaterialHelper.PrepareUniformsAndSamplersList(<IEffectCreationOptions>{
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: defines,
                maxSimultaneousLights: 4
            });

            subMesh.setEffect(scene.getEngine().createEffect(shaderName,
                <IEffectCreationOptions>{
                    attributes: attribs,
                    uniformsNames: uniforms,
                    uniformBuffersNames: uniformBuffers,
                    samplers: samplers,
                    defines: join,
                    fallbacks: fallbacks,
                    onCompiled: this.onCompiled,
                    onError: this.onError,
                    indexParameters: { maxSimultaneousLights: 4 }
                }, engine), defines);
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }

        defines._renderId = scene.getRenderId();
        subMesh.effect._wasPreviouslyReady = true;

        return true;
    }

    public bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void {
        var scene = this.getScene();

        var defines = <FluentMaterialDefines>subMesh._materialDefines;
        if (!defines) {
            return;
        }

        var effect = subMesh.effect;
        if (!effect) {
            return;
        }

        this._activeEffect = effect;

        // Matrices
        this.bindOnlyWorldMatrix(world);
        this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
        this._activeEffect.setVector3("cameraPosition", scene.activeCamera!.position);

        // "Wireframe"
        this._activeEffect.setFloat("_Edge_Width_", 0.04);
        this._activeEffect.setColor4("_Edge_Color_", new Color3(0.592157, 0.592157, 0.592157), 1);
        //define _Relative_Width_ true;

        // "Proximity"
        this._activeEffect.setFloat("_Proximity_Max_Intensity_", 0.45);
        this._activeEffect.setFloat("_Proximity_Far_Distance_", 0.16);
        this._activeEffect.setFloat("_Proximity_Near_Radius_", 1.5);
        this._activeEffect.setFloat("_Proximity_Anisotropy_", 1);

        // "Selection"
        this._activeEffect.setFloat("_Selection_Fuzz_", 0.5);
        this._activeEffect.setFloat("_Selected_", 0);
        this._activeEffect.setFloat("_Selection_Fade_", 0);
        this._activeEffect.setFloat("_Selection_Fade_Size_", 0.3);
        this._activeEffect.setFloat("_Selected_Distance_", 0.08);
        this._activeEffect.setFloat("_Selected_Fade_Length_", 0.08);

        // "Blob"
        this._activeEffect.setFloat("_Blob_Enable_", true ? 1.0 : 0.0);
        this._activeEffect.setVector3("_Blob_Position_", new Vector3(0.5, 0.0, -0.55));
        this._activeEffect.setFloat("_Blob_Intensity_", 0.5);
        this._activeEffect.setFloat("_Blob_Near_Size_", 0.025);
        this._activeEffect.setFloat("_Blob_Far_Size_", 0.05);
        this._activeEffect.setFloat("_Blob_Near_Distance_", 0);
        this._activeEffect.setFloat("_Blob_Far_Distance_", 0.08);
        this._activeEffect.setFloat("_Blob_Fade_Length_", 0.08);
        this._activeEffect.setFloat("_Blob_Inner_Fade_", 0.01);
        this._activeEffect.setFloat("_Blob_Pulse_", 0);
        this._activeEffect.setFloat("_Blob_Fade_", 1);

        // "Blob Texture"
        this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);

        // "Blob 2"
        this._activeEffect.setFloat("_Blob_Enable_2_", true ? 1.0 : 0.0);
        this._activeEffect.setVector3("_Blob_Position_2_", new Vector3(10, 10.1, -0.6));
        this._activeEffect.setFloat("_Blob_Near_Size_2_", 0.025);
        this._activeEffect.setFloat("_Blob_Inner_Fade_2_", 0.1);
        this._activeEffect.setFloat("_Blob_Pulse_2_", 0);
        this._activeEffect.setFloat("_Blob_Fade_2_", 1);

        // "Active Face"
        this._activeEffect.setVector3("_Active_Face_Dir_", new Vector3(0, 0, -1));
        this._activeEffect.setVector3("_Active_Face_Up_", new Vector3(0, 1, 0));

        // "Hololens Edge Fade"
        //define _Enable_Fade_ true;
        this._activeEffect.setFloat("_Fade_Width_", 1.5);
        this._activeEffect.setFloat("_Smooth_Active_Face_", true ? 1.0 : 0.0);

        // "Debug"
        this._activeEffect.setFloat("_Show_Frame_", false ? 1.0 : 0.0);


        // Global inputs
        this._activeEffect.setFloat("Use_Global_Left_Index", 1.0);
        this._activeEffect.setFloat("Use_Global_Right_Index", 1.0);

        this._activeEffect.setVector4("Global_Left_Index_Tip_Position", new Vector4(0.5, 0.0, -0.55, 1.0));
        this._activeEffect.setVector4("Global_Right_Index_Tip_Position", new Vector4(0.0, 0.0, 0.0, 1.0));

        this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position", new Vector4(0.5, 0.0, -0.55, 1.0));
        this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position", new Vector4(0.0, 0.0, 0.0, 1.0));

        this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity", 0.0);
        this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity", 0.0);

        this._afterBind(mesh, this._activeEffect);
    }

    public getAnimatables(): IAnimatable[] {
        return [];
    }

    public dispose(forceDisposeEffect?: boolean): void {

        super.dispose(forceDisposeEffect);
    }

    public clone(name: string): FluentMaterial {
        return SerializationHelper.Clone(() => new FluentMaterial(name, this.getScene()), this);
    }

    public serialize(): any {
        var serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.FluentMaterial";
        return serializationObject;
    }

    public getClassName(): string {
        return "FluentMaterial";
    }

    // Statics
    public static Parse(source: any, scene: Scene, rootUrl: string): FluentMaterial {
        return SerializationHelper.Parse(() => new FluentMaterial(source.name, scene), source, scene, rootUrl);
    }
}

_TypeStore.RegisteredTypes["BABYLON.FluentMaterial"] = FluentMaterial;