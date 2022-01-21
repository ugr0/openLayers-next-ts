import { useContext, useEffect, VFC } from "react";
import OLVectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";
import Geometry from "ol/geom/Geometry";
import { Style } from "ol/style";
import { MapContext } from "../Map/MapContext";

type Props = {
  source: Vector<Geometry>;
  style: Style;
  zIndex?: number;
};

export const VectorLayer: VFC<Props> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex]);

  return null;
};
