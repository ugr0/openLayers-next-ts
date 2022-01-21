import { useEffect, useRef, useState, VFC } from "react";
import * as ol from "ol";
import "ol/ol.css";
import { MapContext } from "./MapContext";
import styles from "./Map.module.css";

type Props = {
  children: any;
  zoom: number;
  center: number[];
};

export const Map: VFC<Props> = ({ children, zoom, center }) => {
  const mapRef = useRef<any>(); // 一旦anyに
  const [map, setMap] = useState<ol.Map>();

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom, map]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center, map]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className={styles.olMap}>
        {children}
      </div>
    </MapContext.Provider>
  );
};
