import { createReducer } from "utils/AppsmithUtils";
import {
  ReduxAction,
  ReduxActionTypes,
  UpdateCanvasPayload,
} from "constants/ReduxActionConstants";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import { UpdateCanvasLayoutPayload } from "actions/controlActions";

const initialState: MainCanvasReduxState = {
  width: 0,
  height: 0,
};

const mainCanvasReducer = createReducer(initialState, {
  [ReduxActionTypes.INIT_CANVAS_LAYOUT]: (
    state: MainCanvasReduxState,
    action: ReduxAction<UpdateCanvasPayload>,
  ) => {
    const mainCanvas =
      action.payload.widgets &&
      action.payload.widgets[MAIN_CONTAINER_WIDGET_ID];

    return {
      width: mainCanvas?.rightColumn || state.width,
      height: mainCanvas?.minHeight || state.height,
    };
  },
  [ReduxActionTypes.UPDATE_CANVAS_LAYOUT]: (
    state: MainCanvasReduxState,
    action: ReduxAction<UpdateCanvasLayoutPayload>,
  ) => {
    return {
      width: action.payload.width || state.width,
      height: action.payload.height || state.height,
    };
  },
});

export interface MainCanvasReduxState {
  width: number;
  height: number;
}

export default mainCanvasReducer;
