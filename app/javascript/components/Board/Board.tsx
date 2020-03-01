import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css"

export type BoardProps = {
    board: string[][],
    className: string
}

export default function Board({ board, className }: BoardProps) {

    return (
        <div className={`board ${className}`}>
            {board.map((row, index) => {
                return (
                    <div className="board-row" key={index}>
                        {row.map((letter, index) => {
                            return (<Tile key={index} letter={letter} />);
                        })}
                    </div>
                );
            })}
        </div >
    );

}