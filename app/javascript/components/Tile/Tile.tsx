import React from "react";
import "./Tile.css"

export type TileProp = {
    letter: string
}

export default function Tile({ letter }: TileProp) {

    return (
        <div className="tile-container">
            <span className="letter-span">{letter}</span>
        </div>
    );
}