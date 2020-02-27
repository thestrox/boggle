import thunkMiddleware, { ThunkAction } from "redux-thunk";

import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import { boardReducer } from "./board/reducers";
import { scoreReducer } from "./score/reducers";

const rootReducer = combineReducers({
  board: boardReducer,
  score: scoreReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
  return store;
}
