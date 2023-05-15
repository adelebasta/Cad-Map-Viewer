import CableShaft from "./airportItems/CableShaft";
import CableShaftProducer from "./airportItemProducer/CableShaftProducer";
import { ReactElement } from "react";

/**
 * AirportItemFactory creates airport item depending on the item's type
 */
export default class AirportItemFactory {
  produceAirportItem(
    airportItemType: string,
    object: any
  ): ReactElement | undefined {
    if (airportItemType === "CABLESHAFT") {
      const cableShaft = new CableShaft(
        object.id,
        object.name,
        object.gpsCenterPointCoordinatesString,
        object.rotationAngleInDegrees
      );
      return (
        <CableShaftProducer
          key={cableShaft.getName()}
          cableShaft={cableShaft}
        />
      );
    }
    // extension - implementation of other airport items
  }
}
