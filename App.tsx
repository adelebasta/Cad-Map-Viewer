import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapAndCADViewer from "./src/map/MapAndCADViewer";
import MapView from "react-native-maps";
import Map from "./src/map/Map";
import AirportItemsGenerator from "./src/airport/AirportItemsGenerator";
import { INITIALREGION } from "./src/config/testData";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef<MapView>(null);
  const map = new Map(INITIALREGION);

  const airportItems = new AirportItemsGenerator().createAirportItems();
  return (
    <View style={styles.view}>
      <MapAndCADViewer
        map={map}
        airportItems={airportItems}
        mapRef={mapRef}
        loaded={loaded}
        setLoaded={setLoaded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
