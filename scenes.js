let s = new Sphere(new Vector3(20, 20, 0), 50);
let s2 = new Sphere(new Vector3(-20, -20, 0), 40);

let camera = new Vector3(0, 0, 51)

let shader = new DiffuseShader({r:255, g:255, b:255});

let rayTracedSphere1 = new RayTracedObject(s, shader);
let rayTracedSphere2 = new RayTracedObject(s2, shader);

let twoSphereScene = new Scene([rayTracedSphere1, rayTracedSphere2], [], camera)

let oneSphereScene = new Scene([rayTracedSphere1], [], camera)

let scene = twoSphereScene;