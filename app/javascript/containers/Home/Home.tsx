import React from "react";
import Board from "../../components/Board/Board";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { initializeNewBoard } from "../../store/thunks";


export type HomeProps = {
    board: string[][];
    wordList: string[];
    thunkInitializeBoard: any
}

class Home extends React.Component<HomeProps> {

    componentDidMount() {
        this.props.thunkInitializeBoard();
    }

    reset() {
        // Time and score reset
    }

    newGame() {

    }

    render() {
        return (
            <div>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.newGame}>New Game</button>
                <Board board={this.props.board}></Board>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        board: state.board.board,
        wordList: state.score.wordList
    }
}

const HomeConnected = connect(
    mapStateToProps,
    { thunkInitializeBoard: initializeNewBoard }
)(Home)
export default HomeConnected