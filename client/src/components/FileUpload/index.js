import { useImperativeHandle } from 'react';
import { forwardRef, useState } from 'react';
//import axios from 'axios';

import { surveyAddPageUpload } from '../../services/api';

import './style.css';

export const FileUpload = forwardRef((props, ref) => {

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
        //console.log(`onInputChange: ${e.target.files}`)
    };
    useImperativeHandle(ref, () => ({
        onUpload(path) {
            //e.preventDefault();
            //console.log(`FileUpload: ${e}`)

            const data = new FormData();
            data.append('path', path);
            for (let i = 0; i < files.length; i++) {
                data.append('file', files[i]);
            }
            // action
            surveyAddPageUpload(data);
        }
    }));

    return (
            <div className="form-group files">
                <label>Upload MP3 audio</label>
                <input type="file"
                    onChange={onInputChange}
                    multiple />
            </div>
    )
});