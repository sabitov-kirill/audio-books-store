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

import { useState, createRef } from 'react';
import { Redirect } from "react-router-dom";

export default function AdminBooksCreationView(props) {
    const [error, setError] = useState('');
    const [bookStatus, setBookStatus] = useState(false);
    const form = createRef();
    
    const onBookStatusChange = (e) => {
        setBookStatus(e.target.value);
    }
 
    const onUploadBook = async (e) => {
        try {
            e.preventDefault();
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

    if (props.isLoading) return <h1>Loading account data...</h1>
    if (!props.isAdmin) return <Redirect to='/'/>

    return (
        <form onSubmit={onUploadBook} ref={form} >
            <div className='column' style={{height: '100vh', flexWrap: 'nowrap'}} >
                <input type='text' name='title' placeholder='Title' />
                <input type='text' name='year' placeholder='Year' />
                <textarea type='text' name='description' placeholder='Description' />
                <input type='text' name='price' placeholder='Price' />
                <label className='column'>
                    Select book status:{' '}
                    <label>
                        Can buy{' '}
                        <input type='radio' value='canbuy' name='status' onChange={onBookStatusChange}/>
                    </label>
                    <label>
                        Premiere{' '}
                        <input type='radio' value='premiere' name='status' onChange={onBookStatusChange}/>
                    </label>
                    <label>
                        In development{' '}
                        <input type='radio' value='indev' name='status' onChange={onBookStatusChange}/>
                    </label>
                </label>
                <div className='fogged' style={{height: 'fir-content', display: 'inline-block'}} >
                    <h1>Cover Image</h1>
                    <label>
                        Select Cover Image:{' '}
                        <input type='file' name='image' />
                    </label>
                </div>

                {bookStatus === 'canbuy' && 
                    <div className='fogged' style={{height: 'fir-content', display: 'inline-block'}} >
                        <input type='text' name='pagesCount' placeholder='Pages Count' />
                        <h1>Pages Data</h1>
                        <label>
                            Select Pages Images:{' '}
                            <input type='file' name='pages' multiple />
                        </label>
                        <label>
                            Select Pages Audio:{' '}
                            <input type='file' name='audios' multiple />
                        </label>
                    </div>
                }

                {error !== '' && <div className="alert alert-danger mb-3" role="alert">{error}</div>}

                <input type='submit' value='Submit' />
            </div>
        </form>
    );
}