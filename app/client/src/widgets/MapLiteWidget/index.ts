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
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;
