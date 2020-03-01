import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";

export type ResultProps = {
    wordScoreMap: { [key: string]: number }
}

function Result({ wordScoreMap }: ResultProps) {
    let finalScore: number = 0;
    return (
        <>
            <div>Result</div>
            <ul>
                {Object.keys(wordScoreMap).map(word => {
                    finalScore += wordScoreMap[word];
                    return (
                        <li key={word}>{word} : {wordScoreMap[word]}</li>
                    );
                })}
            </ul>
            <div>Total Score: {finalScore}</div>
        </>
    );

}

const mapStateToProps = (state: AppState) => {
    return {
        wordScoreMap: state.score.wordScoreMap
    }
}

const ResultConnected = connect(
    mapStateToProps
)(Result)
export default ResultConnected
