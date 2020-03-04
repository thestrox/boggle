import { VALIDATION_FAILURE, VALIDATION_SUCCESS } from "./types";
import { validatationFail, validatationSuccess } from "./actions";

describe('actions creation', () => {
    it('should create an action for word validation failure', () => {
        const word = "one";
        const expectedAction = {
            type: VALIDATION_FAILURE,
            word
        }
        expect(validatationFail(word)).toEqual(expectedAction);
    });

    it('should create an action for word validation success', () => {
        const word = "one";
        const score = 3;
        const expectedAction = {
            type: VALIDATION_SUCCESS,
            word,
            score
        }
        expect(validatationSuccess(word, score)).toEqual(expectedAction);
    });
})