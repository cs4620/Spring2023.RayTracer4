/**
 * Run our ray tracer
 * @param {Scene} scene The scene object with rendering details
 */
function main(scene) {
  //Grab the width and height from the scene object (if they exist)
  let width = scene?.options?.width ? scene.options.width : 100
  let height = scene?.options?.height ? scene.options.height : 100

  //Grab the background color from the scene object (if it is defined)
  let backgroundColor = scene?.options?.backgroundColor ? scene.options.backgroundColor: new Pixel(255, 0, 0)
  // let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let rayTracedObjects = scene.rayTracedObjects

  //Ray Tracer starts
  //Loop over all the pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      //Debug code
      if (x == 50 && y == 50) {
        console.log("stop")
      }

      //The color of the closest collision for this pixel
      let rayTracedPixel = backgroundColor;

      //The distance to the closest collision for this pixel
      let closestPositiveT = 10000000

      //Determine the origin and direction of the ray
      let startX = x - width / 2;
      let startY = y - height / 2;
      let origin = new Vector3(startX, startY, scene.camera.z);
      let direction = new Vector3(0, 0, -1);

      //Loop over all the rayTracedObjects in this scene
      //Note that in an optimized ray tracer, 
      //you can use spatial subdivision to reduce this from 
      //O(n) to O(log(n))
      for (let rayTracedObject of rayTracedObjects) {
        
        //Get the geometry of the current object
        let geometry = rayTracedObject.geometry

        //Find the intersection with this object
        let collision = geometry.intersect(origin, direction);

        //Check to see if the collision exists...
        //...and if it is closer than any other collision we've seen
        if (collision && collision.timeToCollision < closestPositiveT) {
          //Get the distance to collision
          closestPositiveT = collision.timeToCollision
          
          //Get the location of the collision
          let c = collision.collisionLocation
          let normal = collision.normalAtCollision
          
          //Use the shader to calculate the color at this collision
          rayTracedPixel =  rayTracedObject.shader.illuminateObject(origin, c, normal, [])
        }

        //Store the color as a string
        let pixelString = `rgb(${rayTracedPixel.r}, ${rayTracedPixel.g}, ${rayTracedPixel.b})`;
        
        //Use the canvas to draw on the screen.
        ctx.fillStyle = pixelString;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}


//Run the main ray tracer

main(scene);
