/**
 * Run our ray tracer
 * @param {Scene} scene The scene object with rendering details
 */
function main(scene) {
  let width = scene?.options?.width ? scene.options.width : 100
  let height = scene?.options?.height ? scene.options.height : 100

  let backgroundColor = scene?.options?.backgroundColor ? scene.options.backgroundColor: new Pixel(255, 0, 0)
  let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let rayTracedObjects = scene.rayTracedObjects

  //Ray Tracer starts
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x == 50 && y == 50) {
        console.log("stop")
      }

      let rayTracedPixel = backgroundColor;
      let closestPositiveT = 10000000

      for (let rayTracedObject of rayTracedObjects) {
        let geometry = rayTracedObject.geometry

        let startX = x - width / 2;
        let startY = y - height / 2;
        let origin = new Vector3(startX, startY, scene.camera.z);
        let direction = new Vector3(0, 0, -1);
        let collision = geometry.intersect(origin, direction);


        if (collision && collision.timeToCollision < closestPositiveT) {
          closestPositiveT = collision.timeToCollision
          let c = collision.collisionLocation
          let normal = collision.normalAtCollision
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
