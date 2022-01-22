import { useCallback, useEffect, useRef, useState, VFC, useMemo } from "react";

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
  let container: any = useRef(null);

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

  // ヒートマップのblurハンドラ
  const handleChangeBlur = useCallback(
    (event: Event, newValue: number | number[]) => {
      hml?.setBlur(newValue as number);
    },
    []
  );

  // ヒートマップのradiusハンドラ
  const handleChangeRadius = useCallback(
    (event: Event, newValue: number | number[]) => {
      hml?.setRadius(newValue as number);
    },
    []
  );

  // TODO mapが再レンダリングでたくさん表示されてしまう。
  useEffect(() => {
    console.log("UseEffectが呼ばれました");
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
      : undefined;

    map?.addLayer(hml as HeatmapLayer);
    console.log("mapが作られました");
  });

  console.log("レンダリングをする");

  return (
    <>
      <div style={{ width, height }} ref={(e) => (container = e)} />

      <h1>半径とぼやけ調整 (TODO)</h1>
      <p>blur: </p>
      <Slider
        aria-label="blur"
        valueLabelDisplay="auto"
        defaultValue={20}
        onChange={handleChangeBlur}
        min={1}
        max={50}
      />
      <p>radius: </p>
      <Slider
        aria-label="radius"
        valueLabelDisplay="auto"
        defaultValue={20}
        onChange={handleChangeRadius}
        min={1}
        max={50}
      />
    </>
  );
};
