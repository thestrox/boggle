import React from "react";
import "./Tile.css"

export type TileProp = {
    letter: string,
    onClick: () => void
}

export default function Tile({ letter, onClick }: TileProp) {

    return (
        <div onClick={onClick} className="tile-container">
            <span className="letter-span">{letter}</span>
        </div>
    );
}