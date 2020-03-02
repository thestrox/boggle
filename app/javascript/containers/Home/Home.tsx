import React from "react";
import Board from "../../components/Board/Board";
import { connect } from "react-redux";
import { AppState, AppThunk } from "../../store";
import { initializeNewBoard, validateWord, resetBoard } from "../../store/thunks";
import WordList from "../../components/WordList/WordList";
import { ValidateRequest } from "../../shared/types/api-types";
import { toast } from "react-toastify";
import Countdown, { zeroPad } from "react-countdown";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import "./Home.css"
import { Input } from "@material-ui/core";

export type HomeProps = {
    board: string[][];
    wordScoreMap: { [key: string]: number }
    duration: number;
    gameStartDate: number;
    initializeNewBoard: () => AppThunk,
    validateWord: (validateRequestBody: ValidateRequest) => AppThunk
    resetBoard: () => AppThunk
}

export type HomeState = {
    currentWord: string;
    toResult: boolean;
};

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            currentWord: '',
            toResult: false
        };
    }

    componentDidMount() {
        this.props.initializeNewBoard();
    }

    reset = () => {
        this.props.resetBoard();
    }

    newGame = () => {
        this.props.initializeNewBoard();
    }

    endGame = () => {
        this.setState({
            toResult: true
        });
    }

    validateWord = () => {
        if (this.props.wordScoreMap[this.state.currentWord]) {
            toast.error('Duplicate word. Please try again.');
        } else {
            this.props.validateWord({ board: this.props.board, word: this.state.currentWord });
        }
        this.updateCurrentWord("");
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateCurrentWord(event.target.value);
    }

    updateCurrentWord = (word: string) => {
        this.setState({ currentWord: word.toUpperCase() });
    }

    keyPress = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") {
            this.validateWord();
        }
    }

    onTileClick = (row: number, col: number) => {
        this.updateCurrentWord(this.state.currentWord + this.props.board[row][col]);
    }

    render() {
        if (this.state.toResult) {
            return (
                <Redirect to='/result' />
            );
        }

        return (
            <div className="home-container">
                <div className="left-container">
                    <Input className="word-input"
                        value={this.state.currentWord}
                        onChange={this.onChange}
                        onKeyPress={this.keyPress}
                        placeholder="Type a suitable word"
                    />

                    <Board board={this.props.board} onTileClick={this.onTileClick} className="board-container"></Board>
                    <div className="button-wrapper">
                        <Button classes={{ root: 'submit-button' }} variant="contained" color="primary" onClick={this.validateWord}>Submit Word</Button>
                        <Button classes={{ root: 'end-button' }} variant="contained" color="default" onClick={this.endGame}>End Game</Button>
                    </div>

                </div>
                <div className="right-container">
                    {this.props.gameStartDate &&
                        <Countdown
                            date={this.props.gameStartDate + this.props.duration}
                            onComplete={this.endGame}
                            renderer={(props) => <span>{zeroPad(props.minutes)}:{zeroPad(props.seconds)}</span>}
                        />
                    }
                    <div>Results: </div>
                    <WordList wordScoreMap={this.props.wordScoreMap} className="wordlist-container"></WordList>
                    <div className="button-wrapper">
                        <Button classes={{ root: 'reset-button' }} variant="contained" onClick={this.reset}>Reset</Button>
                        <Button classes={{ root: 'new-button' }} variant="contained" onClick={this.newGame}>New Game</Button>
                    </div>


                </div>
            </div >
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        board: state.board.board,
        wordScoreMap: state.score.wordScoreMap,
        duration: state.board.duration,
        gameStartDate: state.board.gameStartDate,
    }
}

const HomeConnected = connect(
    mapStateToProps,
    {
        initializeNewBoard: initializeNewBoard,
        validateWord: validateWord,
        resetBoard: resetBoard
    }
)(Home)
export default HomeConnected