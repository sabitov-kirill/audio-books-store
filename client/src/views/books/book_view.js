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
    PlayArrow, NewReleases, Build
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom';

import './book.scss';

function Cover(props) {
    const activeFlag = {
        filter: props.isActive ? "" : 'grayscale(90%)'
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
    let statusTags;
    if (props.isOwned) {
        statusTags = <>
            <li className="tagItem fogged" ><ShoppingCart fontSize='small' />{' '}{'Куплено'}</li>
            <li className="actionButton tagItem" onClick={props.select}><PlayArrow fontSize='small' />{' '}{'Читать'}</li>
        </>
    } else if (props.book.status === 'canbuy') {
        statusTags = <>
            <li className="tagItem fogged"><LocalOffer fontSize='small' />{' '}{props.book.price + ' ₽'}</li>
            <li className="actionButton tagItem" onClick={props.select}><AddShoppingCart fontSize='small' />{' '}{'Купить'}</li>
        </>
    } else if (props.book.status === 'premiere') {
        statusTags = <li className="tagItem fogged" ><NewReleases fontSize='small' />{' '}{'Скоро...'}</li>
    } else if (props.book.status === 'indev') {
        statusTags = <li className="tagItem fogged" ><Build fontSize='small' />{' '}{'В разработке'}</li>
    }

    return (
        <ul className="tagsContainer">
            <li className="tagItem fogged" ><Event fontSize='small' />{' '}{props.book.year}</li>
            {statusTags}
        </ul>        
    );
}

function Text(props) {
    return (
        <div className='textContainer'>
            <h1 className='actionText' onClick={props.select} >{props.book.title}</h1>            
            <div className='separator'></div>            
            <p className='descripion '>{props.book.description}</p>
            <Tags book={props.book} isOwned={props.isOwned} select={props.select} />
        </div>
    );
}

export default function BookView(props) {
    const history = useHistory();

    const onReadRedirect = () => history.push(`/reader/${props.book.id}`);
    const onBuyRedirect = () => {
        if (props.isLoggedIn) {
            if (props.isOffline) {
                props.offlineBuyWarn();
            } else {
                props.buyBook(props.book);
            }

        } else {
            history.push({
                pathname: 'authorization',
                search: 'from=buy',
            });
        }
    }
    const select = 
        props.book.status === 'canbuy' ? 
        props.isOwned ? onReadRedirect : onBuyRedirect :
        () => {};
    
    return (
        <div className='cardContainer shadow'>
            <Cover isActive={props.isOwned} bookId={props.book.id} select={select} />
            <Text book={props.book} isOwned={props.isOwned} select={select} />          
        </div>
    );
}