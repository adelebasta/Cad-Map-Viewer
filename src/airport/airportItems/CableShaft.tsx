import CalibrationTransformation from "../../dxf/calibrationTransformation/CalibrationTransformation";
import Point from "../../util/Point";
import IAirportItem from "./IAirportItem";

/**
 * CableShaft implementation of airport item
 */
export default class CableShaft implements IAirportItem {
  id: string;
  name: string;
  coordinate: { latitude: number; longitude: number };
  rotation: number;
  corners: { latitude: number; longitude: number }[];

  constructor(
    id: string,
    name: string,
    gpsCenterPointCoordinatesString: string,
    rotationAngleInDegrees: number
  ) {
    this.id = id;
    this.name = name;
    const coordinatesArray = gpsCenterPointCoordinatesString
      .split("/")
      .map((item) => {
        return Number(item.replace(/,/g, ".").trim());
      });
    this.coordinate = {
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1],
    };
    this.corners = this.calculateCorners(
      this.coordinate,
      0.0000006,
      rotationAngleInDegrees
    );
    this.rotation = rotationAngleInDegrees;
  }

  toRadians(angle: number): number {
    return angle * (Math.PI / 180);
  }

  toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }

  getID(): string {
    return this.id;
  }

  setID(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCoordinates(): { latitude: number; longitude: number } {
    return this.coordinate;
  }

  setCoordinates(coordinate: { latitude: number; longitude: number }): void {
    this.coordinate = coordinate;
  }

  getCorners(): { latitude: number; longitude: number }[] {
    return this.corners;
  }

  setCorners(corners: { latitude: number; longitude: number }[]): void {
    this.corners = corners;
  }

  getRotation(): number {
    return this.rotation;
  }

  setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  calculateCorners(
    center: {
      latitude: number;
      longitude: number;
    },
    size: number,
    rotation: number
  ): { latitude: number; longitude: number }[] {
    // convert to radians
    [center.latitude, center.longitude] = this.addOffset({
      latitude: center.latitude,
      longitude: center.longitude,
    });
    const centerLat = this.toRadians(center.latitude);
    const centerLon = this.toRadians(center.longitude);
    rotation = this.toRadians(rotation);
    let firstAndLastCorner = null;
    const corners = [];
    // calculate coordinates of corners
    for (let i = 0; i < 4; i++) {
      const angle = this.toRadians(45 + i * 90) + rotation;
      // calculate coordinates of corners using Haversine formula
      let cornerLat = Math.asin(
        Math.sin(centerLat) * Math.cos(size) +
          Math.cos(centerLat) * Math.sin(size) * Math.cos(angle)
      );
      let cornerLon =
        centerLon +
        Math.atan2(
          Math.sin(angle) * Math.sin(size) * Math.cos(centerLat),
          Math.cos(size) - Math.sin(centerLat) * Math.sin(cornerLat)
        );

      cornerLat = this.toDegrees(cornerLat);
      cornerLon = this.toDegrees(cornerLon);
      if (!firstAndLastCorner)
        firstAndLastCorner = { latitude: cornerLat, longitude: cornerLon };
      corners.push({ latitude: cornerLat, longitude: cornerLon });
    }
    if (firstAndLastCorner) corners.push(firstAndLastCorner);
    return corners;
  }

  addOffset(center: { latitude: number; longitude: number }): number[] {
    const pointA = {
      latitude: 50.03263141897,
      longitude: 8.5345254746463,
    };
    const pointB = {
      latitude: 50.03427255986322,
      longitude: 8.541462412148151,
    };
    const slope =
      (pointB.longitude - pointA.longitude) /
      (pointB.latitude - pointA.latitude);
    const y = slope * (center.latitude - pointA.latitude) + pointA.longitude;
    let offsetLat = 0.0004936365617;
    let offsetLon = 0.001131774209;
    if (y < center.longitude) {
      offsetLat = -0.0005656691877;
      offsetLon = -0.001085646233;
    }
    return [center.latitude + offsetLat, center.longitude + offsetLon];
  }
}
