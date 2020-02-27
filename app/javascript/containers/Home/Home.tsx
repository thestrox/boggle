import React from "react";
import Board from "../../components/Board/Board";
import { connect } from "react-redux";
import { AppState, AppThunk } from "../../store";
import { initializeNewBoard, validateWord } from "../../store/thunks";
import WordList from "../../components/WordList/WordList";
import { ValidateRequest } from "../../shared/types/api-types";
import { toast } from "react-toastify";

export type HomeProps = {
    board: string[][];
    wordScoreMap: { [key: string]: number }
    initializeNewBoard: () => AppThunk,
    validateWord: (validateRequestBody: ValidateRequest) => AppThunk
}

export type HomeState = {
    currentWord: string;
}

class Home extends React.Component<HomeProps, HomeState> {

    componentDidMount() {
        this.props.initializeNewBoard();
    }

    reset() {
        // Time and score reset
    }

    newGame = () => {
        this.props.initializeNewBoard();
    }

    validateWord = () => {
        if (this.props.wordScoreMap[this.state.currentWord]) {
            toast.error('Duplicate word. Please try again.');
        } else {
            this.props.validateWord({ board: this.props.board, word: this.state.currentWord });
        }
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateCurrentWord(event.target.value);
    }

    updateCurrentWord = (word: string) => {
        this.setState({ currentWord: word });
    }

    keyPress = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") {
            this.validateWord();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.newGame}>New Game</button>
                <Board board={this.props.board}></Board>
                <input
                    onChange={this.onChange}
                    onKeyPress={this.keyPress}
                    placeholder="Type a suitable word"
                />
                <WordList wordScoreMap={this.props.wordScoreMap}></WordList>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        board: state.board.board,
        wordScoreMap: state.score.wordScoreMap
    }
}

const HomeConnected = connect(
    mapStateToProps,
    { initializeNewBoard: initializeNewBoard, validateWord: validateWord }
)(Home)
export default HomeConnected