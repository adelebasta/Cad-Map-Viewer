import DxfParser from "dxf-parser";
import * as FileSystem from "expo-file-system";
import { ABSOLUTEPATHTODXFFILE } from "../../config/testData";

/**
 * Reads DXF file and returns parsed DXF object
 */
const loadDXFObject = async () => {
  const parser = new DxfParser();
  try {
    const dxfFile = await FileSystem.readAsStringAsync(ABSOLUTEPATHTODXFFILE);
    var dxf = parser.parseSync(dxfFile);
    const dxfObject = JSON.stringify(dxf);
    const parsedDXF = JSON.parse(dxfObject);
    // console.log("HEADER ", parsedDXF.header);
    return parsedDXF;
  } catch (error) {
    console.log("Error ", error);
  }
};

export default loadDXFObject;
