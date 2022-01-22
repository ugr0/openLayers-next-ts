import { useCallback, useEffect, useRef, useState, VFC } from "react";

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
import MapData from "src/data/mapData.json";
import { Slider } from "@mui/material";

type Props = {
  lon: number;
  lat: number;
  zoom: number;
  width: number;
  height: number;
};

export const MapPane: VFC<Props> = (props) => {
  const { lon, lat, zoom, width, height } = props;
  const [blur, setBlur] = useState(20);
  const [radius, setRadius] = useState(20);
  let container: any = useRef(null);

  // ヒートマップのblurハンドラ
  const handleChangeBlur = useCallback(
    (event: Event, newValue: number | number[]) => {
      setBlur(newValue as number);
    },
    []
  );

  // ヒートマップのradiusハンドラ
  const handleChangeRadius = useCallback(
    (event: Event, newValue: number | number[]) => {
      setRadius(newValue as number);
    },
    []
  );

  // OpenStreetMap Layer
  const osm = new TileLayer({
    source: new OSM(),
  });

  // 地域ごとの緯度経度、値を取得
  let featureData: Feature<Point>[] = [];
  Object.values(MapData).map((data) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([data.lon, data.lat])),
      value: data.value,
    });
    featureData = [...featureData, feature];
  });

  // HeatMapLayer
  const hml = process.browser
    ? new HeatmapLayer({
        source: new VectorSource({
          features: featureData,
        }),
        blur: 15,
        radius: 20,
        weight: (feature) => {
          return feature.get("value");
        },
      })
    : undefined;

  useEffect(() => {
    const map = process.browser
      ? new Map({
          target: container,
          layers: [osm],
          view: new View({
            center: fromLonLat([lon, lat]),
            zoom,
            maxZoom: 14,
            minZoom: 8,
          }),
        })
      : null;
    map?.addLayer(hml as HeatmapLayer);
  }, []);

  return (
    <>
      <div
        className={classes.map}
        style={{ width, height }}
        ref={(e) => (container = e)}
      />

      <h1>半径とぼやけ調整(TODO)</h1>
      <p>blur: {blur}</p>
      <Slider
        aria-label="blur"
        valueLabelDisplay="auto"
        value={blur}
        onChange={handleChangeBlur}
        min={1}
        max={50}
      />
      <p>radius: {radius}</p>
      <Slider
        aria-label="radius"
        valueLabelDisplay="auto"
        value={radius}
        onChange={handleChangeRadius}
        min={1}
        max={50}
      />
    </>
  );
};
