import CalibrationTransformation from "../calibrationTransformation/CalibrationTransformation";
import Point from "../../util/Point";
import Line from "../dxfGeometry/Line";
import Circle from "../dxfGeometry/Circle";
import Polyline from "../dxfGeometry/Polyline";
import PNGDrawContext from "../drawContext/PNGDrawContext";
import { IDXFGeometry } from "../dxfGeometry/IDXFGeometry";
export type Coordinate = [number, number];
export type Scaling = { sX: number; sY: number };
export type InsertEntityTransformation = {
  translation: Point;
  rotation: number;
  scaling: Scaling;
};

/**
 * DXFDrawing creates and draws DXF objects
 */
export default class DXFDrawing {
  dxfObject: any;
  gpsPointsAB: [Point, Point];
  cadPointsAB: [Point, Point];
  calibrationAdjustment: number;
  transformation: CalibrationTransformation;
  drawContext: PNGDrawContext;
  drawableObjects: IDXFGeometry[];
  gpsBounds: [Coordinate, Coordinate];

  constructor(
    dxfObject: any,
    gpsPointsAB: [Point, Point],
    cadPointsAB: [Point, Point],
    calibrationAdjustment: number
  ) {
    console.log("creating dxf drawing");
    this.dxfObject = dxfObject;
    this.gpsPointsAB = gpsPointsAB;
    this.cadPointsAB = cadPointsAB;
    this.calibrationAdjustment = calibrationAdjustment;
    this.transformation = new CalibrationTransformation(
      this.gpsPointsAB[0],
      this.gpsPointsAB[1],
      this.cadPointsAB[0],
      this.cadPointsAB[1],
      this.calibrationAdjustment
    );
    this.gpsBounds = this.createGPSBounds();
    console.log("creating drawable objects");
    this.drawableObjects = this.createDrawableDXFObjects();
    console.log("creating draw context");
    this.drawContext = new PNGDrawContext(this.gpsBounds, this.transformation);
    console.log("drawing objects");
    this.drawDXFGeometryObjects(this.drawableObjects);
    console.log("objects are drawn");
  }

  /**
   * Creates drawable DXF object depending on the entity's type
   */
  createDrawableDXFObject(
    dxfEntity: any,
    insertEntityTransformation?: InsertEntityTransformation
  ): IDXFGeometry | undefined {
    const color = this.createHexColor(dxfEntity.layer);
    switch (dxfEntity.type) {
      case "LINE":
        let startPoint = new Point(
          dxfEntity.vertices[0].x,
          dxfEntity.vertices[0].y,
          1
        );
        let endPoint = new Point(
          dxfEntity.vertices[1].x,
          dxfEntity.vertices[1].y,
          1
        );
        const line = new Line(
          startPoint,
          endPoint,
          color,
          insertEntityTransformation
        );
        return line;
      case "CIRCLE":
      case "ARC":
      case "ELLIPSE":
        const center = new Point(dxfEntity.center.x, dxfEntity.center.y, 1);
        const radius = dxfEntity.radius;
        const startAngle = dxfEntity.startAngle ? dxfEntity.startAngle : 0;
        const endAngle = dxfEntity.endAngle ? dxfEntity.endAngle : 2 * Math.PI;
        const circle = new Circle(
          center,
          radius,
          color,
          startAngle,
          endAngle,
          insertEntityTransformation
        );
        return circle;
      case "LWPOLYLINE":
      case "POLYLINE":
        const vertices = dxfEntity.vertices;
        if (vertices.length > 0) {
          const polyline = new Polyline(
            vertices,
            color,
            insertEntityTransformation
          );
          return polyline;
        }
      case "INSERT":
        const insertEntities = this.dxfObject.blocks[dxfEntity.name].entities;
        for (let i = 0; i < insertEntities.length; i++) {
          // defines transformations of insert entity and passes down to the function to visualize the objects correctly
          const translation = new Point(
            dxfEntity.position.x,
            dxfEntity.position.y,
            1
          );
          const rotation = dxfEntity.rotation;
          const scaling = { sX: dxfEntity.xScale, sY: dxfEntity.yScale };
          insertEntityTransformation = {
            translation: translation,
            rotation: rotation,
            scaling: scaling,
          };
          return this.createDrawableDXFObject(
            insertEntities[i],
            insertEntityTransformation
          );
        }
    }
  }

  /**
   * Creates an array of drawable objects
   */
  createDrawableDXFObjects(): IDXFGeometry[] {
    const objects: any[] = [];
    this.dxfObject.entities.map((dxfEntity: any) => {
      objects.push(this.createDrawableDXFObject(dxfEntity));
    });
    return objects;
  }

  /**
   * Draws DXF geometry objects
   */
  drawDXFGeometryObjects(objects: IDXFGeometry[]): void {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i]) {
        objects[i].draw(this.drawContext);
      }
    }
  }

  /**
   * Creates CAD bounds
   * by iterating through entities and defining smallest and largest points of the CAD file
   */
  createCADBounds(): number[] {
    let smallestX = Number.MAX_SAFE_INTEGER;
    let smallestY = Number.MAX_SAFE_INTEGER;
    let biggestX = Number.MIN_SAFE_INTEGER;
    let biggestY = Number.MIN_SAFE_INTEGER;
    this.dxfObject.entities.map((entity: any) => {
      // rewrite for all objects
      if (entity.type === "LINE" && entity.vertices) {
        if (entity.vertices[0]?.x < smallestX) {
          smallestX = entity.vertices[0]?.x;
        } else if (entity.vertices[1]?.x < smallestX) {
          smallestX = entity.vertices[1]?.x;
        }
        if (entity.vertices[0]?.y < smallestY) {
          smallestY = entity.vertices[0]?.y;
        } else if (entity.vertices[1]?.y < smallestY) {
          smallestY = entity.vertices[1]?.y;
        }

        if (entity.vertices[0]?.x > biggestX) {
          biggestX = entity.vertices[0]?.x;
        } else if (entity.vertices[1]?.x > biggestX) {
          biggestX = entity.vertices[1]?.x;
        }
        if (entity.vertices[0]?.y > biggestY) {
          biggestY = entity.vertices[0]?.y;
        } else if (entity.vertices[1]?.y > biggestY) {
          biggestY = entity.vertices[1]?.y;
        }
      }
    });
    return [
      Math.round(smallestX),
      Math.round(smallestY),
      Math.round(biggestX),
      Math.round(biggestY),
    ];
  }

  /**
   * creates GPS bounds depending on the calculated CAD bounds
   */
  createGPSBounds(): [Coordinate, Coordinate] {
    const cadXYCoordinates = this.createCADBounds();
    const cadLeftBottom: Point = new Point(
      cadXYCoordinates[0],
      cadXYCoordinates[1],
      1
    );
    const cadRightTop: Point = new Point(
      cadXYCoordinates[2],
      cadXYCoordinates[3],
      1
    );
    const cadLeftTop: Point = new Point(
      cadXYCoordinates[0],
      cadXYCoordinates[3],
      1
    );
    const cadRightBottom: Point = new Point(
      cadXYCoordinates[2],
      cadXYCoordinates[1],
      1
    );
    const cadBounds = [cadLeftBottom, cadLeftTop, cadRightTop, cadRightBottom];
    cadBounds.map((point, index) => {
      const transformedGPSPoint = this.transformation.transformPoint(point);
      cadBounds[index] = transformedGPSPoint;
    });
    const gpsBounds: [Coordinate, Coordinate] = [
      [cadBounds[0].x, cadBounds[1].y],
      [cadBounds[2].x, cadBounds[3].y],
    ];
    return gpsBounds;
  }

  createHexColor(layer: string): string {
    const decColor = this.dxfObject.tables.layer.layers[layer].color;
    let hexColor = decColor.toString(16);
    hexColor =
      hexColor.length < 6
        ? "0".repeat(6 - hexColor.length) + hexColor
        : hexColor;
    return hexColor;
  }

  getImageURI(): string {
    return this.drawContext.getImageURI();
  }

  getGPSBounds(): [Coordinate, Coordinate] {
    return this.gpsBounds;
  }
}
