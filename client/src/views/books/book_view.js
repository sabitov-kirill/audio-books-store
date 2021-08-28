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
    PlayArrow, NewReleases
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom';

import './book.scss';

function Cover(props) {
    const activeFlag = {
        filter: props.isActive ? "" : 'grayscale(100%)'
    }

    return (
        <div className='coverContainer'>
            <img 
                onClick={props.select}
                src={`books/${props.bookId}/image.png`} 
                style={activeFlag}
                className='cover'
                alt='Book cover' 
            />
        </div>
    );
}

function Tags(props) {
    const history = useHistory();
    const onReadRedirect = () => history.push(`/reader/${props.book.id}`);

    const notOwnedTags = <>
        <li className="tagItem fogged"><LocalOffer fontSize='small' />{' '}{props.book.price + ' ₽'}</li>
        <li className="actionButton tagItem"><AddShoppingCart fontSize='small' />{' '}{'Купить'}</li>
    </>
    const ownedTags = <>
        <li className="tagItem fogged" ><ShoppingCart fontSize='small' />{' '}{'Куплено'}</li>
        <li className="actionButton tagItem" onClick={onReadRedirect}><PlayArrow fontSize='small' />{' '}{'Читать'}</li>
    </>
    const premiereTags = 
        <li className="tagItem fogged" ><NewReleases fontSize='small' />{' '}{'Скоро...'}</li>

    return (
        <ul className="tagsContainer">
            <li className="tagItem fogged"><Event fontSize='small' />{' '}{props.book.year + ' г.'}</li>
            {props.book.isPremiere ? premiereTags : props.isOwned ? ownedTags : notOwnedTags}
        </ul>
    );
}

function Text(props) {
    return (
        <div className='textContainer'>
            <h1 onClick={props.select} className='title actionText' >{props.book.title}</h1>            
            <div className='separator'></div>            
            <p className='descripion '>{props.book.description}</p>
            <Tags book={props.book} isOwned={props.isOwned} select={props.select} />
        </div>
    );
}

export default function BookView(props) {
    return (
        <div className='cardContainer shadow'>
            <Cover isActive={props.isOwned} bookId={props.book.id} select={props.select} />
            <Text book={props.book} isOwned={props.isOwned} select={props.select} />          
        </div>
    );
}