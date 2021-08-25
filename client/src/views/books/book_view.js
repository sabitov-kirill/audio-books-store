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
    Event, LocalOffer,
    ShoppingCart, AddShoppingCart,
    PlayArrow, AccountBox
} from '@material-ui/icons'

import './book.scss';

function Cover(props) {
    const activeFlag = {
        filter: props.isActive ? "" : 'grayscale(100%)'
    }

    return (
        <div className='coverContainer'>
            <img 
                onClick={props.select}
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
        <li className="tagItem"><LocalOffer />{' '}{props.book.price + ' ₽'}</li>
        <li className="actionButton tagItem" onClick={props.select}><AddShoppingCart />{' '}{'Купить'}</li>
    </>
    const ownedTags = <>
        <li className="tagItem" ><ShoppingCart />{' '}{'Куплено'}</li>
        <li className="actionButton tagItem" onClick={props.select}><PlayArrow />{' '}{'Читать'}</li>
    </>

    return (
        <ul className="tagsContainer">
            <li className="tagItem"><AccountBox />{' '}{props.book.author}</li>
            <li className="tagItem"><Event />{' '}{props.book.year + ' г.'}</li>
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
            <Cover isActive={props.isOwned} imagePath={props.book.imagePath} select={props.select} />
            <Text book={props.book} isOwned={props.isOwned} select={props.select} />          
        </div>
    );
}