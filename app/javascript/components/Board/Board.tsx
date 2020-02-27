import React from "react";
import Tile from "../Tile/Tile";

export type BoardProps = {
    board: string[][]
}

export default function Board({ board }: BoardProps) {

    return (
        <div>
            {board.map((row, index) => {
                return (
                    <div key={index}>
                        {row.map((letter, index) => {
                            return (<Tile key={index} letter={letter} />);
                        })}
                    </div>
                );
            })}
        </div >
    );

}