/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Smirnov Daniil.
 *
 * PURPOSE:       Audio books web store application.
 *                Book card.
 *
 */

import Card from "react-bootstrap/Card";

export default function BookView(props) {
    return (
        <Card onClick={props.select}>
            <Card.Img variant="top" src={props.book.imgPath} />
            <Card.Header>{props.book.title}</Card.Header>
            <Card.Text>{`Author: ${props.book.author}, Year: ${props.year}`}</Card.Text>
        </Card>
    );
}