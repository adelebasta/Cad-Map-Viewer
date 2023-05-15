import { InsertEntityTransformation } from "../dxfDrawing/DXFDrawing";
import PNGDrawContext from "../drawContext/PNGDrawContext";

/**
 * IDXFGeometry defines attributes and methods for DXF geometry
 */
export interface IDXFGeometry {
  color: string;
  transformation?: InsertEntityTransformation;
  draw(drawContext: PNGDrawContext): void;
  getColor(): string;
  setColor(color: string): void;
}
