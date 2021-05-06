## Notes
* This is an explanation of the [diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#) that illustrates the work involved in getting a file exported from Hushed into a working state on Babylon.JS/BabylonNative
* The shader being ported in this case is `hushed\shaders\Bondi_Materials\Current\Rounded_Thick_Iridescent_Map.hush`
* There are a couple changes I had to make due to BabylonNative bugs (namely inlining a function and replacing a ternary) that have issues assigned to them and are not things that need to be changed on the Hushed side.

[Updated material template](https://github.com/rgerd/Babylon.js/blob/fluent-backplate-mat-diff/Push_Material_Template.hushTemplate)
[Updated hush_translate.h](https://github.com/rgerd/Babylon.js/blob/fluent-backplate-mat-diff/hush_translate.h)

## Needs
* Materials in BabylonJS use a material definitions block, so we need a macro for exporting those definitions in javascript as member variables. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-8ae9bbdff5fa682652abe828f8f911ed5202defd9a0e19b50ff7ac6453274af2L2)
* Need to include shared uniforms in the `HUSH_INSERT_UNIFORMS` macro. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-8ae9bbdff5fa682652abe828f8f911ed5202defd9a0e19b50ff7ac6453274af2R177) 
* Need a macro like `HUSH_INSERT_SAMPLERS` to insert the texture sampler uniforms. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-8ae9bbdff5fa682652abe828f8f911ed5202defd9a0e19b50ff7ac6453274af2L116)
* GLSL doesn't automatically cast ints to floats, so we'll need to change the functional blocks to use floats instead of ints where appropriate. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-8fcad12adf0acd9563fcf8d9a87390bbd1adb5256c112b1691ea25d2cf246aecL195)
* The world matrix that we get from Hushed seems to be `w2o_matrix4`, and in Babylon we need it to be `world`. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-ad867e6a25bfde0838489701884c8be40ef1c1420e316a3666d08c51f5fba7d5L248)
* There is an undeclared variable `huxTime` in the shader. [Diff](https://github.com/rgerd/Babylon.js/commit/f50ecbe1eb7780874bbccbb8cbe5521dd2c32537#diff-ad867e6a25bfde0838489701884c8be40ef1c1420e316a3666d08c51f5fba7d5L366)

## Wants
* A `HUSH_INSERT_XXXX` macro that can export the uniforms as camelCase with the default values so that we can have the uniforms as member variables in the material file out-of-the-box. [Example](https://github.com/BabylonJS/Babylon.js/blob/ba125da6e26fda01276f41e75e4b8c0883e5e57a/gui/src/3D/materials/fluentButton/fluentButtonMaterial.ts#L46-L266)
  * And then we can make the `HUSH_INSERT_PARM_UI` do something like `this._activeEffect.setFloat("_Line_Width_", this.lineWidth);`
  * Preferably this would be a multiline macro per-member so that we can also have the `@serialization` decorators as you see in the example.

## Nice to haves
* Separate hushTemplates for each file being exported. Right now we only have one hushTemplate that exports the vertex shader, fragment shader, and material, but it would be nice to have separate templates corresponding to each.
* A macro with the material name, so that instead of the template generating a material called `HushedMaterial` we could have `HUSH_SHADER_NAMEMaterial`, avoiding the need to do a ctrl+F and replace.

## Screenshot

It works!

<img width="1057" alt="backplate" src="https://user-images.githubusercontent.com/4724014/117366652-f503b680-ae75-11eb-9510-ddcfa092977d.png">
