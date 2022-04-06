import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import MapLiteComponent from "../component";
import {
  ValidationResponse,
  ValidationTypes,
} from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "../../../utils/autocomplete/TernServer";

/**
 * Validation rules:
 * 1. This property will take the value in the following format: Array<{ "label": "string", "value": "string" | number}>
 * 2. The `value` property should consists of unique values only.
 * 3. Data types of all the value props should be the same.
 */
function optionsCustomUrlValidations(
  options: unknown,
  props: any,
  _: any,
): ValidationResponse {
  const validationUtil = (
    options: { label: string; value: string | number }[],
    _: any,
  ) => {
    let _isValid = true;
    let message = "";
    let valueType = "";
    const uniqueLabels: Record<string | number, string> = {};

    for (let i = 0; i < options.length; i++) {
      const { label, value } = options[i];
      if (!valueType) {
        valueType = typeof value;
      }
      //Checks the uniqueness all the values in the options
      if (!uniqueLabels.hasOwnProperty(value)) {
        uniqueLabels[value] = "";
      } else {
        _isValid = false;
        message = "path:value must be unique. Duplicate values found";
        break;
      }

      //Check if the required field "label" is present:
      if (!label) {
        _isValid = false;
        message =
          "Invalid entry at index: " + i + ". Missing required key: label";
        break;
      }

      //Validation checks for the the label.
      if (
        _.isNil(label) ||
        label === "" ||
        (typeof label !== "string" && typeof label !== "number")
      ) {
        _isValid = false;
        message =
          "Invalid entry at index: " +
          i +
          ". Value of key: label is invalid: This value does not evaluate to type string";
        break;
      }

      //Check if all the data types for the value prop is the same.
      if (typeof value !== valueType) {
        _isValid = false;
        message = "All value properties in options must have the same type";
        break;
      }

      //Check if the each object has value property.
      if (_.isNil(value)) {
        _isValid = false;
        message =
          'This value does not evaluate to type Array<{ "label": "string", "value": "string" | number }>';
        break;
      }
    }

    return {
      isValid: _isValid,
      parsed: _isValid ? options : [],
      messages: [message],
    };
  };

  const invalidResponse = {
    isValid: false,
    parsed: [],
    messages: [
      'This value does not evaluate to type Array<{ "label": "string", "value": "string" | number }>',
    ],
  };
  try {
    if (_.isString(options)) {
      options = JSON.parse(options as string);
    }

    if (Array.isArray(options)) {
      return validationUtil(options, _);
    } else {
      return invalidResponse;
    }
  } catch (e) {
    return invalidResponse;
  }
}

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
          {
            propertyName: "fitBoundGeojson",
            label: "Center Map",
            controlType: "SWITCH",
            helpText: "Center the map on layer",
            isBindProperty: true,
            isTriggerProperty: false,
            isJsConvertible: true,
          },
        ],
      },
      {
        sectionName: "Url",
        children: [
          {
            helpText: "Displays a list of unique options",
            propertyName: "urls",
            label: "Options",
            controlType: "OPTION_INPUT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: optionsCustomUrlValidations,
                expected: {
                  type: 'Array<{ "url": "string"}>',
                  example: `[{"url": ""}]`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
        ],
      },
    ];
  }

  componentDidUpdate(prevProps: MapLiteWidgetProps) {
    /*    if (
      JSON.stringify(prevProps.mapCenter) !==
      JSON.stringify(this.props.mapCenter)
    ) {
      this.props.updateWidgetMetaProperty("mapCenter", this.props.mapCenter);
      return;
    }
    console.log("###################componentDidUpdate");
    console.log("###################" + this.props.zoom);*/
  }

  updateCenter = (lat: number, long: number) => {
    this.props.updateWidgetMetaProperty("mapCenter", { lat, long });
  };

  updateZoom = (zoom: number) => {
    this.props.updateWidgetMetaProperty("zoom", zoom);
  };

  getPageView() {
    return (
      <MapLiteComponent
        fitBoundGeojson={this.props.fitBoundGeojson}
        geoJsonData={this.props.geoJsonData}
        mapCenter={this.props.mapCenter}
        updateCenter={this.updateCenter}
        updateZoom={this.updateZoom}
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
export interface MapLiteWidgetProps extends WidgetProps {
  zoom: number;
  mapCenter: {
    lat: number;
    long: number;
  };
  geoJsonData: any;
  fitBoundGeojson: boolean;
  urls: string[];
}

export default MapLiteWidget;
