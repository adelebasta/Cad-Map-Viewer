/**
 * IMap defines attributes for Map
 */
export default interface IMap {
  // initial region defines the map area shown to the user once the application is opened
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}
