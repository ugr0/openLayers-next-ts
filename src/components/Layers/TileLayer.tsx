import { useContext, useEffect, VFC } from "react";
import OLTileLayer from "ol/layer/Tile";
import TileSource from "ol/source/Tile";
import { MapContext } from "../Map/MapContext";

type Props = {
  source: TileSource;
  zIndex?: number;
};

export const TileLayer: VFC<Props> = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    // tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};
