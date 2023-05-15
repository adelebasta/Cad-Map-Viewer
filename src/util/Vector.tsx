import Point from "./Point";

export default class Vector {
  startPoint: Point;
  endPoint: Point;

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  getStartPoint(): Point {
    return this.startPoint;
  }

  setStartPoint(newStartPoint: Point): void {
    this.startPoint = newStartPoint;
  }

  getEndPoint(): Point {
    return this.endPoint;
  }

  setEndPoint(newEndPoint: Point): void {
    this.startPoint = newEndPoint;
  }

  getDistancePoint(): Point {
    return this.endPoint?.subtract(this.startPoint);
  }
}
