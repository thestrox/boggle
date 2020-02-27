import React from "react";

export type WordListProp = {
    wordScoreMap: { [key: string]: number }
}

export default function WordList({ wordScoreMap }: WordListProp) {

    return (
        <ul>
            {Object.keys(wordScoreMap).map(word => {
                return (
                    <li key={word}>{word} : {wordScoreMap[word]}</li>
                );
            })}
        </ul>
    )
}