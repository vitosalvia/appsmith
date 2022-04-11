/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React from "react";
import L, { LayerGroup } from "leaflet";
import * as t from "topojson-client";
import bbox from "@turf/bbox";
import { addData } from "./MapLiteUtilities";

export interface DataStyleInteface {
  url: string;
  style: string;
}

export interface GeoJsonDataUrlsProps {
  map: any;
  featureUrls: DataStyleInteface[];
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
    const urlsPrev = prevProps.featureUrls.map((f: DataStyleInteface) => f.url);
    const urls = this.props.featureUrls.map((f: DataStyleInteface) => f.url);

    const layersToAdd: DataStyleInteface[] = this.props.featureUrls.filter(
      (item: DataStyleInteface) => urlsPrev.indexOf(item.url) < 0,
    );
    const layersToRemove: DataStyleInteface[] = prevProps.featureUrls.filter(
      (item: DataStyleInteface) => urls.indexOf(item.url) < 0,
    );

    //added new urls
    if (layersToAdd.length > 0) {
      this.addDataFromUrl(layersToAdd);
    }
    // removed urls
    else if (layersToRemove.length > 0) {
      layersToRemove.forEach((f: DataStyleInteface) => {
        this.props.layerGroup.removeLayer(this.props.urlsMap.get(f.url));
        this.props.urlsMap.delete(f.url);
      });
    }
    const layersToUpdateStyle: DataStyleInteface[] = [];
    this.props.featureUrls.forEach((l: DataStyleInteface, index: number) => {
      if (prevProps.featureUrls[index].style !== l.style) {
        this.props.layerGroup.removeLayer(this.props.urlsMap.get(l.url));
        this.props.urlsMap.delete(l.url);
        layersToUpdateStyle.push(l);
      }
    });
    if (layersToUpdateStyle.length > 0) {
      this.addDataFromUrl(layersToUpdateStyle);
    }
  }

  addDataFromUrl(featuresUrls: DataStyleInteface[]) {
    featuresUrls.map((dataStyleInteface: DataStyleInteface) => {
      Promise.all([
        fetch(dataStyleInteface.url),
        dataStyleInteface.style ? fetch(dataStyleInteface.style) : null,
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2?.json()]))
        .then(([features, style]) =>
          addData(
            dataStyleInteface.url,
            features,
            this.props.layerGroup,
            this.props.urlsMap,
            style?.style_properties,
          ),
        );
    });
  }

  render() {
    return null;
  }
}
