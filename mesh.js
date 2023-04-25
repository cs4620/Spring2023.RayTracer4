class Mesh {
  static fromOBJ(string) {
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

    let lines = string.split('\n');

    let vs = []
    let vts = []
    let vns = []
    let fs = []

    for (let line of lines) {
      let trimmedLine = line.trim()
      if (trimmedLine.length == 0) continue;
      let parts = line.trim().split(" ")
      let lineHeader = parts[0].trim();
      if (lineHeader == 'v') {
        //push onto v
        let v = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
        vs.push(v)
      }
      if (lineHeader == 'vt') {
        //push onto vt
        let vt = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]));
        vts.push(vt)
      }
      if (lineHeader == 'vn') {
        //push onto n
        let vn = new Vector3(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
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

          let temp = new Vertex(vs[vIndex], vts[vtIndex], vns[vnIndex])

          face.points.push(temp)
        }
        fs.push(face)
      }
    }

    //Generate a triangle
    let triangle = new Triangle(fs[0].points[0], fs[0].points[1], fs[0].points[2])
    //Generate a mesh
    let mesh = new Mesh([triangle]);
    return mesh;
  }

  constructor(triangles) {
    this.triangles = triangles;
  }
  intersect(o, d) {
    let closest = 10000;
    let best = undefined
    for (let triangle of this.triangles) {
      let intersection = triangle.intersect(o, d)
      if (intersection) {
        if (intersection.timeToCollision < closest) {
          best = intersection;
          closest = intersection.timeToCollision
        }
      }
    }
    if (best) {
      return best;
    }
    else {
      return;
    }
  }

}