/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov,
 *                Daniil Smirnov,
 *                Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Admin panel view for books creation.
 *
 */

import { useState, createRef } from 'react'
import { Redirect } from "react-router-dom";

export default function AdminBooksCreationView(props) {
    const [error, setError] = useState('');
    const form = createRef();
    const image = createRef();
    const text = createRef();
    const speech = createRef();
    const speechMap = createRef();
 
    const onUploadBook = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(form.current);
            for(var value of formData.values()) {
                if (!value) throw new Error('Fill all fields before submit.');
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

    if (!props.user.isAdmin) return <Redirect to='/'/>
 
    return (
        <form onSubmit={onUploadBook} ref={form} >
            <div className="d-grid gap-1 p-3">
 
                <input type='text' name='title' placeholder='Title' />
                <input type='text' name='author' placeholder='Author' />
                <input type='text' name='year' placeholder='Year' />
                <textarea type='text' name='description' placeholder='Description' />
                <input type='text' name='price' placeholder='Price' className='mb-3' />
 
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