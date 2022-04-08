/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React from "react";
import L, { LayerGroup } from "leaflet";
import * as t from "topojson-client";
import bbox from "@turf/bbox";

export interface GeoJsonDataProps {
  defaultZoom: number;
  features: any;
  map: any;
  mapCenter: {
    lat: number;
    long: number;
  };
  featureUrls: any[];
}

export default class GeoJsonData extends React.Component<GeoJsonDataProps> {
  private layerGroup: LayerGroup;
  private urlsMap: Map<string, any> = new Map();
  constructor(props: GeoJsonDataProps) {
    super(props);
    this.layerGroup = L.layerGroup();
    this.layerGroup.addTo(props.map);
  }

  addData(key: string, features: any) {
    if (features?.type === "Topology") {
      const f = [];
      for (const key of Object.keys(features.objects)) {
        const g = t.feature(features, features.objects[key]);
        f.push(g);
      }
      features = f;
    }
    const layer = L.geoJSON(features, {
      /*    style: (feature: any, layer: any) => setFeatureStyle(feature, style),
        pointToLayer: (feature, latlng) => getMarkerStyle(feature, latlng, style),*/
      onEachFeature: (feature, layer) => this.onEachFeature(feature, layer),
    });
    layer.addTo(this.layerGroup);
    this.urlsMap.set(key, layer);
  }

  componentDidMount() {
    this.addLayers();
  }

  componentDidUpdate(prevProps: GeoJsonDataProps) {
    if (prevProps.features !== this.props.features) {
      if (this.urlsMap.has("features")) {
        this.layerGroup.removeLayer(this.urlsMap.get("features"));
        this.urlsMap.delete("features");
      }
      if (this.props.features) {
        this.addData("features", this.props.features);
      }
    }
    const layersToAdd: string[] = this.props.featureUrls.filter(
      (item) => prevProps.featureUrls.indexOf(item) < 0,
    );
    const layersToRemove: string[] = prevProps.featureUrls.filter(
      (item) => this.props.featureUrls.indexOf(item) < 0,
    );
    //added new urls
    if (layersToAdd.length > 0) {
      this.addDataFromUrl(layersToAdd);
    }
    // removed urls
    else if (layersToRemove.length > 0) {
      layersToRemove.forEach((u: string) => {
        this.layerGroup.removeLayer(this.urlsMap.get(u));
        this.urlsMap.delete(u);
      });
    }
    this.fitBound();
  }

  onEachFeature(feature: any, layer: any) {
    let properties = "";
    for (const property of Object.keys(feature.properties)) {
      properties += property + ":" + feature.properties[property] + "<br />";
    }
    if (feature.properties) {
      layer.bindPopup(properties);
    }
  }

  addDataFromUrl(featuresUrls: string[]) {
    Promise.all(
      featuresUrls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((resp) => {
            this.addData(url, resp);
          }),
      ),
    ).then(() => {
      this.fitBound();
    });
  }

  fitBound() {
    if (this.layerGroup.getLayers().length > 0) {
      const bounds: number[] = bbox(this.layerGroup.toGeoJSON());
      this.props.map.fitBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]],
      ]);
    }
  }

  addLayers() {
    if (this.props.features) {
      this.addData("features", this.props.features);
    }
    this.addDataFromUrl(this.props.featureUrls);
  }

  render() {
    return null;
  }
}
