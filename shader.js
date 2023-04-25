class Shader {
  // illuminateObject(rayFrom, rayCollision, normal, scene) {

  // }
  castRay() {
    let inShadow = false;


    //Manually check for shadows
    for (let object of rayTracedObjects) {
      if (object == rayTracedObject) continue
      let directionToLight = new Vector3(1, -1, 1);

      let collision = object.geometry.intersect(c, directionToLiht)
      if (collision)
        inShadow = true;
    }
  }
}

class DiffuseShader {
  constructor(diffuseColor) {
    this.diffuseColor = diffuseColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, collisionObject, scene) {

    let inShadow = false;


    //Manually check for shadows
    for (let object of scene.rayTracedObjects) {
      if (object == collisionObject) continue
      let directionToLight = new Vector3(1, -1, 1);

      let collision = object.geometry.intersect(rayCollision, directionToLight)
      if (collision) {
        inShadow = true;
        break;
      }
    }


    let dot = normal.dot(new Vector3(1, -1, 1).normalize());
    if(inShadow) dot = 0;
    if (dot <= 0)
      dot = 0
    return { r: this.diffuseColor.r * dot, g: this.diffuseColor.g * dot, b: this.diffuseColor.b * dot };
  }
}

