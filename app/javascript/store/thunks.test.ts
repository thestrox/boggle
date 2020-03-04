import thunk, { ThunkDispatch } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import { NEW_BOARD, VALIDATE } from "../shared/constants/endpoints";
import { INITIALIZE_BOARD } from "./board/types";
import { initializeNewBoard, validateWord } from "./thunks";
import { AppState } from ".";
import { Action } from "redux";
import { ValidateRequest } from "../shared/types/api-types";
import { VALIDATION_SUCCESS } from "./score/types";

const middlewares = [thunk];
type DispatchExts = ThunkDispatch<AppState, unknown, Action<string>>;

const mockStore = configureMockStore<AppState, DispatchExts>(middlewares);

describe("thunks actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates InitializeBoardAction when fetching the new board has been success", () => {
    const board = [[], [], [], []];
    const duration = 1000;
    const gameStartDate = 123456789;
    spyOn(Date, "now").and.returnValue(gameStartDate);
    fetchMock.getOnce(NEW_BOARD, {
      body: { success: true, message: "Success", data: { board, duration } },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: INITIALIZE_BOARD,
        board,
        duration,
        gameStartDate
      }
    ];

    const store = mockStore();

    store
      .dispatch(initializeNewBoard())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(e => fail(e));
  });

  it("fails to create InitializeBoardAction due to unsuccessful fetching of new board", () => {
    fetchMock.getOnce(NEW_BOARD, {
      body: { success: false, message: "Failure", data: null },
      headers: { "content-type": "application/json" }
    });

    const store = mockStore();

    store
      .dispatch(initializeNewBoard())
      .then(() => {
        expect(store.getActions()).toHaveLength(0);
      })
      .catch(e => fail(e));
  });

  it("creates ValidationSuccessAction with score 3 when validating word 'one'", () => {
    const word = "one";
    const score = 3;
    const body: ValidateRequest = { board: [[]], word };
    fetchMock.postOnce(VALIDATE, {
      body: { success: true, message: "Success", data: { score } },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: VALIDATION_SUCCESS,
        word,
        score
      }
    ];

    const store = mockStore({
      board: null,
      score: {
        wordScoreMap: {}
      }
    });

    store
      .dispatch(validateWord(body))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(e => fail(e));
  });

  it("fails to create ValidationSuccessAction when reponse has null score during validation of word", () => {
    const word = "onp";
    const body: ValidateRequest = { board: [[]], word };
    fetchMock.postOnce(VALIDATE, {
      body: { success: true, message: "Invalid Word", data: { score: null } },
      headers: { "content-type": "application/json" }
    });

    const store = mockStore();

    store
      .dispatch(validateWord(body))
      .then(() => {
        expect(store.getActions()).toHaveLength(0);
      })
      .catch(e => fail(e));
  });

  it("fails to create ValidationSuccessAction with unsuccess reponse when validating word", () => {
    const word = "one";
    const body: ValidateRequest = { board: [[]], word };
    fetchMock.postOnce(VALIDATE, {
      body: { success: false, message: "Invalid Word", data: { score: null } },
      headers: { "content-type": "application/json" }
    });

    const store = mockStore();

    store
      .dispatch(validateWord(body))
      .then(() => {
        expect(store.getActions()).toHaveLength(0);
      })
      .catch(e => fail(e));
  });
});
