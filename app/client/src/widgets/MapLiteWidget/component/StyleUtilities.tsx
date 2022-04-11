/**
 * @author Vito Salvia - CNR IMAA geoSDI Group
 * @email vito.salvia@gmail.com
 */

import L from "leaflet";

export function setFeatureStyle(feature: any, styles: any) {
  const theStyle: any = {};
  for (const p of styles) {
    searchStyle(
      p,
      feature,
      (values: any, property: any) =>
        (theStyle[property] = checkNumber(values)),
    );
  }
  return theStyle;
}

export function getMarkerStyle(feature: any, latlng: any, styles: any): any {
  const markerStyle = {
    shadowUrl: "",
    iconAnchor: [12, 12],
    iconFunction: (feature: any, latlng: any, styles: any) => {
      const theStyle: any = {};
      styles.forEach((p: any) => {
        searchStyle(
          p,
          feature,
          (values: any, property: any) =>
            (theStyle[property] = checkNumber(values)),
        );
      });
      if (theStyle["icon"]) {
        /*        "https://dev.appsmith.com" +
        theStyle.icon.replace("url(.", "").replace(")", ""),*/
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new L.marker([latlng.lat, latlng.lng], {
          icon: L.icon({
            iconUrl: theStyle.icon.replace("url(", "").replace(")", ""),
            shadowUrl: "",
            iconSize: theStyle.size,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            iconAnchor: markerStyle.iconAnchor,
          }),
        });
      } else if (theStyle["divIcon"]) {
        return L.marker(latlng, {
          icon: L.divIcon({ html: theStyle["divIcon"] }),
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new L.circleMarker(latlng, theStyle);
      }
    },
  };
  return styles
    ? markerStyle.iconFunction.call(markerStyle, feature, latlng, styles)
    : L.marker([latlng.lat, latlng.lng]);
}

/**
 *
 * @param styleProperty
 * @param feature
 * @param f1
 */
function searchStyle(styleProperty: any, feature: any, f1: any) {
  for (const [key, value] of Object.entries(feature.properties)) {
    if (styleProperty["propertyKey"] === key) {
      Array.from(styleProperty["properties"]).forEach((p: any) => {
        const customStyle = p["values"].filter((v: any) => v["key"] === value);
        const allStyle = p["values"].filter((v: any) => v["key"] === "*");
        if (customStyle.length > 0) {
          f1(customStyle[0].value, p.property);
        } else if (allStyle.length > 0) {
          f1(allStyle[0].value, p.property);
        }
      });
    }
  }
}

/**
 *
 * @param value
 */
function checkNumber(value: any) {
  return isNaN(Number(value)) ? value : +value;
}
