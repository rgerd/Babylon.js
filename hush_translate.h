HUSH_BUILD_EXTENSION .glsl
HUSH_COMPUTE_EXTENSION .glsl
HUSH_FUNC_PARM_SEP_CHAR ,

HUSH_PLATFORM_IS_HYDROGEN false
HUSH_PLATFORM_IS_UNITY false

HUSH_UI_FLOAT(name,label,value) this._activeEffect.setFloat("name", value);
HUSH_UI_COLOR(name,label,Red,Gre,Blu,Alph) this._activeEffect.setDirectColor4("name", new Color4(Red, Gre, Blu, Alph));

HUSH_UI_VECTOR2(name,label,X,y) this._activeEffect.setVector2("name", new Vector2(X, y));
HUSH_UI_VECTOR3(name,label,X,y,Z) this._activeEffect.setVector3("name", new Vector3(X, y, Z));
HUSH_UI_VECTOR4(name,label,X,y,Z,W) this._activeEffect.setVector4("name", new Vector4(X, y, Z, W));

HUSH_UI_BOOL(name,label,default) this._activeEffect.setFloat("name", default ? 1.0 : 0.0);
HUSH_UI_PERM(name,label,default) //define HCAPV(name) default;
HUSH_UI_SLIDER(name,label,default,min,max,steps) this._activeEffect.setFloat("name", default);
HUSH_UI_INT(name,label,default) this._activeEffect.setInt("name", default);
HUSH_UI_TEXTURE(name,label) this._activeEffect.setTexture("name", new Texture("", this.getScene()));
HUSH_UI_ENVIRONMENT(name,label) this._activeEffect.setTexture("name", new Texture("", this.getScene()));

HUSH_UI_GROUP_BEGIN(label) // "label"
HUSH_UI_GROUP_END 

HUSH_UI_PERM_TRUE true
HUSH_UI_PERM_FALSE false

HUSH_PERM_DECLARE(name,label,default) //define name;

HUSH_PERM_IF(test) #if HCAPV(test)
HUSH_PERM_ELSE #else
HUSH_PERM_END #endif

HUSH_VAR_SLIDER(name) uniform float name;
HUSH_VAR_FLOAT(name) uniform float name;
HUSH_VAR_COLOR(name) uniform vec4 name;
HUSH_VAR_COLOR16(name) uniform vec4 name;
HUSH_VAR_VECTOR2(name) uniform vec2 name;
HUSH_VAR_VECTOR3(name) uniform vec3 name;
HUSH_VAR_VECTOR4(name) uniform vec4 name;
HUSH_VAR_PERM(name) //define HCAPV(name)
HUSH_VAR_BOOL(name) uniform bool name;
HUSH_VAR_INT(name) uniform int name;
HUSH_VAR_TEXTURE(name) uniform sampler2D name;
HUSH_VAR_ENVIRONMENT(name) uniform sampler2D name;
HUSH_VAR_ENUM(name) uniform float name;
HUSH_VAR_HALF(name) uniform float name;
HUSH_VAR_HALF2(name) uniform vec2 name;
HUSH_VAR_HALF3(name) uniform vec3 name;
HUSH_VAR_HALF4(name) uniform vec4 name;

hux_bool bool
hux_float float
hux_color vec4
hux_color16 vec4
hux_vec2 vec2
hux_vec3 vec3
hux_vec4 vec4
hux_texture sampler2D
hux_environment sampler2D
hux_enumeration float
hux_half float
hux_half2 vec2
hux_half3 vec3
hux_half4 vec4
hux_int int

hux_mat2 mat2x2
hux_mat3 mat3x3
hux_mat4 mat4x4

hux_mk_color(A,B,C,D) vec4(A,B,C,D)
hux_mk_color16(A,B,C,D) vec4(A,B,C,D)
hux_mk_vec2(A,B) vec2(A,B)
hux_mk_vec3(A,B,C) vec3(A,B,C)
hux_mk_vec4(A,B,C,D) vec4(A,B,C,D)
hux_mk_half2(A,B) vec2(A,B)
hux_mk_half3(A,B,C) vec3(A,B,C)
hux_mk_half4(A,B,C,D) vec4(A,B,C,D)

HUX_FUNC_OUT out

HUX_GLOBAL_UV huxUV
HUX_GLOBAL_TIME (huxTime*20.0)
HUX_GLOBAL_GAZE_DIR gazeDir
HUX_GLOBAL_GAZE_POS worldCameraPos

HUX_GLOBAL_COLOR huxColor

HUX_GLOBAL_P_CURRENT huxPosition
HUX_GLOBAL_N_CURRENT huxNormal
HUX_GLOBAL_I_CURRENT huxI
HUX_GLOBAL_E_CURRENT huxEye
HUX_GLOBAL_T_CURRENT huxTangent
HUX_GLOBAL_B_CURRENT huxBinormal
HUX_GLOBAL_G_CURRENT huxGazeDir

HUX_GLOBAL_P_WORLD huxPosition
HUX_GLOBAL_N_WORLD huxNormal
HUX_GLOBAL_I_WORLD huxI
HUX_GLOBAL_E_WORLD huxEye
HUX_GLOBAL_T_WORLD huxTangent
HUX_GLOBAL_B_WORLD huxBinormal
HUX_GLOBAL_G_WORLD huxGazeDir

hux_texCUBE(name,dir) texture(name, dir)
hux_tex2D(A,B) texture(A, B)
hux_mix_colors(A,B,C) mix(A,B,C)
hux_dot3(A,B) dot(A, B)
hux_cross3(A,B) cross(A, B)
hux_normalize3(A) normalize(A)
hux_fract(A) fract(A)
hux_mod(A,B) mod(A, B)
hux_saturate(A) clamp(A, 0.0, 1.0)
hux_mix mix
hux_filter_width(A) fwidth(A)
hux_dx dFdx
hux_dy dFdy
hux_atanyx(Y,X) atan(Y,X)

hux_float_to_color(f) vec4(f,f,f,f)
hux_float_to_color16(f) vec4(f,f,f,f)

hux_mul_mat(A,B)  (A*B)

hux_xcomp(A) A.x
hux_ycomp(A) A.y
hux_zcomp(A) A.z
hux_wcomp(A) A.w

hux_rcomp(C) C.r
hux_gcomp(C) C.g
hux_bcomp(C) C.b
hux_acomp(C) C.a

HUX_WORLD_TO_OBJECT_POS(P) ((w2o_matrix4)* vec4(P,1.0)).xyz
HUX_WORLD_TO_OBJECT_DIR(P) ((w2o_matrix4)* vec4(P,0.0)).xyz
HUX_WORLD_TO_OBJECT_NORMAL(D) (transpose(o2w_matrix4)* vec4(D,0.0)).xyz

HUX_OBJECT_TO_WORLD_POS(P) (world * vec4(P,1.0)).xyz
HUX_OBJECT_TO_WORLD_DIR(P) (world * vec4(P,0.0)).xyz
HUX_OBJECT_TO_WORLD_NORMAL(D) (transpose(w2o_matrix4)* vec4(D,0.0)).xyz

HUX_FROM_NORMAL_SPACE(T,B,N,V) (V.x*T + V.y*B + V.z*N)

HUX_SAMPLE_TEX2D_COLOR(Name,UV) texture(Name,UV)
HUX_SAMPLE_TEX2D_COLOR_BIAS(Name,UV,Bias) texture(Name,UV,Bias)
HUX_SAMPLE_TEX2D_FLOAT(Name,UV) texture(Name, UV).r
HUX_SAMPLE_ENV_COLOR(Name,Dir) texture(Name, vec2(atan(Dir.z,Dir.x)/3.14159*0.5, asin(Dir.y)/3.14159+0.5))
HUX_SAMPLE_ENV_COLOR_BIAS(Name,Dir,Bias) texture(Name, vec2(atan(Dir.z,Dir.x)/3.14159*0.5, asin(Dir.y)/3.14159+0.5),Bias)
//HUX_POINT_SAMPLE_TEX2D_COLOR(Name,UV) texture(Name, UV)
HUX_POINT_SAMPLE_TEX2D_COLOR(Name,UV) textureGrad(Name,UV,vec2(0,0),vec2(0,0))
HUX_POINT_SAMPLE_TEX2D_FLOAT(Name,UV) (textureGrad(Name, UV, vec2(0, 0), vec2(0, 0))).x

HUX_SAMPLE_TEX2D_COLOR_VDOWN(Name,UV) texture(Name,vec2(UV.x,1.0-UV.y))
HUX_GLOBAL_INPUT(Test,A,B)  (Test ? A : B)

HUX_GEO_V0_POSITION_WORLD GeometryInput[0].v_position
HUX_GEO_V1_POSITION_WORLD GeometryInput[1].v_position
HUX_GEO_V2_POSITION_WORLD GeometryInput[2].v_position
HUX_GEO_V3_POSITION_WORLD GeometryInput[3].v_position
HUX_GEO_V4_POSITION_WORLD GeometryInput[4].v_position
HUX_GEO_V5_POSITION_WORLD GeometryInput[5].v_position

HUX_GEO_V0_POSITION_MODEL GeometryInput[0].v_position
HUX_GEO_V1_POSITION_MODEL GeometryInput[1].v_position
HUX_GEO_V2_POSITION_MODEL GeometryInput[2].v_position

HUX_GEO_V0_NORMAL_WORLD GeometryInput[0].v_normal
HUX_GEO_V1_NORMAL_WORLD GeometryInput[1].v_normal
HUX_GEO_V2_NORMAL_WORLD GeometryInput[2].v_normal
HUX_GEO_V3_NORMAL_WORLD GeometryInput[3].v_normal
HUX_GEO_V4_NORMAL_WORLD GeometryInput[4].v_normal
HUX_GEO_V5_NORMAL_WORLD GeometryInput[5].v_normal

HUX_GEO_V0_TANGENT_WORLD GeometryInput[0].v_tangent
HUX_GEO_V1_TANGENT_WORLD GeometryInput[1].v_tangent
HUX_GEO_V2_TANGENT_WORLD GeometryInput[2].v_tangent
HUX_GEO_V3_TANGENT_WORLD GeometryInput[3].v_tangent
HUX_GEO_V4_TANGENT_WORLD GeometryInput[4].v_tangent
HUX_GEO_V5_TANGENT_WORLD GeometryInput[5].v_tangent

HUX_GEO_V0_UV GeometryInput[0].v_texcoord
HUX_GEO_V1_UV GeometryInput[1].v_texcoord
HUX_GEO_V2_UV GeometryInput[2].v_texcoord
HUX_GEO_V3_UV GeometryInput[3].v_texcoord
HUX_GEO_V4_UV GeometryInput[4].v_texcoord
HUX_GEO_V5_UV GeometryInput[5].v_texcoord

HUX_GEO_V0_COLOR GeometryInput[0].v_color
HUX_GEO_V1_COLOR GeometryInput[1].v_color
HUX_GEO_V2_COLOR GeometryInput[2].v_color
HUX_GEO_V3_COLOR GeometryInput[3].v_color
HUX_GEO_V4_COLOR GeometryInput[4].v_color
HUX_GEO_V5_COLOR GeometryInput[5].v_color

HUX_GEO_V0_EXTRA1 GeometryInput[0].v_extra1
HUX_GEO_V1_EXTRA1 GeometryInput[1].v_extra1
HUX_GEO_V2_EXTRA1 GeometryInput[2].v_extra1
HUX_GEO_V3_EXTRA1 GeometryInput[3].v_extra1
HUX_GEO_V4_EXTRA1 GeometryInput[4].v_extra1
HUX_GEO_V5_EXTRA1 GeometryInput[5].v_extra1

HUX_GEO_V0_EXTRA2 GeometryInput[0].v_extra2
HUX_GEO_V1_EXTRA2 GeometryInput[1].v_extra2
HUX_GEO_V2_EXTRA2 GeometryInput[2].v_extra2
HUX_GEO_V3_EXTRA2 GeometryInput[3].v_extra2
HUX_GEO_V4_EXTRA2 GeometryInput[4].v_extra2
HUX_GEO_V5_EXTRA2 GeometryInput[5].v_extra2

HUX_GEO_E_WORLD worldCameraPos

HUX_GEO_SET_POSITION(A) FragmentInput.v_position = A; gl_Position = vp_matrix * vec4(A,1)
HUX_GEO_SET_NORMAL(A) FragmentInput.v_normal = A
HUX_GEO_SET_TANGENT(A) FragmentInput.v_tangent = A
HUX_GEO_SET_UV(A) FragmentInput.v_texcoord = A
HUX_GEO_SET_COLOR(A) FragmentInput.v_color = A
HUX_GEO_SET_EXTRA1(A) FragmentInput.v_extra1 = A
HUX_GEO_SET_EXTRA2(A) FragmentInput.v_extra2 = A
HUX_GEO_SET_EXTRA3(A) FragmentInput.v_extra3 = A

HUX_GEO_EMIT_VERTEX EmitVertex();
HUX_GEO_END_STRIP EndPrimitive();

HUX_GEO_OUTPUT_TYPE float
HUX_GEO_OUTPUT_OBJECT 0.0

HUX_FRAG_P_WORLD vPosition
HUX_FRAG_N_WORLD vNormal
HUX_FRAG_UV vUV
HUX_FRAG_T_WORLD vTangent
HUX_FRAG_B_WORLD vBinormal
HUX_FRAG_COLOR vColor
HUX_FRAG_E_WORLD cameraPosition
HUX_FRAG_EXTRA1 vExtra1
HUX_FRAG_EXTRA2 vExtra2
HUX_FRAG_EXTRA3 vExtra3
HUX_FRAG_EYE_INDEX 0

HUX_GLOBAL_EXTRA1 FragmentInput.v_extra1
HUX_GLOBAL_EXTRA2 FragmentInput.v_extra2

HUX_VERT_POSITION position
HUX_VERT_NORMAL normal
HUX_VERT_UV uv
HUX_VERT_UV1 uv2
HUX_VERT_UV2 uv3
HUX_VERT_TANGENT tangent
HUX_VERT_BINORMAL (cross(normal,tangent))
HUX_VERT_COLOR color
HUX_VERT_EYE_WORLD cameraPosition
HUX_VERT_SINGLE_EYE_WORLD cameraPosition

HUX_PBR_P_WORLD FragmentInput.v_position
HUX_PBR_UV FragmentInput.v_texcoord
HUX_PBR_COLOR FragmentInput.v_color

HUX_PBR_OVERRIDE_P FragmentInput.v_position
HUX_PBR_OVERRIDE_NORMAL FragmentInput.v_normal
HUX_PBR_OVERRIDE_UV FragmentInput.v_texcoord
HUX_PBR_OVERRIDE_COLOR FragmentInput.v_color

HUX_STRUCTURED_BUFFER_RW(type,name) //RWStructuredBuffer<type> name

HUX_COMPUTE_THREAD_X float(gl_GlobalInvocationID.x)
HUX_COMPUTE_THREAD_Y float(gl_GlobalInvocationID.y)
HUX_COMPUTE_THREAD_Z float(gl_GlobalInvocationID.z)
