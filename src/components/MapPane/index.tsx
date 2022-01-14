// OpenLayers読み込み
import { useEffect, useRef, VFC } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
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
    console.log(container);
    let map = new Map({
      target: container,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
            attributions:
              'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
            attributionsCollapsible: false,
            tileSize: [256, 256],
            minZoom: 0,
            maxZoom: 18,
          }),
        }),
      ],
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
