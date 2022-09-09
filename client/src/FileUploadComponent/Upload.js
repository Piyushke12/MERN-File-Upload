import { useState } from 'react';
import axios from 'axios';

export const Upload = (props) => {

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [data, setData] = useState('');
    const [Error, setError] = useState('');
    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();

        data.append('name', name);
        data.append('document', document);

        axios.post('/upload', data)
            .then(res => {
                console.log('Success');
                setData(res.data.data);
            })
            .catch(err => {
                setError(err);
            });
    }

    return (
        <div id="formDiv">
            <h1>Upload Your File</h1>
            {Error && <h1>{Error}</h1>}
            <form id="form" encType="multipart/form-data" onSubmit={onSubmit}>
                <label htmlFor="name">Enter Your Name : </label>
                <input name="name" type="text" placeholder="Name" onChange={event => {
                    setName(event.target.value);
                }} required />
                <label id="fileLabel" htmlFor="file">Choose Your File</label>
                <input id="input" type="file" name="file" encType="multipart/form-data"
                    onChange={event => {
                        setDocument(event.target.files[0]);
                    }} required />
                <button id="btn" type="submit">Submit</button>
                {data && <h2>{data}</h2>}
            </form>
        </div>
    );
}