// add absolute path to the building.dxf file
// the file can be found in ./src/data/building.dxf
const absolutePath = "Users/adele/tmp/building.dxf";
export const ABSOLUTEPATHTODXFFILE = "file:/" + absolutePath;

// GPS & CAD points
export const GPSPOINTA = [52.542777753814946, 13.349923301053728];
export const GPSPOINTB = [52.543785846185884, 13.351484346607585];
export const CADPOINTA = [25, 14];
export const CADPOINTB = [15370, 1641];
export const CALIBRATIONADJUSTMENT = -2.5;

// region on the displayed map
// export const INITIALREGION = {
//   // Haus Gauß
//   latitude: 52.54318,
//   longitude: 13.35071,
//   latitudeDelta: 0.0015,
//   longitudeDelta: 0.0015,
// };

// // add absolute path to the building.dxf file
// // the file can be found in ./src/assets/building.dxf
// const absolutePath = "Users/adele/tmp/frankfurt.dxf";
// export const ABSOLUTEPATHTODXFFILE = "file:/" + absolutePath;

// // GPS & CAD points
// export const GPSPOINTA = [50.032425, 8.533716];
// export const GPSPOINTB = [50.046113, 8.59092];
// export const CADPOINTA = [3466666, 5544114];
// export const CADPOINTB = [3470777, 5545611];
// export const CALIBRATIONADJUSTMENT = 0;

// // region on the displayed map
export const INITIALREGION = {
  // airport
  latitude: 50.038917357440596,
  longitude: 8.566524285339522,
  latitudeDelta: 0.004,
  longitudeDelta: 0.004,
};
