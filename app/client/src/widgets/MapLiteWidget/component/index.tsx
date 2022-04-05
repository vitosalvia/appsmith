import React, { useCallback, useEffect, useState } from "react";
import {
  ImageOverlay,
  MapContainer,
  TileLayer,
  useMapEvents,
  WMSTileLayer,
} from "react-leaflet";
import GeoJsonData from "./GeoJsonData";

export interface MapEventProps {
  updateCenter: (lat: number, long: number) => void;
  updateZoom: (zoom: number) => void;
  map: any;
}

export interface UpdateMapProps {
  mapCenter: {
    lat: number;
    long: number;
  };
  zoom: number;
  map: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapLiteComponentProps {
  widgetId: string;
  zoom: number;
  mapCenter: {
    lat: number;
    long: number;
  };
  geojson: any;
  fitBoundGeojson: boolean;
  updateCenter: (lat: number, long: number) => void;
  updateZoom: (zoom: number) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function MapEvents({ props }) {
  const map = props.map;
  const onMoveEnd = useCallback(() => {
    map.invalidateSize();
  }, [map]);
  useEffect(() => {
    map.on("moveend", onMoveEnd);
  }, [map, onMoveEnd]);
  return null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function ViewMap({ props }) {
  if (props.map) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    props.map.setView([props.mapCenter.lat, props.mapCenter.long], props.zoom);
  }
  return null;
}

class MapLiteComponent extends React.Component<MapLiteComponentProps> {
  constructor(props: MapLiteComponentProps) {
    super(props);
    this.state = {
      map: null,
      defaultZoom: props.zoom,
    };
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultZoom = this.state.defaultZoom;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const map = this.state.map;
    const updateMapProps: UpdateMapProps = {
      mapCenter: this.props.mapCenter,
      zoom: this.props.zoom,
      map: map,
    };
    const mapEventProps: MapEventProps = {
      updateCenter: this.props.updateCenter,
      updateZoom: this.props.updateZoom,
      map: map,
    };

    return (
      <MapContainer
        center={[this.props.mapCenter.lat, this.props.mapCenter.long]}
        id="mapLiteWidget"
        scrollWheelZoom={false}
        whenCreated={(theMap: any) => this.setState({ map: theMap })}
        zoom={this.props.zoom}
      >
        <TileLayer
          attribution='<a target="_blank" rel="noopener" href="https://www.imaa.cnr.it/" title="CNR IMAA"> MapLite CNR IMAA </> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!this.props.geojson ? <ViewMap props={updateMapProps} /> : null}
        {map ? <MapEvents props={mapEventProps} /> : null}
        {this.props.geojson ? (
          <GeoJsonData
            centerLayer={this.props.fitBoundGeojson}
            data={this.props.geojson}
            defaultZoom={defaultZoom}
            map={map}
            mapCenter={this.props.mapCenter}
            updateCenter={this.props.updateCenter}
            updateZoom={this.props.updateZoom}
            zoom={this.props.zoom}
          />
        ) : null}

        {/*        <WMSTileLayer
          layers={"topp:states"}
          url="https://ahocevar.com/geoserver/wms"
        />*/}
      </MapContainer>
    );
  }
}

export default MapLiteComponent;
