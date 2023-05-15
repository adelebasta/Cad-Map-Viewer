// @ts-ignore
import PNGImage from "pnglib-es6";
import CalibrationTransformation from "../calibrationTransformation/CalibrationTransformation";
import CalibrationUtil from "../calibrationTransformation/CalibrationUtil";
import {
  Coordinate,
  InsertEntityTransformation,
} from "../dxfDrawing/DXFDrawing";
import Point from "../../util/Point";

/**
 * PNGDrawContext provides the necessary information for geometry objects to be drawn on the PNG image
 */
export default class PNGDrawContext {
  image: PNGImage;
  pngBounds: [Point, Point];
  gpsBounds: [Coordinate, Coordinate];
  transformation: CalibrationTransformation;

  constructor(
    gpsBounds: [Coordinate, Coordinate],
    transformation: CalibrationTransformation
  ) {
    this.transformation = transformation;
    this.gpsBounds = gpsBounds;
    this.pngBounds = this.createPNGBounds();
    this.image = new PNGImage(
      this.pngBounds[1].getX(),
      this.pngBounds[1].getY(),
      8
    );
    console.log(
      "PNG bounds " + this.pngBounds[1].getX() + ", " + this.pngBounds[1].getY()
    );
  }

  createPNGBounds(): [Point, Point] {
    const pngBound0 = new Point(0, 0, 1);
    const pngBound1 = new Point(
      Math.round((this.gpsBounds[1][0] - this.gpsBounds[0][0]) * 1200000),
      Math.round((this.gpsBounds[1][1] - this.gpsBounds[0][1]) * 1200000),
      // Math.round((this.gpsBounds[1][0] - this.gpsBounds[0][0]) * 16000),
      // Math.round((this.gpsBounds[1][1] - this.gpsBounds[0][1]) * 16000),
      // works with image, with overlay the app quits
      // 690,4500,
      // 4000,24000,
      // highest resolution with overlay
      // 460,
      // 3000,
      1
    );
    const pngBounds: [Point, Point] = [pngBound0, pngBound1];
    return pngBounds;
  }

  transformAndConvertCADtoPNG(point: Point): Point {
    const gpsCoordinate = this.transformation.transformPoint(point);
    const [newX, newY] = this.convertGPStoPNG([
      gpsCoordinate.getX(),
      gpsCoordinate.getY(),
    ]);
    return new Point(newX, newY, 1);
  }

  /**
   * Converts GPS coordinates to PNG coordinates
   * using linear interpolation method
   */
  convertGPStoPNG(point: Coordinate): [number, number] {
    const latitude = point[0];
    const longitude = point[1];
    const x =
      this.pngBounds[0].getX() +
      ((longitude - this.gpsBounds[0][1]) /
        (this.gpsBounds[1][1] - this.gpsBounds[0][1])) *
        (this.pngBounds[1].getX() - this.pngBounds[0].getX());
    const y =
      this.pngBounds[0].getY() +
      ((latitude - this.gpsBounds[0][0]) /
        (this.gpsBounds[1][0] - this.gpsBounds[0][0])) *
        (this.pngBounds[1].getY() - this.pngBounds[0].getY());
    return [Math.round(x), Math.round(y)];
  }

  /**
   * Transforms INSERT entity type
   */
  transformInsertEntity(
    point: Point,
    insertTransformation: InsertEntityTransformation
  ): Point {
    const rotationMatrix = CalibrationUtil.getRotationMatrixCAD(
      -1 * insertTransformation.rotation
    );
    const scalingMatrix = CalibrationUtil.getScalingMatrixCAD(
      insertTransformation.scaling.sX,
      insertTransformation.scaling.sY
    );
    const translationMatrix = CalibrationUtil.getTranslationMatrixDec(
      insertTransformation.translation.getX(),
      insertTransformation.translation.getY()
    );
    if (insertTransformation.translation) {
      point = translationMatrix.multiply(point);
    }
    if (insertTransformation.scaling.sX) {
      scalingMatrix.multiply(point);
    }
    if (insertTransformation.rotation) {
      point = rotationMatrix.multiply(
        new Point(
          point.getX() - insertTransformation.translation.getX(),
          point.getY() - insertTransformation.translation.getY(),
          1
        )
      );
      point.setX(point.getX() + insertTransformation.translation.getX());
      point.setY(point.getY() + insertTransformation.translation.getY());
    }
    return point;
  }

  getImageURI(): string {
    return this.image.getDataURL();
  }

  getImage(): PNGImage {
    return this.image;
  }
}
