import Matrix from "../../util/Matrix";
import Vector from "../../util/Vector";

/**
 * CalibrationUtil creates transformation matrixes
 */
export default class CalibrationUtil {
  static getTranslationMatrix(target: Vector, source: Vector): Matrix {
    const translationPoint = target.startPoint.subtract(source.startPoint);
    const result: Matrix = this.getTranslationMatrixDec(
      translationPoint.getX(),
      translationPoint.getY()
    );
    result.setX33(1);
    return result;
  }

  static getTranslationMatrixDec(tx: number, ty: number): Matrix {
    const result: Matrix = new Matrix();
    result.setX11(1);
    result.setX22(1);
    result.setX31(tx);
    result.setX32(ty);
    result.setX33(1);
    return result;
  }

  static getScalingMatrix(target: Vector, source: Vector): Matrix {
    const sourceXDistance = source.endPoint.getX() - source.startPoint.getX();
    const sourceYDistance = source.endPoint.getY() - source.startPoint.getY();

    const targetXDistance = target.endPoint.getX() - target.startPoint.getX();
    const targetYDistance = target.endPoint.getY() - target.startPoint.getY();

    const scalingX = targetXDistance / sourceXDistance;
    const scalingY = targetYDistance / sourceYDistance;

    const result = new Matrix();
    result.setX11(scalingX);
    result.setX22(scalingY);
    result.setX33(1);
    return result;
  }

  static getRotationMatrix(
    target: Vector,
    source: Vector,
    calibrationAdjustment: number
  ): Matrix {
    const distancePointTarget = target.getDistancePoint();
    const distancePointSource = source.getDistancePoint();
    const sumDividend =
      distancePointTarget.getX() * distancePointSource.getX() +
      distancePointTarget.getY() * distancePointSource.getY();
    const productDivisor =
      distancePointTarget.getAmount() * distancePointSource.getAmount();
    const division = sumDividend / productDivisor;
    const acos =
      Math.acos(division) + CalibrationUtil.toRadians(calibrationAdjustment);
    const result = new Matrix();
    result.setX11(Math.cos(acos));
    result.setX21(Math.sin(acos));
    result.setX12(Math.sin(acos) * -1);
    result.setX22(Math.cos(acos));
    result.setX33(1);
    return result;
  }

  static toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }

  static toRadians(angle: number): number {
    return angle * (Math.PI / 180);
  }

  static getScalingMatrixCAD(sX: number, sY: number): Matrix {
    const result = new Matrix();
    result.setX11(sX);
    result.setX22(sY);
    result.setX33(1);
    return result;
  }

  static getRotationMatrixCAD(angle: number): Matrix {
    const angleInRadians = CalibrationUtil.toRadians(angle);
    const result = new Matrix();
    result.setX11(Math.cos(angleInRadians));
    result.setX21(Math.sin(angleInRadians));
    result.setX12(Math.sin(angleInRadians) * -1);
    result.setX22(Math.cos(angleInRadians));
    result.setX33(1);
    return result;
  }
}
