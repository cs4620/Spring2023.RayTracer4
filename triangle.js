class Triangle{
  constructor(one, two, three){
    this.vertices = [];
    this.vertices.push(...[one, two, three])
  }
  get one(){
    return this.vertices[0];
  }
  get two(){
    return this.vertices[1]
  }
  get three(){
    return this.vertices[2]
  }
  get oneTwo(){
    return this.one.position.minus(this.two.position).normalize();
  }
  get twoThree(){
    return this.two.position.minus(this.three.position).normalize();
  }
  get threeTwo(){
    return this.three.position.minus(this.two.position).normalize();
  }
  intersect(origin,direction){
    //First find the collision on the plane
    let ABC = this.threeTwo.cross(this.oneTwo).normalize();
    let D = -(ABC.dot(this.one.position));
    let timeToCollision = (-D-origin.dot(ABC))/(direction.dot(ABC))
    let collisionLocation = origin.add(direction.scale(timeToCollision));
    // return {timeToCollision, collisionLocation};
    return new Collision(timeToCollision, collisionLocation, ABC);
  }
}