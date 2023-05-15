import Point from "./Point";

export default class Matrix {
  x11: number;
  x12: number;
  x13: number;
  x21: number;
  x22: number;
  x23: number;
  x31: number;
  x32: number;
  x33: number;

  constructor() {
    (this.x11 = 0),
      (this.x12 = 0),
      (this.x13 = 0),
      (this.x21 = 0),
      (this.x22 = 0),
      (this.x23 = 0),
      (this.x31 = 0),
      (this.x32 = 0),
      (this.x33 = 0);
  }

  getX11(): number {
    return this.x11;
  }

  setX11(newX11: number): void {
    this.x11 = newX11;
  }

  getX12(): number {
    return this.x12;
  }

  setX12(newX12: number): void {
    this.x12 = newX12;
  }

  getX13(): number {
    return this.x13;
  }

  setX13(newX13: number): void {
    this.x13 = newX13;
  }

  getX21(): number {
    return this.x21;
  }

  setX21(newX21: number): void {
    this.x21 = newX21;
  }

  getX22(): number {
    return this.x22;
  }

  setX22(newX22: number): void {
    this.x22 = newX22;
  }

  getX23(): number {
    return this.x23;
  }

  setX23(newX23: number): void {
    this.x23 = newX23;
  }

  getX31(): number {
    return this.x31;
  }

  setX31(newX31: number): void {
    this.x31 = newX31;
  }

  getX32(): number {
    return this.x32;
  }

  setX32(newX32: number): void {
    this.x32 = newX32;
  }

  getX33(): number {
    return this.x33;
  }

  setX33(newX33: number): void {
    this.x33 = newX33;
  }

  multiply(point: Point): Point {
    const newX =
      this.x11 * point.getX() +
      this.x21 * point.getY() +
      this.x31 * point.getZ();
    const newY =
      this.x12 * point.getX() +
      this.x22 * point.getY() +
      this.x32 * point.getZ();
    const newZ =
      this.x13 * point.getX() +
      this.x23 * point.getY() +
      this.x33 * point.getZ();
    const newPoint = new Point(newX, newY, newZ);
    return newPoint;
  }
}
