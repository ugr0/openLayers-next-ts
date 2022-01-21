import { useContext, useEffect, VFC } from "react";
import { FullScreen } from "ol/control";
import { MapContext } from "../Map/MapContext";

export const FullScreenControl: VFC = () => {
  const { map } = useContext(MapContext);

  useEffect((): any => {
    if (!map) return;

    let fullScreenControl = new FullScreen({});
    map.addControl(fullScreenControl);

    return map.removeControl(fullScreenControl);
  }, [map]);

  return null;
};
