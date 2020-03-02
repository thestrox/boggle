import React from "react";
import "./WordList.css"
import { List, ListItem, Divider } from "@material-ui/core";

export type WordListProp = {
    wordScoreMap: { [key: string]: number },
    className?: string
}

export default function WordList({ wordScoreMap, className }: WordListProp) {

    return (
        <List className={`wordlist ${className}`}>
            {Object.keys(wordScoreMap).map(word => {
                return (
                    <React.Fragment key={word}>
                        <ListItem className="wordlist-item" >
                            <span>{word}:</span>
                            <span>{wordScoreMap[word]}</span>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                );
            })}
        </List>
    )
}