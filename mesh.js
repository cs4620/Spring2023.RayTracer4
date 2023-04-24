class Mesh{
  constructor(triangles){
    this.triangles = triangles;
  }
  intersect(o,d){
    let closest = 10000;
    let best = undefined
    for(let triangle of this.triangles){
      let i = triangle.intersect(o,d)
      if(i){
        if(i.c < closest){
          best = i;
          closest = i.c
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