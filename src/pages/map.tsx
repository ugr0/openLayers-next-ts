import type { NextPage } from "next";
import { useState } from "react";

// OpenLayer
import { fromLonLat, get } from "ol/proj";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import * as olSource from "ol/source";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Map } from "src/components/Map";

// Components
import { Layers } from "src/components/Layers";
import { TileLayer } from "src/components/Layers/TileLayer";
import { VectorLayer } from "src/components/Layers/VectorLayer";

let styles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: undefined,
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};

const geojsonObject = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        kind: "county",
        name: "Wyandotte",
        state: "KS",
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-94.8627, 39.202],
              [-94.901, 39.202],
              [-94.9065, 38.9884],
              [-94.8682, 39.0596],
              [-94.6053, 39.0432],
              [-94.6053, 39.1144],
              [-94.5998, 39.1582],
              [-94.7422, 39.1691],
              [-94.7751, 39.202],
              [-94.8627, 39.202],
            ],
          ],
        ],
      },
    },
  ],
} as const;

const MapPage: NextPage = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  const osm = new olSource.OSM();
  return (
    <>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          {/* <TileLayer source={osm} zIndex={0} /> */}
          {showLayer1 ? (
            <VectorLayer
              source={
                new VectorSource({
                  features: new GeoJSON().readFeatures(geojsonObject, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })
              }
              style={styles.MultiPolygon}
            />
          ) : null}
        </Layers>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
    </>
  );
};

export default MapPage;
