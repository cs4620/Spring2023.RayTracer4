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
    return this.three.position.minus(this.three.position).normalize();
  }
  intersect(o,d){
    //First find the collision on the plane
    let ABC = this.oneTwo.cross(this.threeTwo);
    let D = -(ABC.dot(this.one.position));
    let t = (-D-o.dot(ABC))/(d.dot(ABC))
    let c = o.plus(d.scale(t));
    return {t, v:c};
  }
}