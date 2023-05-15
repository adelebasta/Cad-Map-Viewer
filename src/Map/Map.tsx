import IMap from "./IMap";

export default class Map implements IMap {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  constructor(initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) {
    this.initialRegion = initialRegion;
  }

  setInitialRegion(initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }): void {
    this.initialRegion = initialRegion;
  }

  getInitialRegion(): {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } {
    return this.initialRegion;
  }
}
