import { INITIALIZE_BOARD } from "./types";
import { initializeBoard } from "./actions";

describe('actions creation', () => {
    it('should create an action to initialize board', () => {
        const board = [
            ["a", "b", "c", "d"], 
            ["e", "f", "g", "h"], 
            ["i", "j", "k", "l"], 
            ["m", "n", "o", "p"]
        ];
        const duration = 10000;
        const gameStartDate = 123456789
        spyOn(Date, 'now').and.returnValue(gameStartDate);


        const expectedAction = {
            type: INITIALIZE_BOARD,
            board,
            duration,
            gameStartDate
        }
        expect(initializeBoard(board, duration)).toEqual(expectedAction);
    });
})