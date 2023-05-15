// @ts-ignore
import PNGImage from "pnglib-es6";
import { InsertEntityTransformation } from "../dxfDrawing/DXFDrawing";
import { IDXFGeometry } from "./IDXFGeometry";
import Point from "../../util/Point";
import PNGDrawContext from "../drawContext/PNGDrawContext";

/**
 * AbstractDXFGeometry provides common functionality among implementations of the geometry objects
 */
export default abstract class AbstractDXFGeometry implements IDXFGeometry {
  color: string;
  transformation?: InsertEntityTransformation;

  constructor(color: string, transformation?: InsertEntityTransformation) {
    this.color = color;
    this.transformation = transformation;
  }

  getColor = () => {
    return this.color;
  };

  setColor = (color: string) => {
    this.color = color;
  };

  /**
   * Implements Bresenham’s line drawing algorithm
   */
  // adapted from source: https://ghost-together.medium.com/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395
  drawLine(
    startPoint: Point,
    endPoint: Point,
    color: string,
    image: PNGImage
  ): void {
    // if line is out of bounds, don't draw
    const imageSizeX = image.width;
    const imageSizeY = image.height;
    // replace white color to make the line more visible
    color = color === "ffffff" ? "30839f" : color;
    color = image.createColor(color);

    if (
      startPoint.getX() < 0 ||
      startPoint.getY() > imageSizeY ||
      endPoint.getX() > imageSizeX ||
      endPoint.getY() < 0
    ) {
      return;
    }
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
    dx = endPoint.getX() - startPoint.getX();
    dy = endPoint.getY() - startPoint.getY();
    dx1 = Math.abs(dx);
    dy1 = Math.abs(dy);
    px = 2 * dy1 - dx1;
    py = 2 * dx1 - dy1;
    if (dy1 <= dx1) {
      if (dx >= 0) {
        x = startPoint.getX();
        y = startPoint.getY();
        xe = endPoint.getX();
      } else {
        x = endPoint.getX();
        y = endPoint.getY();
        xe = startPoint.getX();
      }
      image.setPixel(x, imageSizeY - y, color);
      for (i = 0; x < xe; i++) {
        x = x + 1;
        if (px < 0) {
          px = px + 2 * dy1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            y = y + 1;
          } else {
            y = y - 1;
          }
          px = px + 2 * (dy1 - dx1);
        }
        image.setPixel(x, imageSizeY - y, color);
      }
    } else {
      if (dy >= 0) {
        x = startPoint.getX();
        y = startPoint.getY();
        ye = endPoint.getY();
      } else {
        x = endPoint.getX();
        y = endPoint.getY();
        ye = startPoint.getY();
      }
      image.setPixel(x, imageSizeY - y, color);
      for (i = 0; y < ye; i++) {
        y = y + 1;
        if (py <= 0) {
          py = py + 2 * dx1;
        } else {
          if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
            x = x + 1;
          } else {
            x = x - 1;
          }
          py = py + 2 * (dx1 - dy1);
        }
        image.setPixel(x, imageSizeY - y, color);
      }
    }
  }

  draw = (drawContext: PNGDrawContext) => {};
}
