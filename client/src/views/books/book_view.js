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

import { Card, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { Book, CartPlus } from "react-bootstrap-icons";

export default function BookView(props) {
    return (
        <OverlayTrigger overlay={<Tooltip id="book-description">{props.book.description}</Tooltip>}>
            <Card>
                <Card.Img variant="top" src={props.book.imagePath} />
                <Card.Header>{props.book.title}</Card.Header>
                <Card.Text>{`Author: ${props.book.author}. Year: ${props.book.year}`}</Card.Text>
                <Button onClick={props.select}>
                    {props.isOwned ? <Book /> : <CartPlus />}
                </Button>
            </Card>
        </OverlayTrigger>
    );
}