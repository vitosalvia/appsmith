/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React, { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import * as topojson from "topojson-client";

export default function GeoJsonData(props: any) {
  const layerRef = useRef(null);
  const {
    centerLayer,
    defaultZoom,
    map,
    mapCenter,
    otherProps,
    updateCenter,
    updateZoom,
    zoom,
  } = props;
  function addData(layer: any, jsonData: any) {
    if (jsonData.type === "Topology") {
      for (const key in jsonData.objects) {
        const geojson = topojson.feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
    if (map && layer) {
      fitBounds(layer);
    }
  }

  function onEachFeature(feature: any, layer: any) {
    if (feature.properties) {
      const { NAME_0, VARNAME_3 } = feature.properties;
      layer.bindPopup(`${VARNAME_3}, ${NAME_0}`);
    }
  }

  function fitBounds(layer: any) {
    console.log("#########FIT BOUNDS");
    if (centerLayer) {
      map.fitBounds(layer.getBounds());
    } else {
      map.setView([mapCenter.lat, mapCenter.long], defaultZoom);
    }
    //updateCenter(mapCenter.lat, mapCenter.long);
    //updateZoom(map.getZoom());
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  useEffect(() => {
    const layer = layerRef.current;
    if (map && layer) {
      fitBounds(layer);
    }
  }, [props.centerLayer]);

  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
}
