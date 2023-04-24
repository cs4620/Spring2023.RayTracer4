let obj = `
v -1.000000 0.000000 1.000000
v 1.000000 0.000000 1.000000
v -1.000000 0.000000 -1.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 2/1/1 3/2/1 1/3/1
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
    let v = { x: parseFloat(parts[1]), y: parseFloat(parts[2]), z: parseFloat(parts[3]) }
    vs.push(v)
  }
  if (lineHeader == 'vt') {
    //push onto t
    let vt = { u: parseFloat(parts[1]), v: parseFloat(parts[2]) }
    vts.push(vt)
  }
  if (lineHeader == 'vn') {
    //push onto n
    let vn = { x: parseFloat(parts[1]), y: parseFloat(parts[2]), z: parseFloat(parts[3]) }
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

      let temp = {
        v: vs[vIndex],
        vt: vts[vtIndex],
        vn: vns[vnIndex]
      }

      face.points.push(temp)
    }
    fs.push(face)
  }

}



/**
 * Run our ray tracer
 * @param {Number} width The width of the rendederd image
 * @param {Number} height The height of the rendered image
 */
function main(scene) {
  let width = scene.width;
  let height = scene.height;
  let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let spheres = scene.spheres




  //Ray Tracer starts

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x == 50 && y == 50) {
        console.log("stop")
      }

      let rayTracedPixel = new Pixel(255, 0, 0);
      let closestPositiveT = 10000000

      for (let rayTracedObject of spheres) {
        let s = rayTracedObject.geometry

        let startX = x - width / 2;
        let startY = y - height / 2;
        let origin = new Vector3(startX, startY, scene.camera.z);
        let direction = new Vector3(0, 0, -1);
        let collision = s.intersect(origin, direction);


        if (collision && collision.t < closestPositiveT) {
          closestPositiveT = collision.t
          let c = collision.v
          let normal = (c.minus(s.center)).normalize()
          let dot = normal.dot(new Vector3(1, -1, 1).normalize());
          if (dot <= 0)
            dot = 0
          rayTracedPixel =  rayTracedObject.shader.illuminateObject(origin, c, normal, [])
        }

        image.setPixel(x, y, rayTracedPixel);

        let pixel = image.getPixel(x, y);
        let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
        ctx.fillStyle = pixelString;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}


//Run the main ray tracer

main(scene);
