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
    PersonFill, CalendarFill,
    TagFill, CartCheckFill, 
    CartPlusFill, PlayFill
} from "react-bootstrap-icons";

import './book.scss';

function Cover(props) {
    const activeFlag = {
        filter: props.isActive ? "" : 'grayscale(100%)'
    }

    return (
        <div className='coverContainer'>
            <img 
                src={props.imagePath} 
                style={activeFlag}
                className='cover'
                alt='Book cover' 
            />
        </div>
    );
}

function Tags(props) {
    const notOwnedTags = <>
        <li className="tagItem"><TagFill />{' '}{props.book.price + ' ₽'}</li>
        <li className="actionButton tagItem" onClick={props.select}><CartPlusFill />{' '}{'Купить'}</li>
    </>
    const ownedTags = <>
        <li className="tagItem" ><CartCheckFill />{' '}{'Куплено'}</li>
        <li className="actionButton tagItem" onClick={props.select}><PlayFill />{' '}{'Читать'}</li>
    </>

    return (
        <ul className="tagsContainer">
            <li className="tagItem"><PersonFill />{' '}{props.book.author}</li>
            <li className="tagItem"><CalendarFill />{' '}{props.book.year + ' г.'}</li>
            {props.isOwned ? ownedTags : notOwnedTags}
        </ul>
    );
}

function Text(props) {
    return (
        <div className='textContainer'>
            <h1 onClick={props.select} className='title activity-color' >{props.book.title}</h1>            
            <div className='separator'></div>            
            <p className='descripion '>{props.book.description}</p>
            <Tags book={props.book} isOwned={props.isOwned} select={props.select} />
        </div>
    );
}

export default function BookView(props) {
    return (
        <div className='cardContainer'>
            <Cover isActive={props.isOwned} imagePath={props.book.imagePath} />
            <Text book={props.book} isOwned={props.isOwned} select={props.select} />          
        </div>
    );
}