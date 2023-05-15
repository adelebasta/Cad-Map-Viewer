import Matrix from "../../util/Matrix";
import Point from "../../util/Point";
import CalibrationUtil from "./CalibrationUtil";
import Vector from "../../util/Vector";

/**
 * CalibrationTransformation calculates transformations
 */
export default class CalibrationTransformation {
  gpsPointA: Point;
  gpsPointB: Point;
  cadPointA: Point;
  cadPointB: Point;
  rotationMatrix: Matrix;
  scalingMatrix: Matrix;
  translationMatrix: Matrix;

  constructor(
    gpsPointA: Point,
    gpsPointB: Point,
    cadPointA: Point,
    cadPointB: Point,
    calibrationAdjustment: number
  ) {
    this.gpsPointA = gpsPointA;
    this.gpsPointB = gpsPointB;
    this.cadPointA = cadPointA;
    this.cadPointB = cadPointB;
    const gpsVector = new Vector(this.gpsPointA, this.gpsPointB);
    const cadVector = new Vector(this.cadPointA, this.cadPointB);
    this.rotationMatrix = CalibrationUtil.getRotationMatrix(
      gpsVector,
      cadVector,
      calibrationAdjustment
    );
    const rotatedCADPointA = this.rotationMatrix.multiply(this.cadPointA);
    const rotatedCADPointB = this.rotationMatrix.multiply(this.cadPointB);
    const rotatedCADVector = new Vector(rotatedCADPointA, rotatedCADPointB);
    this.scalingMatrix = CalibrationUtil.getScalingMatrix(
      gpsVector,
      rotatedCADVector
    );
    const scaledCADPointA = this.scalingMatrix.multiply(rotatedCADPointA);
    const scaledCADPointB = this.scalingMatrix.multiply(rotatedCADPointB);
    const scaledVector = new Vector(scaledCADPointA, scaledCADPointB);
    this.translationMatrix = CalibrationUtil.getTranslationMatrix(
      gpsVector,
      scaledVector
    );
  }

  /**
   * Transforms cad point into GPS coordinates using transformations
   */
  transformPoint(cadPoint: Point): Point {
    const rotatedPoint = this.rotationMatrix.multiply(cadPoint);
    const scaledPoint = this.scalingMatrix.multiply(rotatedPoint);
    const translatedPoint = this.translationMatrix.multiply(scaledPoint);
    return translatedPoint;
  }
}
