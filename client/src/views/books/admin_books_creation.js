/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Admin panel for books adding control panel.
 *
 */

import { useState, createRef } from 'react'

export default function AdminBooksCreationView(props) {
    const [error, setError] = useState('');

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const form = createRef();
    const image = createRef();
    const text = createRef();
    const speech = createRef();
    const speechMap = createRef();

    const onTitleChange = (e) => setTitle(e.target.value)
    const onAuthorChange = (e) => setAuthor(e.target.value)
    const onDescriptionChane = (e) => setDescription(e.target.value)
    const onPriceChange = (e) => setPrice(e.target.value)
    const onUploadBook = async (e) => {
        e.preventDefault();
        try {
            const bookData = {
                title, 
                author,
                description,
                price,
    
                image: image.current.files[0],
                text: text.current.files[0],
                speech: speech.current.files[0],
                speechMap: speechMap.current.files[0]
            };

            const formData = new FormData(form.current);
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }

            const response = await fetch('/api/books/create', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <form onSubmit={onUploadBook} ref={form} >
            <div className="d-grid gap-1 p-3">

                <input type='text' name='title' placeholder='Title' onChange={onTitleChange} />
                <input type='text' name='author' placeholder='Author' onChange={onAuthorChange} />
                <input type='text' name='description' placeholder='Description' onChange={onDescriptionChane} />
                <input type='text' name='price' placeholder='Price' className='mb-3' onChange={onPriceChange} />

                <label>
                    Select Book Image:{' '}
                    <input type='file' name='image' ref={image} />
                </label>
                <label>
                    Select Book Text:{' '}
                    <input type='file' name='text' ref={text} />
                </label>
                <label>
                    Select Book Speech:{' '}
                    <input type='file' name='speech' ref={speech} />
                </label>
                <label>
                    Select Books Speech Map:{' '}
                    <input type='file' name='speechMap' className='mb-3' ref={speechMap} />
                </label>

                {error !== '' && <div className="alert alert-danger mb-3" role="alert">{error}</div>}

                <input type='submit' value='Submit' />
            </div>
        </form>
    );
}