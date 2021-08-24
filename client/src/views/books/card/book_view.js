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

import { Link } from "react-router-dom";
import { Book, CartPlus, PersonFill, CalendarFill } from "react-bootstrap-icons";

import './book.scss';

function BookData(props) {
    return (
        <div className='cardContainer'>
            <div className='coverContainer'>
                <img 
                    src={props.book.imagePath} 
                    className='cover'
                    alt='Book cover' 
                />
            </div>

            <div className='textContainer'>
                <h1 component={Link} className='title activity-color' >{props.book.title}</h1>
                
                <div className='separator'></div>
                
                <p className='descripion'>{props.book.description}</p>

                <ul class="tagsContainer">
                    <li className="tagItem"><PersonFill />{' '}{props.book.author}</li>
                    <li className="tagItem"><CalendarFill />{' '}{props.book.year}</li>
                </ul>
            </div>
        </div>
    );
}

function BookBuy(props) {
    return (
        <div className=''>

        </div>
    );
}

export default function BookView(props) {
    return (
        <div>
            <BookData book={props.book} />
            <BookBuy />
        </div>
    );
}