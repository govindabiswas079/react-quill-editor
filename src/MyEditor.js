import React, { Fragment } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = () => {

    const handleChange = (content) => {
        // handle editor content changes
    };

    return (
        <Fragment>
            <ReactQuill
                onChange={handleChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean'],
                        ['code-block'],
                        [{ 'lineheight': [] }], // custom line height button
                        [{ 'text-transform': [] }], // custom text transform button
                    ],
                }}
                formats={[
                    'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image',
                    "code-block"
                ]}
            />
        </Fragment>
    )
}

export default MyEditor