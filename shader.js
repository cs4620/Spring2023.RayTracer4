class Shader {
  illuminateObject(rayFrom, rayCollision, normal, lights) {
    
  }
}

class DiffuseShader{
  constructor(diffuseColor){
    this.diffuseColor = diffuseColor;
  }
  illuminateObject(rayFrom, rayCollision, normal, lights){
    let dot = normal.dot(new Vector3(1, -1, 1).normalize());
    if (dot <= 0)
      dot = 0
    return { r: this.diffuseColor.r*dot, g: this.diffuseColor.g*dot, b: this.diffuseColor.b*dot };
  }
}