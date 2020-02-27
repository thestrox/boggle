import { VALIDATION_FAILURE, VALIDATION_SUCCESS } from "./types";

export function validatationFail(word: string) {
  return {
    type: VALIDATION_FAILURE,
    word: word
  };
}

export function validatationSuccess(word: string, score: number) {
  return {
    type: VALIDATION_SUCCESS,
    word: word,
    score: score
  };
}
