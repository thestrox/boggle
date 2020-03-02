import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css"

export type BoardProps = {
    board: string[][],
    className: string,
    onTileClick: (row: number, col: number) => void
}

export default function Board({ board, className, onTileClick }: BoardProps) {

    return (
        <div className={`board ${className}`}>
            {board.map((row, rowIndex) => {
                return (
                    <div className="board-row" key={rowIndex}>
                        {row.map((letter, colIndex) => {
                            return (<Tile key={colIndex} onClick={onTileClick.bind(this, rowIndex, colIndex)} letter={letter} />);
                        })}
                    </div>
                );
            })}
        </div >
    );

}