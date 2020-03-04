import { boardReducer } from "./reducers";
import { INITIALIZE_BOARD } from "./types";
import { RESET_ACTION } from "../common-actions";

describe("board reducer", () => {
  it("should return the initial state", () => {
    expect(
      boardReducer(undefined, {
        type: undefined
      })
    ).toEqual({
      board: [[]],
      duration: null,
      gameStartDate: null
    });
  });

  it("should handle INITIALIZE_BOARD and return new board state", () => {
    expect(
      boardReducer(
        {
          board: null,
          duration: null,
          gameStartDate: null
        },
        {
          type: INITIALIZE_BOARD,
          board: [[]],
          duration: 1000,
          gameStartDate: 12345
        }
      )
    ).toEqual({
      board: [[]],
      duration: 1000,
      gameStartDate: 12345
    });
  });

  it("should change gameStartDate on RESET_ACTION", () => {
    spyOn(Date, "now").and.returnValue(3210);
    expect(
      boardReducer(
        {
          board: null,
          duration: 123,
          gameStartDate: 1234
        },
        {
          type: RESET_ACTION
        }
      )
    ).toEqual({
      board: null,
      duration: 123,
      gameStartDate: 3210
    });
  });
});
