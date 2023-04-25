

let obj = `
v 0.000000 0.000000 0.000000
v 1.000000 0.000000 0.000000
v 0.000000 1.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 0.0000 1.0000
f 1/1/1 2/2/1 3/3/1
`

let lines = obj.split('\n');

let vs = []
let vts = []
let vns = []
let fs = []

for (let line of lines) {
  let trimmedLine = line.trim()
  if (trimmedLine.length == 0) continue;
  let parts = line.split(" ")
  let lineHeader = parts[0].trim();
  if (lineHeader == 'v') {
    //push onto v
    let v = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
    // let v = { x: parseFloat(parts[1]), y: parseFloat(parts[2]), z: parseFloat(parts[3]) }
    vs.push(v)
  }
  if (lineHeader == 'vt') {
    //push onto t
    let vt = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]));
    // let vt = { u: parseFloat(parts[1]), v: parseFloat(parts[2]) }
    vts.push(vt)
  }
  if (lineHeader == 'vn') {
    //push onto n
    // let vn = { x: parseFloat(parts[1]), y: parseFloat(parts[2]), z: parseFloat(parts[3]) }
    let vn = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]) );
    vns.push(vn);
  }
  if (lineHeader == 'f') {
    //push onto f
    let face = {
      points: []
    }
    for (let i = 1; i <= 3; i++) {
      let first = parts[i]
      let coords = first.split('/')
      let vIndex = parseInt(coords[0].trim()) - 1;
      let vtIndex = parseInt(coords[1].trim()) - 1;
      let vnIndex = parseInt(coords[2].trim()) - 1;

      let temp = new Vertex(vs[vIndex],vts[vtIndex],vns[vnIndex] )

      face.points.push(temp)
    }
    fs.push(face)
  }

}
let triangle = new Triangle(fs[0].points[0], fs[0].points[1], fs[0].points[2])

let s = new Sphere(new Vector3(20, 20, 0), 50);
let s2 = new Sphere(new Vector3(-20, -20, 0), 40);

let mesh = new Mesh([triangle]);

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