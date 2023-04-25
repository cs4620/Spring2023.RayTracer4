class Mesh{
  constructor(triangles){
    this.triangles = triangles;
  }
  intersect(o,d){
    let closest = 10000;
    let best = undefined
    for(let triangle of this.triangles){
      let intersection = triangle.intersect(o,d)
      if(intersection){
        if(intersection.timeToCollision < closest){
          best = intersection;
          closest = intersection.timeToCollision
        }
      }
    }
    if(best){
      return best;
    }
    else{
      return;
    }
  }

}