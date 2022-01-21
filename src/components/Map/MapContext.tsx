import { createContext } from "react";
import * as ol from "ol";

interface ContextInterface {
  map: ol.Map | undefined;
}

export const MapContext = createContext({} as ContextInterface);
