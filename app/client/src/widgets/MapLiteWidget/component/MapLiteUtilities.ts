/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */

import * as t from "topojson-client";
import L, { Layer, LayerGroup } from "leaflet";
import bbox from "@turf/bbox";
import { getMarkerStyle, setFeatureStyle } from "./StyleUtilities";

export function addData(
  key: string,
  features: any,
  layerGroup: LayerGroup,
  urlsMap: Map<string, any>,
  style?: any,
) {
  if (features?.type === "Topology") {
    const f = [];
    for (const key of Object.keys(features.objects)) {
      const g = t.feature(features, features.objects[key]);
      f.push(g);
    }
    features = f;
  }
  let option = {
    onEachFeature: (feature: any, layer: any) => onEachFeature(feature, layer),
  };
  if (style) {
    option = {
      ...option,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style: (feature: any, layer: any) => setFeatureStyle(feature, style),
      pointToLayer: (feature: any, latlng: any) =>
        getMarkerStyle(feature, latlng, style),
    };
  }
  const layer = L.geoJSON(features, option);

  layer.addTo(layerGroup);
  urlsMap.set(key, layer);
}

export function fitBound(layerGroup: LayerGroup, map: any) {
  if (layerGroup.getLayers().length > 0) {
    const bounds: number[] = bbox(layerGroup.toGeoJSON());
    map.fitBounds([
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
    ]);
  }
}

function onEachFeature(feature: any, layer: any) {
  let properties = "";
  for (const property of Object.keys(feature.properties)) {
    properties += property + ":" + feature.properties[property] + "<br />";
  }
  if (feature.properties) {
    layer.bindPopup(properties);
  }
}
