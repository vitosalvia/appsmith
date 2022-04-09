/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React from "react";
import L, { LayerGroup } from "leaflet";
import * as t from "topojson-client";
import bbox from "@turf/bbox";
import { addData } from "./MapLiteUtilities";

export interface LayerDataSourceProps {
  map: any;
  datasource: string;
  layerGroup: LayerGroup;
  urlsMap: Map<string, any>;
}

export interface FeatureCollection {
  type: string;
  features: FeatureGeoJson[];
}

export interface FeatureGeoJson {
  type: string;
  properties: string;
  geometry: {
    type: string;
    coordinates: any[];
  };
}

export default class LayerDataSource extends React.Component<
  LayerDataSourceProps
> {
  constructor(props: LayerDataSourceProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.datasource.trim() && this.props.datasource !== "{}") {
      addData(
        "datasource",
        this.createFeatures(),
        this.props.layerGroup,
        this.props.urlsMap,
      );
    }
  }

  componentDidUpdate(prevProps: LayerDataSourceProps) {
    if (this.props.datasource !== prevProps.datasource) {
      this.props.layerGroup.removeLayer(this.props.urlsMap.get("datasource"));
      this.props.urlsMap.delete("datasource");
      this.createFeatures();
    }
  }

  createFeatures(): any {
    let datasources: any[] = [];
    datasources = JSON.parse(this.props.datasource);
    const features: FeatureGeoJson[] = [];
    datasources.forEach((f: any) => {
      /*      for (const key of Object.keys(f)) {
        console.log("KEY: " + key);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log("VALUE: " + f[key]);
      }*/
      const tmpFeature: FeatureGeoJson = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [f.lon, f.lat],
        },
        properties: f,
      };
      features.push(tmpFeature);
    });
    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: features,
    };
    return featureCollection;
  }

  render() {
    return null;
  }
}
