import axios from 'axios';
import { useState } from 'react';

export const Retrieve = () => {

    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [fileData, setFileData] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        axios.get(`/files/${name}`)
            .then(res => {
                setFile(res.data.File);
                setFileData(res.data.fileData);
            })
            .catch(err => console.log(err));
    }

    return (
        <div id='retrieveDiv'>
            <h1>Retrieved File</h1>
            <form id='retrieveForm'>
                <input id='retName' placeholder='FileName' onChange={event => {
                    setName(event.target.value);
                }} />
                <button id='btn' type="submit" onClick={onSubmit}>Submit</button>
                <div>
                {file && file.contentType === 'application/pdf' && <iframe id='retrieveFile' src={fileData} title='PDF' />}
                {file && (file.contentType==='image/jpeg' || file.contentType==='image/png') && <img id='retrieveFile' src={fileData} alt='Retrieved'/>}
            </div>
            </form><br/>
        </div>
    );
};