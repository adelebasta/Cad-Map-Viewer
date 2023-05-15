import { Component, ReactElement } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { MapType, PROVIDER_GOOGLE } from "react-native-maps";
import Map from "./Map";
export type MergedMapProps = {
  map: Map;
  airportItems: JSX.Element;
  mapRef: React.RefObject<MapView>;
  loaded: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * MapAndCADViewer combines Map, airport items and returns merged map component
 */
export default class MapAndCADViewer extends Component<MergedMapProps> {
  state: {
    mapType: MapType;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      mapType: "standard",
    };
  }

  componentDidMount() {
    this.props.setLoaded(false);
  }

  onRegionChangeComplete = (region: {
    latitude: number;
    longitude: number;
  }) => {
    const { loaded, setLoaded, map, mapRef } = this.props;
    if (!loaded) {
      if (
        region.latitude != map.initialRegion.latitude ||
        region.longitude != map.initialRegion.longitude
      ) {
        mapRef.current?.animateToRegion(map.initialRegion, 1);
      }
      setLoaded(true);
    }
  };

  render(): ReactElement {
    const { map, mapRef, airportItems } = this.props;
    const onPress = () => {
      const mapType =
        this.state.mapType === "standard" ? "satellite" : "standard";
      this.setState({ mapType: mapType });
    };
    return (
      <View style={styles.view}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          region={map.getInitialRegion()}
          onRegionChangeComplete={this.onRegionChangeComplete}
          mapType={this.state.mapType}
        >
          {airportItems}
        </MapView>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>Map Type</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#1434A4",
    position: "absolute",
    right: "3%",
    bottom: "3%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
