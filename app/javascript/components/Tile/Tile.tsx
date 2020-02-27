import React from "react";

export type TileProp = {
    letter: string
}

export default function Tile({ letter }: TileProp) {

    return (<span>{letter}</span>)
}