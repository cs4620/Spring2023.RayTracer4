
//A simple obj string to parse
let objString = `
v 0.000000 0.000000 0.000000
v 1.000000 0.000000 0.000000
v 0.000000 1.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 0.0000 1.0000
f 1/1/1 2/2/1 3/3/1
`

//--
//Geometries
//-- 

//Sphere defition(s)
let s = new Sphere(new Vector3(0, 20, 0), 50);
let s2 = new Sphere(new Vector3(0, -60, 0), 40);

//Mesh definition(s)
let mesh = Mesh.fromOBJ(objString);

//--
//Camera defition(s)
//--
let orthographicCamera = new Camera(
  new Vector3(0,0,51), 
  Vector3.forward, 
  Vector3.up, 
  Camera.Orthographic
  )

let perspectiveCamera = new Camera(
  new Vector3(0,0,100), 
  new Vector3(0,0,-1), 
  Vector3.up, 
  Camera.Perspective,
  Math.PI/4
  )
// let camera = new Vector3(0, 0, 51)

//--
//Shader definition(s)
//-
let shader = new DiffuseShader({r:255, g:255, b:255});
let shader2 = new DiffuseShader({r:0, g:255, b:0});

//--
//RayTracedObject definition(s)
//--
let rayTracedSphere1 = new RayTracedObject(s, shader);
let rayTracedSphere2 = new RayTracedObject(s2, shader2);
let rayTracedTriangle = new RayTracedObject(mesh, shader);

//--
//Scene definition(s)
//--
let twoSphereSceneOrthographic = new Scene([rayTracedSphere1, rayTracedSphere2], orthographicCamera)
let oneSphereSceneOrthographic = new Scene([rayTracedSphere1],  orthographicCamera)
let triangleSceneOrthographic = new Scene([rayTracedTriangle], orthographicCamera);

let twoSphereScenePerspective = new Scene([rayTracedSphere1, rayTracedSphere2], perspectiveCamera, Math.PI/4)
let oneSphereScenePerspective = new Scene([rayTracedSphere1],  perspectiveCamera)
let triangleScenePerspective = new Scene([rayTracedTriangle], perspectiveCamera);

//--
//Final scene definition.
//This is the scene that gets rendered
//--
let scene = twoSphereScenePerspective;