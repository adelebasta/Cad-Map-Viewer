import { InsertEntityTransformation } from "../dxfDrawing/DXFDrawing";
import AbstractDXFGeometry from "./AbstractDXFGeometry";
import Point from "../../util/Point";
import PNGDrawContext from "../drawContext/PNGDrawContext";

export default class Polyline extends AbstractDXFGeometry {
  points: { x: number; y: number }[];

  constructor(
    points: { x: number; y: number }[],
    color: string,
    transformation?: InsertEntityTransformation
  ) {
    super(color, transformation);
    this.points = points;
  }

  draw = (drawContext: PNGDrawContext) => {
    let startPosition = new Point(this.points[0].x, this.points[0].y, 1);
    if (this.transformation)
      startPosition = drawContext.transformInsertEntity(
        startPosition,
        this.transformation
      );
    for (let i = 1; i < this.points.length; i++) {
      let endPosition = new Point(this.points[i].x, this.points[i].y, 1);
      if (this.transformation)
        endPosition = drawContext.transformInsertEntity(
          endPosition,
          this.transformation
        );
      let startXY = drawContext.transformAndConvertCADtoPNG(startPosition);
      let endXY = drawContext.transformAndConvertCADtoPNG(endPosition);
      this.drawLine(startXY, endXY, this.color, drawContext.getImage());
      startPosition = endPosition;

      // draw last connecting line of end and start points
      if (i === this.points.length - 1) {
        startXY = endXY;
        endXY = new Point(this.points[0].x, this.points[0].y, 1);
        if (this.transformation)
          endXY = drawContext.transformInsertEntity(endXY, this.transformation);
        endXY = drawContext.transformAndConvertCADtoPNG(endXY);
        this.drawLine(startXY, endXY, this.color, drawContext.getImage());
      }
    }
  };
}
