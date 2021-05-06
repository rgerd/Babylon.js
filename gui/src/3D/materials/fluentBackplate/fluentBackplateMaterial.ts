import { Nullable } from "babylonjs/types";
import { SerializationHelper, serialize, serializeAsVector3 } from "babylonjs/Misc/decorators";
import { Matrix, Vector3, Vector4 } from "babylonjs/Maths/math.vector";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { MaterialDefines } from "babylonjs/Materials/materialDefines";
import { MaterialHelper } from "babylonjs/Materials/materialHelper";
import { IEffectCreationOptions } from "babylonjs/Materials/effect";
import { PushMaterial } from "babylonjs/Materials/pushMaterial";
import { VertexBuffer } from "babylonjs/Buffers/buffer";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { SubMesh } from "babylonjs/Meshes/subMesh";
import { Mesh } from "babylonjs/Meshes/mesh";
import { Scene } from "babylonjs/scene";
import { _TypeStore } from "babylonjs/Misc/typeStore";
import { Color4 } from "babylonjs/Maths/math.color";
import { EffectFallbacks } from "babylonjs/Materials/effectFallbacks";
import { Constants } from "babylonjs/Engines/constants";

import "./shaders/fluentBackplate.fragment";
import "./shaders/fluentBackplate.vertex";

/** @hidden */
class FluentBackplateMaterialDefines extends MaterialDefines {
    public BLOB_ENABLE = true;
    public BLOB_ENABLE_2 = true;
    public SMOOTH_EDGES = true;
    public IRIDESCENT_MAP_ENABLE = true;

    constructor() {
        super();
        this._needNormals = true;
        this.rebuild();
    }
}

/**
 * Class used to render square buttons with fluent desgin
 */
export class FluentBackplateMaterial extends PushMaterial {
    /**
     * URL pointing to the texture used to define the coloring for the fluent blob effect.
     */
    public static BLOB_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-button-blob.png";

    public static IM_TEXTURE_URL = "https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-button-blob.png";

    // TODO: Allow access through member variables
    private _blobTexture: Texture;
    private _iridescentMap: Texture;

    /**
     * Gets or sets whether the blob corresponding to the left index finger is enabled.
     */
    @serialize()
    public leftBlobEnable = true;

    /**
     * Gets or sets whether the blob corresponding to the right index finger is enabled.
     */
    @serialize()
    public rightBlobEnable = true;

    /**
     * Gets or sets the world-space position of the tip of the left index finger.
     */
    @serializeAsVector3()
    public globalLeftIndexTipPosition = Vector3.Zero();

    /**
     * Gets or sets the world-space position of the tip of the right index finger.
     */
    @serializeAsVector3()
    public globalRightIndexTipPosition = Vector3.Zero();

    constructor(name: string, scene: Scene) {
        super(name, scene);
        this.alphaMode = Constants.ALPHA_DISABLE;
        this.backFaceCulling = false;

        this._blobTexture = new Texture(FluentBackplateMaterial.BLOB_TEXTURE_URL, scene, true, false, Texture.NEAREST_SAMPLINGMODE);
        this._iridescentMap = new Texture(FluentBackplateMaterial.IM_TEXTURE_URL, scene, true, false, Texture.NEAREST_SAMPLINGMODE);
    }

    public needAlphaBlending(): boolean {
        return false;
    }

    public needAlphaTesting(): boolean {
        return false;
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
            subMesh.materialDefines = new FluentBackplateMaterialDefines();
        }

        const defines = <FluentBackplateMaterialDefines>subMesh._materialDefines;
        const scene = this.getScene();

        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }

        const engine = scene.getEngine();

        // Attribs
        MaterialHelper.PrepareDefinesForAttributes(mesh, defines, false, false);


        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();

            scene.resetCachedMaterial();

            // Fallbacks
            const fallbacks = new EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }

            MaterialHelper.HandleFallbacksForShadows(defines, fallbacks);

            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;

            //Attributes
            const attribs = [VertexBuffer.PositionKind];

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
            const shaderName = "fluentBackplate";
            const join = defines.toString();

            const uniforms = [
                "world", "worldView", "worldViewProjection", "view", "projection", "viewProjection", "cameraPosition"
                , "_Radius_", "_Line_Width_", "_Absolute_Sizes_", "_Filter_Width_", "_Base_Color_", "_Line_Color_"
                , "_Radius_Top_Left_", "_Radius_Top_Right_", "_Radius_Bottom_Left_", "_Radius_Bottom_Right_"
                , "_Blob_Position_", "_Blob_Intensity_", "_Blob_Near_Size_", "_Blob_Far_Size_", "_Blob_Near_Distance_"
                , "_Blob_Far_Distance_", "_Blob_Fade_Length_", "_Blob_Pulse_", "_Blob_Fade_", "_Blob_Texture_"
                , "_Blob_Position_2_", "_Blob_Near_Size_2_", "_Blob_Pulse_2_", "_Blob_Fade_2_", "_Rate_", "_Highlight_Color_"
                , "_Highlight_Width_", "_Highlight_Transform_", "_Highlight_", "_Iridescence_Intensity_", "_Iridescence_Edge_Intensity_"
                , "_Angle_", "_Fade_Out_", "_Reflected_", "_Frequency_", "_Vertical_Offset_", "_Iridescent_Map_"
                , "_Use_Global_Left_Index_", "_Use_Global_Right_Index_", "Global_Left_Index_Tip_Position", "Global_Right_Index_Tip_Position"
            ];
            const samplers: string[] = ["_Blob_Texture_", "_Iridescent_Map_"];
            const uniformBuffers = new Array<string>();

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
        const defines = <FluentBackplateMaterialDefines>subMesh._materialDefines;
        if (!defines) {
            return;
        }

        const effect = subMesh.effect;
        if (!effect) {
            return;
        }

        this._activeEffect = effect;

        // Matrices
        this.bindOnlyWorldMatrix(world);
        this._activeEffect.setMatrix("viewProjection", this.getScene().getTransformMatrix());
        this._activeEffect.setVector3("cameraPosition", this.getScene().activeCamera!.position);

        // "Round Rect"
        this._activeEffect.setFloat("_Radius_", 0.03);
        this._activeEffect.setFloat("_Line_Width_", 0.01);
        this._activeEffect.setFloat("_Absolute_Sizes_", false ? 1.0 : 0.0);
        this._activeEffect.setFloat("_Filter_Width_", 1);
        this._activeEffect.setDirectColor4("_Base_Color_", new Color4(0.0392157, 0.0666667, 0.207843, 1));
        this._activeEffect.setDirectColor4("_Line_Color_", new Color4(0.14902, 0.133333, 0.384314, 1));

        // "Radii Multipliers"
        this._activeEffect.setFloat("_Radius_Top_Left_", 1);
        this._activeEffect.setFloat("_Radius_Top_Right_", 1.0);
        this._activeEffect.setFloat("_Radius_Bottom_Left_", 1.0);
        this._activeEffect.setFloat("_Radius_Bottom_Right_", 1.0);

        // "Blob"
        //define BLOB_ENABLE true;
        this._activeEffect.setVector3("_Blob_Position_", new Vector3(0, 0, 0.1));
        this._activeEffect.setFloat("_Blob_Intensity_", 0.98);
        this._activeEffect.setFloat("_Blob_Near_Size_", 0.22);
        this._activeEffect.setFloat("_Blob_Far_Size_", 0.04);
        this._activeEffect.setFloat("_Blob_Near_Distance_", 0);
        this._activeEffect.setFloat("_Blob_Far_Distance_", 0.08);
        this._activeEffect.setFloat("_Blob_Fade_Length_", 0.08);
        this._activeEffect.setFloat("_Blob_Pulse_", 0);
        this._activeEffect.setFloat("_Blob_Fade_", 1);

        // "Blob Texture"
        this._activeEffect.setTexture("_Blob_Texture_", this._blobTexture);

        // "Blob 2"
        //define BLOB_ENABLE_2 true;
        this._activeEffect.setVector3("_Blob_Position_2_", new Vector3(0.2, 0, 0.1));
        this._activeEffect.setFloat("_Blob_Near_Size_2_", 0.26);
        this._activeEffect.setFloat("_Blob_Pulse_2_", 0);
        this._activeEffect.setFloat("_Blob_Fade_2_", 1);

        // "Line Highlight"
        this._activeEffect.setFloat("_Rate_", 0.135);
        this._activeEffect.setDirectColor4("_Highlight_Color_", new Color4(0.98, 0.98, 0.98, 1));
        this._activeEffect.setFloat("_Highlight_Width_", 0.25);
        this._activeEffect.setVector4("_Highlight_Transform_", new Vector4(1, 1, 0, 0));
        this._activeEffect.setFloat("_Highlight_", 1);

        // "Iridescence"
        this._activeEffect.setFloat("_Iridescence_Intensity_", 0);
        this._activeEffect.setFloat("_Iridescence_Edge_Intensity_", 1);
        this._activeEffect.setFloat("_Angle_", -45);

        // "Fade"
        this._activeEffect.setFloat("_Fade_Out_", 1);

        // "Antialiasing"
        //define SMOOTH_EDGES true;

        // "ChooseAngle"
        this._activeEffect.setFloat("_Reflected_", true ? 1.0 : 0.0);

        // "Multiply"
        this._activeEffect.setFloat("_Frequency_", 1);
        this._activeEffect.setFloat("_Vertical_Offset_", 0);

        // "Color Texture"
        //define IRIDESCENT_MAP_ENABLE true;
        this._activeEffect.setTexture("_Iridescent_Map_", this._iridescentMap);

        // "Global"
        this._activeEffect.setFloat("_Use_Global_Left_Index_", true ? 1.0 : 0.0);
        this._activeEffect.setFloat("_Use_Global_Right_Index_", true ? 1.0 : 0.0);

        this._afterBind(mesh, this._activeEffect);
    }

    /**
     * Get the list of animatables in the material.
     * @returns the list of animatables object used in the material
     */
    public getAnimatables(): IAnimatable[] {
        return [];
    }

    public dispose(forceDisposeEffect?: boolean): void {
        super.dispose(forceDisposeEffect);
    }

    public clone(name: string): FluentBackplateMaterial {
        return SerializationHelper.Clone(() => new FluentBackplateMaterial(name, this.getScene()), this);
    }

    public serialize(): any {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.FluentBackplateMaterial";
        return serializationObject;
    }

    public getClassName(): string {
        return "FluentBackplateMaterial";
    }

    // Statics
    public static Parse(source: any, scene: Scene, rootUrl: string): FluentBackplateMaterial {
        return SerializationHelper.Parse(() => new FluentBackplateMaterial(source.name, scene), source, scene, rootUrl);
    }
}

_TypeStore.RegisteredTypes["BABYLON.GUI.FluentBackplateMaterial"] = FluentBackplateMaterial;
