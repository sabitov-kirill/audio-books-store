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
        <Card onClick={props.select()}>
            <Card.Header>{props.book.title}</Card.Header>
            <Card.Img variant="top" src={props.book.imgPath} />
        </Card>
    );
}