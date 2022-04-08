import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import MapLiteComponent, { MapLiteComponentProps } from "../component";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";

class MapLiteWidget extends BaseWidget<MapLiteWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "zoom",
            label: "Zoom",
            controlType: "STEP",
            helpText: "Changes the default zoom of the map",
            isBindProperty: true,
            isTriggerProperty: false,
            isJsConvertible: false,
          },
          {
            propertyName: "mapCenter",
            label: "Initial location",
            helpText: "Changes the map center",
            isJSConvertible: true,
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.OBJECT,
              params: {
                allowedKeys: [
                  {
                    name: "lat",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -90,
                      max: 90,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "long",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -180,
                      max: 180,
                      default: 0,
                      required: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        sectionName: "DataSource",
        children: [
          {
            propertyName: "datasource",
            helpText: "DataSource",
            label: "",
            controlType: "INPUT_TEXT",
            placeholderText: "Name:",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
        ],
      },
      {
        sectionName: "GeoJson",
        children: [
          {
            helpText: "Populates the map with the geojson/topojson",
            propertyName: "geoJsonData",
            label: "Data",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.OBJECT,
              params: {
                allowedKeys: [
                  {
                    name: "type",
                    type: ValidationTypes.TEXT,
                  },
                  {
                    name: "features",
                    type: ValidationTypes.ARRAY,
                  },
                ],
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
        ],
      },
      {
        sectionName: "Url",
        children: [
          {
            helpText: "Geojson Urls",
            propertyName: "urls",
            controlType: "GROUP_BUTTONS",
            label: "",
            isBindProperty: false,
            isTriggerProperty: false,
            panelConfig: {
              editableTitle: true,
              titlePropertyName: "label",
              panelIdPropertyName: "id",
              updateHook: (
                props: any,
                propertyPath: string,
                propertyValue: string,
              ) => {
                return [
                  {
                    propertyPath,
                    propertyValue,
                  },
                ];
              },
              children: [
                {
                  sectionName: "General",
                  children: [
                    {
                      propertyName: "value",
                      helpText: "Sets the url",
                      label: "Url",
                      controlType: "INPUT_TEXT",
                      placeholderText: "Enter url",
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ];
  }

  getPageView() {
    return (
      <MapLiteComponent
        datasource={this.props.datasource}
        geoJsonData={this.props.geoJsonData}
        mapCenter={this.props.mapCenter}
        urls={this.props.urls}
        widgetId={this.props.widgetId}
        zoom={this.props.zoom}
      />
    );
  }

  static getWidgetType(): string {
    return "MAPLITE_WIDGET";
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapLiteWidgetProps
  extends MapLiteComponentProps,
    WidgetProps {}

export default MapLiteWidget;
