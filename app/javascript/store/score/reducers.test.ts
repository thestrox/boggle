import { scoreReducer } from "./reducers";
import { VALIDATION_SUCCESS, VALIDATION_FAILURE } from "./types";

describe("score reducer", () => {
  it("should return the initial state", () => {
    expect(
      scoreReducer(undefined, {
        type: undefined
      })
    ).toEqual({
      wordScoreMap: {}
    });
  });

  it("should handle VALIDATION_SUCCESS", () => {
    expect(
      scoreReducer(
        {
          wordScoreMap: {}
        },
        {
          type: VALIDATION_SUCCESS,
          word: "one",
          score: 3
        }
      )
    ).toEqual({
        wordScoreMap: {"ONE": 3}
    });

    expect(
        scoreReducer(
          {
            wordScoreMap: {"THREE": 4}
          },
          {
            type: VALIDATION_SUCCESS,
            word: "one",
            score: 3
          }
        )
      ).toEqual({
          wordScoreMap: {"ONE": 3, "THREE": 4 }
      });
  });
});
