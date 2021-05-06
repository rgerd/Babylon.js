import { Nullable } from "babylonjs/types";
import { Observer } from "babylonjs/Misc/observable";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Mesh } from "babylonjs/Meshes/mesh";
import { BoxBuilder } from "babylonjs/Meshes/Builders/boxBuilder";
import { Scene } from "babylonjs/scene";
import { FluentBackplateMaterial } from "../materials/fluentBackplate/fluentBackplateMaterial";
import { Control3D } from "./control3D";
import { SceneLoader } from "babylonjs/Loading/sceneLoader";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";

/**
 * Class used to create a holographic button in 3D
 */
export class HolographicBackplate extends Control3D {
    /**
     * Base Url for the button model.
     */
    public static MODEL_BASE_URL: string = 'https://raw.githubusercontent.com/rgerd/TestAssets/master/GLB/';
    /**
     * File name for the button model.
     */
    public static MODEL_FILENAME: string = 'thick_8x4.glb';

    private _model: AbstractMesh;
    private _material: FluentBackplateMaterial;
    private _shareMaterials = true;
    private _pickedPointObserver: Nullable<Observer<Nullable<Vector3>>>;
    private _pointerHoverObserver: Nullable<Observer<Vector3>>;

    /**
     * Rendering ground id of all the mesh in the button
     */
    public set renderingGroupId(id: number) {
        this._model.renderingGroupId = id;
    }
    public get renderingGroupId(): number {
        return this._model.renderingGroupId;
    }

    /**
     * Gets the plate material used by this button
     */
    public get material(): FluentBackplateMaterial {
        return this._material;
    }

    /**
     * Gets a boolean indicating if this button shares its material with other HolographicButtons
     */
    public get shareMaterials(): boolean {
        return this._shareMaterials;
    }

    /**
     * Creates a new button
     * @param name defines the control name
     */
    constructor(name?: string, shareMaterials = true) {
        super(name);

        this._shareMaterials = shareMaterials;

        this.pointerEnterAnimation = () => {
            this._material.leftBlobEnable = true;
            this._material.rightBlobEnable = true;
        };

        this.pointerOutAnimation = () => {
            this._material.leftBlobEnable = false;
            this._material.rightBlobEnable = false;
        };

        this._pointerHoverObserver = this.onPointerMoveObservable.add((hoverPosition: Vector3) => {
            this._material.globalLeftIndexTipPosition = hoverPosition;
        });
    }

    protected _getTypeName(): string {
        return "HolographicBackplate";
    }

    private _rebuildContent(): void {

    }

    // Mesh association
    protected _createNode(scene: Scene): TransformNode {
        const collisionMesh = BoxBuilder.CreateBox((this.name ?? "HolographicBackplate") + "_CollisionMesh", {
            width: 1.0,
            height: 1.0,
            depth: 1.0,
        }, scene);
        collisionMesh.isPickable = true;
        collisionMesh.visibility = 0;

        SceneLoader.ImportMeshAsync(
            undefined,
            HolographicBackplate.MODEL_BASE_URL,
            HolographicBackplate.MODEL_FILENAME,
            scene)
            .then((result) => {
                var importedModel = result.meshes[1];
                importedModel.name = `${this.name}_frontPlate`;
                importedModel.isPickable = false;
                importedModel.parent = collisionMesh;
                if (!!this._material) {
                    importedModel.material = this._material;
                }
                this._model = importedModel;
            });

        /*
        const backPlateDepth = 0.04;
        this._backPlate = BoxBuilder.CreateBox(this.name + "BackMesh", {
            width: 1.0,
            height: 1.0,
            depth: backPlateDepth
        }, scene);

        this._backPlate.parent = collisionMesh;
        this._backPlate.position.z = 0.5 - backPlateDepth / 2;
        this._backPlate.isPickable = false;
        */

        return collisionMesh;
    }

    private _createMaterial(mesh: Mesh) {
        this._material = new FluentBackplateMaterial(this.name + " Material", mesh.getScene());
    }

    protected _affectMaterial(mesh: Mesh) {
        // Back
        if (this._shareMaterials) {
            if (!this._host._touchSharedMaterials["fluentBackplateMaterial"]) {
                this._createMaterial(mesh);
                this._host._touchSharedMaterials["fluentBackplateMaterial"] = this._material;
            } else {
                this._material = this._host._touchSharedMaterials["fluentBackplateMaterial"] as FluentBackplateMaterial;
            }
        } else {
            this._createMaterial(mesh);
        }

        this._rebuildContent();
    }

    /**
     * Releases all associated resources
     */
    public dispose() {
        super.dispose(); // will dispose main mesh ie. back plate

        this.onPointerMoveObservable.remove(this._pointerHoverObserver);

        if (!this.shareMaterials) {
            this._material.dispose();

            if (this._pickedPointObserver) {
                this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
                this._pickedPointObserver = null;
            }
        }
    }
}