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

import {
    Card, Row, Col,
    Tooltip, OverlayTrigger, Button, Container, CardImg
} from "react-bootstrap";
import { Book, CartPlus } from "react-bootstrap-icons";

export default function BookView(props) {
    return (
        <Card className='mb-3' style={{width: "80vw", height: '38vh'}}>
            <Row className='g-0'>
                <Col xs={3} style={{
                                minWidth: '90px',
                            }}
                >
                    <Card.Img src={props.book.imagePath}
                             style={{
                                 height: '38vh',
                             }}
                    />
                </Col>
                <Col xs={7} style={{
                    minWidth: '210px',
                }}>
                    <Card.Body>
                        <Card.Title>{props.book.title}</Card.Title>
                        <Card.Text>
                            <small className='text-muted'>
                                {`Author: ${props.book.author}
                                  Year: ${props.book.year}`}
                            </small>
                        </Card.Text>
                        <Card.Text>
                            <small style={{fontSize: '0.8rem'}}>
                                {props.book.description.substr(0, 120)}
                            </small>
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Col xs={1} style={{
                                minWidth: '30px',
                            }}>
                    <Button className="fluid m-2" onClick={() => props.select(props.book)}>
                        {props.isOwned ? <Book /> : <CartPlus />}
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}




//         <OverlayTrigger overlay={<Tooltip id="book-description">{props.book.description}></Tooltip>}>
//             <Card>
//                 <Card.Img variant="top" src={props.book.imagePath} />
//                 <Card.Header>{props.book.title}</Card.Header>
//                 <Card.Text>{`Author: ${props.book.author}. Year: ${props.book.year}`}</Card.Text>
//                 <Button onClick={() => props.select(props.book)} className="w-25">
//                     {props.isOwned ? <Book /> : <CartPlus />}
//                 </Button>
//             </Card>
//         </OverlayTrigger>