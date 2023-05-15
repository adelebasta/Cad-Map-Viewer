import { InsertEntityTransformation } from "../dxfDrawing/DXFDrawing";
import AbstractDXFGeometry from "./AbstractDXFGeometry";
import Point from "../../util/Point";
import PNGDrawContext from "../drawContext/PNGDrawContext";

export default class Circle extends AbstractDXFGeometry {
  center: Point;
  radius: number;
  startAngle: number;
  endAngle: number;

  constructor(
    center: Point,
    radius: number,
    color: string,
    startAngle: number,
    endAngle: number,
    transformation?: InsertEntityTransformation
  ) {
    super(color, transformation);
    this.center = center;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  // inspired by source: https://www.mathopenref.com/coordcirclealgorithm.html
  draw = (drawContext: PNGDrawContext) => {
    const step = (2 * Math.PI) / 100;
    let startPoint = new Point(0, 0, 1);
    let first = true;
    if (this.startAngle > this.endAngle) {
      // if end angle is 0, change to 360
      this.endAngle = 6.28319;
    }
    for (var theta = this.startAngle; theta < this.endAngle; theta += step) {
      var x = this.center.getX() + this.radius * Math.cos(theta);
      var y = this.center.getY() + this.radius * Math.sin(theta);
      let point = new Point(x, y, 1);
      if (this.transformation)
        point = drawContext.transformInsertEntity(point, this.transformation);
      const transformedPoint = drawContext.transformAndConvertCADtoPNG(point);
      if (first) {
        first = false;
      } else {
        this.drawLine(
          startPoint,
          new Point(transformedPoint.getX(), transformedPoint.getY(), 1),
          this.color,
          drawContext.getImage()
        );
      }
      startPoint = transformedPoint;
    }
  };
}
