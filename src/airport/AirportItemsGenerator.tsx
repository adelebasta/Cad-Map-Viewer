import React from "react";
import AirportItemFactory from "./AirportItemFactory";

/**
 * AirportItemsGenerator generates JSX element of airport items from the external source
 */
export default class AirportItemsGenerator {
  createAirportItems(): JSX.Element {
    // extension - retrieve data from REST services
    const cableShafts = require("../data/frankfurtCS.json");
    const airportItemFactory = new AirportItemFactory();
    return (
      <React.Fragment>
        {cableShafts.map(
          (cableShaft: {
            id: string;
            name: string;
            gpsCenterPointCoordinatesString: string;
            rotationAngleInDegrees: number;
          }) => {
            const item = airportItemFactory.produceAirportItem(
              "CABLESHAFT",
              cableShaft
            );
            return item;
          }
        )}
      </React.Fragment>
    );
  }
}
