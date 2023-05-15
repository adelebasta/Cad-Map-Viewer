import AbstractDXFGeometry from "./AbstractDXFGeometry";
import Point from "../../util/Point";
import PNGDrawContext from "../drawContext/PNGDrawContext";
import { InsertEntityTransformation } from "../dxfDrawing/DXFDrawing";

export default class Line extends AbstractDXFGeometry {
  startPoint: Point;
  endPoint: Point;

  constructor(
    startPoint: Point,
    endPoint: Point,
    color: string,
    transformation?: InsertEntityTransformation
  ) {
    super(color, transformation);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  draw = (drawContext: PNGDrawContext) => {
    let transformedStartPoint = this.startPoint;
    let transformedEndPoint = this.endPoint;
    if (this.transformation) {
      transformedStartPoint = drawContext.transformInsertEntity(
        transformedStartPoint,
        this.transformation
      );
      transformedEndPoint = drawContext.transformInsertEntity(
        transformedEndPoint,
        this.transformation
      );
    }
    transformedStartPoint = drawContext.transformAndConvertCADtoPNG(
      transformedStartPoint
    );
    transformedEndPoint =
      drawContext.transformAndConvertCADtoPNG(transformedEndPoint);
    this.drawLine(
      transformedStartPoint,
      transformedEndPoint,
      this.color,
      drawContext.getImage()
    );
  };
}
