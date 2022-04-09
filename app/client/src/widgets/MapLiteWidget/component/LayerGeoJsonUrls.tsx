/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React from "react";
import L, { LayerGroup } from "leaflet";
import * as t from "topojson-client";
import bbox from "@turf/bbox";
import { addData } from "./MapLiteUtilities";

export interface GeoJsonDataUrlsProps {
  map: any;
  featureUrls: any[];
  layerGroup: LayerGroup;
  urlsMap: Map<string, any>;
}

export default class LayerGeoJsonUrls extends React.Component<
  GeoJsonDataUrlsProps
> {
  constructor(props: GeoJsonDataUrlsProps) {
    super(props);
  }

  componentDidMount() {
    this.addDataFromUrl(this.props.featureUrls);
  }

  componentDidUpdate(prevProps: GeoJsonDataUrlsProps) {
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
        this.props.layerGroup.removeLayer(this.props.urlsMap.get(u));
        this.props.urlsMap.delete(u);
      });
    }
  }

  addDataFromUrl(featuresUrls: string[]) {
    Promise.all(
      featuresUrls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((resp) => {
            addData(url, resp, this.props.layerGroup, this.props.urlsMap);
          }),
      ),
    );
  }

  render() {
    return null;
  }
}
