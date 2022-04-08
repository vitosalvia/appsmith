/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */
import React from "react";
import { LayerGroup } from "leaflet";
import { addData } from "./MapLiteUtilities";

export interface GeoJsonDataProps {
  features: any;
  map: any;
  layerGroup: LayerGroup;
  urlsMap: Map<string, any>;
}

export default class MapGeoJsonData extends React.Component<GeoJsonDataProps> {
  constructor(props: GeoJsonDataProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.features) {
      addData(
        "features",
        this.props.features,
        this.props.layerGroup,
        this.props.urlsMap,
      );
    }
  }

  componentDidUpdate(prevProps: GeoJsonDataProps) {
    if (prevProps.features !== this.props.features) {
      if (this.props.urlsMap.has("features")) {
        this.props.layerGroup.removeLayer(this.props.urlsMap.get("features"));
        this.props.urlsMap.delete("features");
      }
      if (this.props.features) {
        addData(
          "features",
          this.props.features,
          this.props.layerGroup,
          this.props.urlsMap,
        );
      }
    }
  }

  render() {
    return null;
  }
}
