import Widget from "./widget";
import IconSVG from "./icon.svg";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "MapLite", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  needsMeta: true, // Defines if this widget adds any meta properties
  defaults: {
    widgetName: "MapLite",
    rows: 40,
    columns: 24,
    version: 1,
    zoom: 5,
    mapCenter: { lat: 41.34, long: 12.6 },
    animateLoading: true,
    urls: [{ url: "" }],
    defaultOptionValue: "Y",
    /*    geoJsonData: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            Nome: "Villa Literno, Stazione ferroviaria, Piazza de Gasperi",
            Località:
              "Napoli - Chiaiano, Napoli - Arenella, Giugliano in Campania",
            Mezzo_di_t: "Treno",
            Group_ID: "Mezzo_di_t",
          },
          geometry: {
            type: "Point",
            coordinates: [14.067446999999834, 41.00558000000363],
          },
          id: "3fad5493-17b3-4327-810c-067fbad421c2",
        },
        {
          type: "Feature",
          properties: {
            Nome: "Aversa, Stazione ferroviaria, Piazza Mazzini",
            Località: "Quarto",
            Mezzo_di_t: "Treno",
            Group_ID: "Mezzo_di_t",
          },
          geometry: {
            type: "Point",
            coordinates: [14.217972379999905, 40.973203410003606],
          },
          id: "ac6839bf-7350-430c-9021-e435fdfb3197",
        },
      ],
    },*/
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;
