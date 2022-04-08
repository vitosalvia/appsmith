import React, { useCallback, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapGeoJsonData from "./MapGeoJsonData";
import MapGeoJsonUrlsData from "./MapGeoJsonUrlsData";
import L, { LayerGroup } from "leaflet";

export interface MapEventProps {
  map: any;
}

export interface UpdateMapProps extends MapEventProps {
  mapCenter: {
    lat: number;
    long: number;
  };
  zoom: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapLiteComponentProps {
  widgetId: string;
  zoom: number;
  mapCenter: {
    lat: number;
    long: number;
  };
  geoJsonData: any;
  datasource: string;
  urls: Record<
    string,
    {
      value: string;
    }
  >;
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
  layerGroup: LayerGroup;
  private urlsMap: Map<string, any> = new Map();
  constructor(props: MapLiteComponentProps) {
    super(props);
    this.state = {
      map: null,
      defaultZoom: props.zoom,
    };
    this.layerGroup = L.layerGroup();
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const map = this.state.map;
    const updateMapProps: UpdateMapProps = {
      mapCenter: this.props.mapCenter,
      zoom: this.props.zoom,
      map: map,
    };
    const mapEventProps: MapEventProps = {
      map: map,
    };

    let featureUrls: string[] = [];

    (Object.keys(this.props.urls) as Array<any>).forEach((f) => {
      if (this.props.urls[f]?.value) {
        featureUrls = [this.props.urls[f]?.value, ...featureUrls];
      }
    });
    return (
      <MapContainer
        center={[this.props.mapCenter.lat, this.props.mapCenter.long]}
        id="mapLiteWidget"
        scrollWheelZoom={false}
        whenCreated={(theMap: any) => {
          this.setState({ map: theMap });
          if (theMap) {
            this.layerGroup.addTo(theMap);
          }
        }}
        zoom={this.props.zoom}
      >
        <TileLayer
          attribution='<a target="_blank" rel="noopener" href="https://www.imaa.cnr.it/" title="CNR IMAA"> MapLite CNR IMAA </> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.geoJsonData || featureUrls ? (
          <ViewMap props={updateMapProps} />
        ) : null}
        {map ? <MapEvents props={mapEventProps} /> : null}
        {map && this.props.geoJsonData ? (
          <MapGeoJsonData
            features={this.props.geoJsonData}
            layerGroup={this.layerGroup}
            map={map}
            urlsMap={this.urlsMap}
          />
        ) : null}
        {map && featureUrls ? (
          <MapGeoJsonUrlsData
            featureUrls={featureUrls}
            layerGroup={this.layerGroup}
            map={map}
            urlsMap={this.urlsMap}
          />
        ) : null}
        {/*        <WMSTileLayer
          layers={"topp:states"}
          format
          url="https://ahocevar.com/geoserver/wms"
        />*/}
      </MapContainer>
    );
  }
}

export default MapLiteComponent;
