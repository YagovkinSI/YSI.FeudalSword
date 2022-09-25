import React from "react";

export enum enCardLinkLineType {
    Character = 1,
    Army = 2
}

interface CardLinkLineProp {
    lineType: enCardLinkLineType,
    contentId: number
}

const CardLinkLine : React.FC<CardLinkLineProp> = (props) => {


    return (
        <>
            В разработке... //TODO, 
            Тип: {props.lineType}, 
            Id: {props.contentId}, 
        </>
    )
}

export default CardLinkLine;