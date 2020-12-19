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
import { Color3, Color4 } from 'babylonjs/Maths/math.color';
import { BlobTextureData } from './fluentBlob';

import "./fluent.fragment";
import "./fluent.vertex";
import { EffectFallbacks } from 'babylonjs/Materials/effectFallbacks';
import { Constants, Texture } from "babylonjs";

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
    // "Wireframe"
    public EdgeWidth = 0.04;
    public EdgeColor = new Color4(0.592157, 0.592157, 0.592157, 1.0);
    public RelativeWidth = true;

    // "Proximity"
    public ProximityMaxIntensity = 0.45;
    public ProximityFarDistance = 0.16;
    public ProximityNearRadius = 1.5;
    public ProximityAnisotropy = 1;

    // "Selection"
    public SelectionFuzz = 0.5;
    public Selected = 0;
    public SelectionFade = 0;
    public SelectionFadeSize = 0.3;
    public SelectedDistance = 0.08;
    public SelectedFadeLength = 0.08;

    // "Blob"
    public BlobEnable = true;
    public BlobPosition = new Vector3(0.5, 0.0, -0.55);
    public BlobIntensity = 0.5;
    public BlobNearSize = 0.025;
    public BlobFarSize = 0.05;
    public BlobNearDistance = 0;
    public BlobFarDistance = 0.08;
    public BlobFadeLength = 0.08;
    public BlobInnerFade = 0.01;
    public BlobPulse = 0;
    public BlobFade = 1;

    // "Blob 2"
    public BlobEnable2 = true;
    public BlobPosition2 = new Vector3(10, 10.1, -0.6);
    public BlobNearSize2 = 0.025;
    public BlobInnerFade2 = 0.1;
    public BlobPulse2 = 0;
    public BlobFade2 = 1;

    // "Active Face"
    public ActiveFaceDir = new Vector3(0, 0, -1);
    public ActiveFaceUp = new Vector3(0, 1, 0);

    // "Hololens Edge Fade"
    public EnableFade = true;
    public FadeWidth = 1.5;
    public SmoothActiveFace = true ? 1.0 : 0.0;

    // "Debug"
    public ShowFrame = false;

    // Global inputs
    public UseGlobalLeftIndex = true;
    public UseGlobalRightIndex = true;

    public GlobalLeftIndexTipPosition = Vector3.Zero();
    public GlobalRightIndexTipPosition = Vector3.Zero();

    public GlobalLeftThumbTipPosition = Vector3.Zero();
    public GlobalRightThumbTipPosition = Vector3.Zero();

    public GlobalLeftIndexTipProximity = 0.0;
    public GlobalRightIndexTipProximity = 0.0;

    private _blobTexture: Nullable<Texture>;

    constructor(name: string, scene: Scene, public UseBlobTexture = true) {
        super(name, scene);
        this.alphaMode = Constants.ALPHA_ADD;
        this.disableDepthWrite = true;
        this.backFaceCulling = false;

        this._blobTexture = this.UseBlobTexture
            ? Texture.CreateFromBase64String(
                BlobTextureData,
                "fluentBlobTexture",
                scene,
                true, true,
                Texture.NEAREST_SAMPLINGMODE)
            : null;
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
                "_Use_Blob_Texture_",

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

        // "Blob Texture"
        if (this._blobTexture != null) {
            this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);
        }

        // "Wireframe"
        this._activeEffect.setFloat("_Edge_Width_", this.EdgeWidth);
        this._activeEffect.setColor4("_Edge_Color_", new Color3(this.EdgeColor.r, this.EdgeColor.g, this.EdgeColor.b), this.EdgeColor.a);
        //define _Relative_Width_ true;

        // "Proximity"
        this._activeEffect.setFloat("_Proximity_Max_Intensity_", this.ProximityMaxIntensity);
        this._activeEffect.setFloat("_Proximity_Far_Distance_", this.ProximityFarDistance);
        this._activeEffect.setFloat("_Proximity_Near_Radius_", this.ProximityNearRadius);
        this._activeEffect.setFloat("_Proximity_Anisotropy_", this.ProximityAnisotropy);

        // "Selection"
        this._activeEffect.setFloat("_Selection_Fuzz_", this.SelectionFuzz);
        this._activeEffect.setFloat("_Selected_", this.Selected);
        this._activeEffect.setFloat("_Selection_Fade_", this.SelectionFade);
        this._activeEffect.setFloat("_Selection_Fade_Size_", this.SelectionFadeSize);
        this._activeEffect.setFloat("_Selected_Distance_", this.SelectedDistance);
        this._activeEffect.setFloat("_Selected_Fade_Length_", this.SelectedFadeLength);

        // "Blob"
        this._activeEffect.setFloat("_Blob_Enable_", this.BlobEnable ? 1.0 : 0.0);
        this._activeEffect.setVector3("_Blob_Position_", this.BlobPosition);
        this._activeEffect.setFloat("_Blob_Intensity_", this.BlobIntensity);
        this._activeEffect.setFloat("_Blob_Near_Size_", this.BlobNearSize);
        this._activeEffect.setFloat("_Blob_Far_Size_", this.BlobFarSize);
        this._activeEffect.setFloat("_Blob_Near_Distance_", this.BlobNearDistance);
        this._activeEffect.setFloat("_Blob_Far_Distance_", this.BlobFarDistance);
        this._activeEffect.setFloat("_Blob_Fade_Length_", this.BlobFadeLength);
        this._activeEffect.setFloat("_Blob_Inner_Fade_", this.BlobInnerFade);
        this._activeEffect.setFloat("_Blob_Pulse_", this.BlobPulse);
        this._activeEffect.setFloat("_Blob_Fade_", this.BlobFade);

        // "Blob 2"
        this._activeEffect.setFloat("_Blob_Enable_2_", this.BlobEnable2 ? 1.0 : 0.0);
        this._activeEffect.setVector3("_Blob_Position_2_", this.BlobPosition2);
        this._activeEffect.setFloat("_Blob_Near_Size_2_", this.BlobNearSize2);
        this._activeEffect.setFloat("_Blob_Inner_Fade_2_", this.BlobInnerFade2);
        this._activeEffect.setFloat("_Blob_Pulse_2_", this.BlobPulse2);
        this._activeEffect.setFloat("_Blob_Fade_2_", this.BlobFade2);

        // "Active Face"
        this._activeEffect.setVector3("_Active_Face_Dir_", this.ActiveFaceDir);
        this._activeEffect.setVector3("_Active_Face_Up_", this.ActiveFaceUp);

        // "Hololens Edge Fade"
        //define _Enable_Fade_ true;
        this._activeEffect.setFloat("_Fade_Width_", this.FadeWidth);
        this._activeEffect.setFloat("_Smooth_Active_Face_", this.SmoothActiveFace);

        // "Debug"
        this._activeEffect.setFloat("_Show_Frame_", this.ShowFrame ? 1.0 : 0.0);
        this._activeEffect.setFloat("_Use_Blob_Texture_", this.UseBlobTexture ? 1.0 : 0.0);

        // Global inputs
        this._activeEffect.setFloat("Use_Global_Left_Index", this.UseGlobalLeftIndex ? 1.0 : 0.0);
        this._activeEffect.setFloat("Use_Global_Right_Index", this.UseGlobalRightIndex ? 1.0 : 0.0);

        this._activeEffect.setVector4("Global_Left_Index_Tip_Position",
            new Vector4(
                this.GlobalLeftIndexTipPosition.x,
                this.GlobalLeftIndexTipPosition.y,
                this.GlobalLeftIndexTipPosition.z,
                1.0));
        this._activeEffect.setVector4("Global_Right_Index_Tip_Position",
            new Vector4(
                this.GlobalRightIndexTipPosition.x,
                this.GlobalRightIndexTipPosition.y,
                this.GlobalRightIndexTipPosition.z,
                1.0));

        this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity", this.GlobalLeftIndexTipProximity);
        this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity", this.GlobalRightIndexTipProximity);

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