import { Scene } from "babylonjs/scene";
import { Mesh } from "babylonjs/Meshes/mesh";
import { VertexData } from "babylonjs/Meshes/mesh.vertexData";
import { Nullable } from "babylonjs/types";

function CreateFluentButtonVertexData(): VertexData {
    const vertexPositions = [0.5, 0.5, -0.5, 0.5, 0.25, -0.25, 0.5, 0.25, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.5, -0.25, 0.25, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.25, 0.25, 0.5, -0.25, -0.25, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.25, -0.25, 0.5, 0.25, -0.25, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.25, 0.25, -0.5, -0.25, -0.25, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.25, -0.25, -0.5, 0.25, -0.25, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.25, -0.25, -0.5, 0.25, 0.25, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.25, 0.25, -0.5, -0.25, 0.25, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.25, -0.25, -0.5, 0.25, -0.25, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.25, -0.25, -0.5, 0.25, 0.25, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.25, 0.25, -0.5, -0.25, 0.25, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.25, 0.25, -0.5, -0.25, -0.25, -0.5, -0.5, -0.5, -0.5, -0.25, 0.25, -0.5, 0.25, 0.25, -0.5, 0.25, -0.25, -0.5, -0.25, -0.25, -0.5, -0.25, 0.25, -0.5, 0.25, 0.25, -0.5, 0.25, -0.25, -0.5, -0.25, -0.25, -0.5, -0.5, -0.5, 0.5, -0.25, -0.5, 0.25, 0.25, -0.5, 0.25, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.25, -0.5, 0.25, 0.25, -0.5, -0.25, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.25, -0.5, -0.25, -0.25, -0.5, -0.25, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.25, -0.5, -0.25, -0.25, -0.5, 0.25, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.25, 0.5, -0.25, 0.25, 0.5, -0.25, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.25, 0.5, -0.25, 0.25, 0.5, 0.25, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.5, 0.25, -0.25, 0.5, 0.25, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.25, 0.5, 0.25, -0.25, 0.5, -0.25, -0.5, 0.5, -0.5];

    const vertexIndices = [0, 3, 2, 1, 0, 2, 4, 7, 6, 5, 4, 6, 8, 11, 10, 9, 8, 10, 12, 15, 14, 13, 12, 14, 16, 19, 18, 17, 16, 18, 20, 23, 22, 21, 20, 22, 24, 27, 26, 25, 24, 26, 28, 31, 30, 29, 28, 30, 32, 35, 34, 33, 32, 34, 36, 39, 38, 37, 36, 38, 40, 43, 42, 41, 40, 42, 44, 47, 46, 45, 44, 46, 48, 51, 50, 49, 48, 50, 52, 55, 54, 53, 52, 54, 56, 59, 58, 57, 56, 58, 60, 63, 62, 61, 60, 62, 64, 67, 66, 65, 64, 66, 68, 71, 70, 69, 68, 70, 72, 75, 74, 73, 72, 74, 76, 79, 78, 77, 76, 78, 80, 83, 82, 81, 80, 82, 84, 87, 86, 85, 84, 86];

    const vertexNormals = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, 0, -1, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, -1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0, -0, 1, 0];

    const vertexColors = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1];

    const vertexUVs = [0, 1, 0.25, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.25, 1, 0, 1, 0, 0.75, 0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0, 1, 0, 1, 0.25, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.25, 1, 0, 1, 0, 0.75, 0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0, 1, 0, 1, 0.25, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.25, 1, 0, 1, 0, 0.75, 0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0, 1, 0.25, 0.25, 0.75, 0.25, 0.75, 0.75, 0.25, 0.75, 0.25, 0.25, 0.75, 0.25, 0.75, 0.75, 0.25, 0.75, 0, 1, 0.25, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.25, 1, 0, 1, 0, 0.75, 0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0, 1, 0, 1, 0.25, 0.75, 0.75, 0.75, 1, 1, 1, 1, 0.75, 0.75, 0.75, 0.25, 1, 0, 1, 0, 0.75, 0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0.25, 0.25, 0.75, 0, 1];

    const vertexTangents = [0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0,
        1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0
    ];

    const vertexData = new VertexData();
    vertexData.positions = vertexPositions;
    vertexData.colors = vertexColors;
    vertexData.normals = vertexNormals;
    vertexData.uvs = vertexUVs;
    vertexData.tangents = vertexTangents;
    vertexData.indices = vertexIndices;

    return vertexData;
}

export class FluentButtonBuilder {
    public static CreateFluentButton(name: string, options: { width?: number, height?: number, depth?: number }, scene: Nullable<Scene> = null) {
        var fluentBox = new Mesh(name, scene);
        var vertexData = CreateFluentButtonVertexData();
        vertexData.applyToMesh(fluentBox, false);
        fluentBox.scaling.x = (options.width ?? 0.032);
        fluentBox.scaling.y = (options.height ?? 0.032);
        fluentBox.scaling.z = (options.depth ?? 0.016);
        return fluentBox;
    }
}