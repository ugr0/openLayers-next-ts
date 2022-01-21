import { useEffect, useRef, VFC } from "react";

// OpenLayers読み込み
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import HeatmapLayer from "ol/layer/Heatmap";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import classes from "./MapPane.module.css";

type Props = {
  lon: number;
  lat: number;
  zoom: number;
  width: number;
  height: number;
};

export const MapPane: VFC<Props> = (props) => {
  const { lon, lat, zoom, width, height } = props;
  let container: any = useRef(null);

  // TODO イマイチ
  const styles = {
    width: width,
    height: height,
  };

  useEffect(() => {
    const osm = new TileLayer({
      source: new OSM(),
    });

    const hml = new HeatmapLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([130.853, 33.571])),
          }),
          new Feature({
            geometry: new Point(fromLonLat([130.686, 33.635])),
          }),
        ],
      }),
      blur: 50,
      radius: 40,
    });

    const map = new Map({
      target: container,
      layers: [osm, hml],
      view: new View({
        center: fromLonLat([lon, lat]),
        zoom,
      }),
    });
    map.setSize([width, height]);
  }, [lon, lat, zoom, width, height]);

  return (
    <div className={classes.map} style={styles} ref={(e) => (container = e)} />
  );
};
