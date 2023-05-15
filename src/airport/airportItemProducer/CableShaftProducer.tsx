import CableShaft from "../airportItems/CableShaft";
import { Polygon } from "react-native-maps";
import { Alert } from "react-native";
import { Component, ReactElement } from "react";
export type CSProps = {
  cableShaft: CableShaft;
};
/**
 * CableShaftProducer generates the JSX for a cable shaft
 */
export default class CableShaftProducer extends Component<CSProps> {
  state: {
    strokeColor: string;
    backgroundColor: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      strokeColor: "#FFFFFF",
      backgroundColor: "rgba(0,0,0,0)",
    };
  }

  componentDidMount(): void {
    const strokeColor =
      this.props.cableShaft.getID() ===
      "ACA-0695b4e8-ee80-44a9-a0f0-9c8095e060bc"
        ? "#FF0000"
        : "blue";
    this.setState({
      strokeColor: strokeColor,
      backgroundColor: "rgba(0,0,0,0)",
    });
  }

  showAlert = (cableShaft: CableShaft) => {
    console.log(
      "center: " +
        cableShaft.coordinate.latitude +
        " " +
        cableShaft.coordinate.longitude
    );
    Alert.alert(
      "Cable Shaft Overview",
      "Name: " +
        cableShaft.name +
        "\nId: " +
        cableShaft.id +
        "\nCoordinates: " +
        cableShaft.coordinate.latitude +
        " " +
        cableShaft.coordinate.longitude,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "View",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  render(): ReactElement {
    const { cableShaft } = this.props;
    return (
      <Polygon
        key={cableShaft.getName()}
        coordinates={cableShaft.getCorners()}
        tappable={true}
        onPress={() => this.showAlert(cableShaft)}
        fillColor={this.state.backgroundColor}
        strokeColor={this.state.strokeColor}
        strokeWidth={3}
      />
    );
  }
}
