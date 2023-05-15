export default class Point {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getX(): number {
    return this.x;
  }

  setX(x: number): void {
    this.x = x;
  }

  getY(): number {
    return this.y;
  }

  setY(y: number): void {
    this.y = y;
  }

  getZ(): number {
    return this.z;
  }

  setZ(z: number): void {
    this.z = z;
  }

  subtract(point: Point): Point {
    const newX = this.x - point.x;
    const newY = this.y - point.y;
    const newZ = this.z - point.z;
    const newPoint = new Point(newX, newY, newZ);
    return newPoint;
  }

  getAmount(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
