

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

let s = new Sphere(new Vector3(20, 20, 0), 50);
let s2 = new Sphere(new Vector3(-20, -20, 0), 40);

let mesh = Mesh.fromOBJ(objString);

let camera = new Vector3(0, 0, 51)

let shader = new DiffuseShader({r:255, g:255, b:255});
let shader2 = new DiffuseShader({r:255, g:0, b:0});

let rayTracedSphere1 = new RayTracedObject(s, shader);
let rayTracedSphere2 = new RayTracedObject(s2, shader2);
let rayTracedTriangle = new RayTracedObject(mesh, shader);

let twoSphereScene = new Scene([rayTracedSphere1, rayTracedSphere2], camera)

let oneSphereScene = new Scene([rayTracedSphere1],  camera)

let triangleScene = new Scene([rayTracedTriangle], camera);

let scene = triangleScene;