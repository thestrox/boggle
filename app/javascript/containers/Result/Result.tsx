import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import WordList from "../../components/WordList/WordList";
import "./Result.css"
import { Button } from "@material-ui/core";
import { formatTimeDelta, calcTimeDelta, zeroPad } from "react-countdown";
import { Redirect } from "react-router-dom";
import { reset } from "../../store/common-actions";

export type ResultProps = {
    wordScoreMap: { [key: string]: number };
    gameStartDate: number;
    resetBoard: () => void;
}

export type ResultState = {
    toHome: boolean;
}

class Result extends React.Component<ResultProps, ResultState> {
    constructor(props: ResultProps) {
        super(props);
        this.state = {
            toHome: this.props.gameStartDate ? false: true
        };

    }

    toHome = () => {
        this.props.resetBoard();
        this.setState({ toHome: true })
    }

    render() {
        if (this.state.toHome) {
            return (
                <Redirect to='' />
            );
        }

        const values = Object.values(this.props.wordScoreMap)
        const totalScore = values.length > 0 
        ? values.reduce((p, c) => p + c) 
        : 0;

        const formatted = formatTimeDelta(calcTimeDelta(Date.now() - this.props.gameStartDate, { controlled: true }))

        return (
            <div className="result-container">
                <span>Your Result</span>
                <WordList wordScoreMap={this.props.wordScoreMap} className="scorelist-container"></WordList>
                <div className="total-container">
                    <span>Total Score:</span>
                    <span>{totalScore}</span>
                </div>
                <div className="time-container">
                    <span>Time Elapsed:</span>
                    <span>{zeroPad(formatted.minutes)}:{zeroPad(formatted.seconds)}</span>
                </div>
                <Button onClick={this.toHome} variant="contained" color="primary">Home</Button>

            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        wordScoreMap: state.score.wordScoreMap,
        gameStartDate: state.board.gameStartDate
    }
}

const ResultConnected = connect(
    mapStateToProps,
    {resetBoard: reset}
)(Result)
export default ResultConnected
