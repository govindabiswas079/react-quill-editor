import React from "react";
import { Quill } from "react-quill";
import hljs from 'highlight.js';
import ImageResize from 'quill-image-resize-module-react';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import FormatIndentDecreaseRoundedIcon from '@mui/icons-material/FormatIndentDecreaseRounded';
import FormatIndentIncreaseRoundedIcon from '@mui/icons-material/FormatIndentIncreaseRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRightRounded';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustifyRounded';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenterRounded';
import { Box } from "@mui/material";
import { UploadQuillIMG } from '../service/Service'

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);


// Undo and redo functions for Custom Toolbar
function undoChange() { this.quill.history.undo(); }
function redoChange() { this.quill.history.redo(); }

function imageHandler(e) {
    // const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
            const formData = new FormData();
            formData.append("imagepath", file);
            await UploadQuillIMG(formData)
                .then((response) => {
                    if (response?.status === 200) {
                        const url = response?.data?.url // res?.data?.url;
                        this.quill.insertEmbed(this.quill.getSelection(), "image", url);
                    }
                })
                .catch((error) => {
                    console.log('error', error)
                }) // upload data into server or aws or cloudinary
        } else {
            // ErrorToast('You could only upload images.');
        }
    };
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida"];
Quill.register(Font, true);

hljs.configure({ languages: ["javascript", "typescript", "python", "c", "c++", "java", "HTML", "css", "matlab"], });

Quill.register('modules/imageResize', ImageResize);
// Modules object for setting up the Quill editor

function insertLine() {

}

var bindings = {
    tab: {
        key: 9,
        handler: function () {
            // Handle tab
        }
    },
    custom: {
        key: 'B',
        shiftKey: true,
        handler: function (range, context) {
            // Handle shift+b
            console.log(range,  context)
        }
    },
    list: {
        key: 'backspace',
        format: ['list'],
        handler: function (range, context) {
            if (context.offset === 0) {
                // When backspace on the first character of a list,
                // remove the list instead
                this.quill.format('list', false, Quill.sources.USER);
            } else {
                // Otherwise propagate to Quill's default
                return true;
            }
        }
    }
};

export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
            insertLine: insertLine,
            image: imageHandler
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
        displaySize: true,
        handleStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: '#FFFFFF'
        },
    },
    syntax: {
        highlight: function (text) {
            return hljs.highlightAuto(text).value;
        },
    },
    clipboard: {
        matchVisual: false,
    },
    // keyboard: {
    //     bindings: bindings
    // }
};

// Formats objects for setting up the Quill editor
export const formats = ["header", "font", "size", "bold", "italic", "underline", "align", "strike", "script", "blockquote", "background", "list", "bullet", "indent", "link", "image", "color", "code", "code-block"];

// Quill Toolbar component
export const QuillToolbar = () => {
    const icons = Quill.import('ui/icons');
    icons.list.bullet = null; // for  custome bold button
    icons.list.ordered = null; // for  custome bold button
    icons.indent["-1"] = null; // for  custome bold button
    icons.indent["+1"] = null; // for  custome bold button
    icons.bold = null; // for  custome bold button
    icons.italic = null; // for  custome bold button
    icons.underline = null; // for  custome bold button
    icons.strike = null; // for  custome bold button
    icons.align[""] = null; // for custome align button
    icons.align.center = null; // for custome align button
    icons.align.justify = null; // for custome align button
    icons.align.right = null; // for custome align button
    icons.blockquote = null; // for custome align button
    icons.link = null; // for custome align button
    icons.image = null; // for custome align button
    icons.video = null; // for custome align button
    icons['code-block'] = null; // for custome align button
    icons.code = null; // for custome align button

    return (
        <div id="toolbar" style={{ borderBottom: '1px solid rgba(145, 158, 171, 0.2)', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, }}>
            <span className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="extra-small">Size 1</option>
                    <option value="small">Size 2</option>
                    <option value="medium">Size 3</option>
                    <option value="large">Size 4</option>
                </select>
                <select className="ql-header" defaultValue="3" onChange={e => e.persist()}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                    <option value="6">normal</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" >
                    <FormatBoldRoundedIcon />
                </button>
                <button className="ql-italic">
                    <FormatItalicRoundedIcon />
                </button>
                <button className="ql-underline">
                    <FormatUnderlinedRoundedIcon />
                </button>
                <button className="ql-strike">
                    <StrikethroughSRoundedIcon />
                </button>
            </span>

            <span className="ql-formats">
                <button className="ql-list" value="ordered">
                    <FormatListNumberedRoundedIcon />
                </button>
                <button className="ql-list" value="bullet">
                    <FormatListBulletedRoundedIcon />
                </button>
                {/* <button className='ql-insertLine' style={{ transform: 'rotate(90deg)' }}>
                    <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 22H2V2h2v20zM22 2h-2v20h2V2zm-8.5 5h-3v10h3V7z"></path></svg>
                </button> */}
                <button className="ql-indent" value="-1">
                    <FormatIndentDecreaseRoundedIcon />
                </button>
                <button className="ql-indent" value="+1">
                    <FormatIndentIncreaseRoundedIcon />
                </button>
            </span>
            <span className="ql-formats">
                {/* <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" /> */}
                <button className="ql-blockquote">
                    <FormatQuoteRoundedIcon />
                </button>
                {/* <button className="ql-direction" /> */}
            </span>
            <Box className="ql-formats">
                <button className="ql-align" value="">
                    <FormatAlignLeftIcon />
                </button>
                <button className="ql-align" value="center">
                    <FormatAlignCenterIcon />
                </button>
                <button className="ql-align" value="right">
                    <FormatAlignRightIcon />
                </button>
                <button className="ql-align" value="justify">
                    <FormatAlignJustifyIcon />
                </button>
            </Box>

            <span className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link">
                    <InsertLinkRoundedIcon />
                </button>
                <button className="ql-image">
                    <AddPhotoAlternateRoundedIcon />
                </button>
                <button className="ql-video">
                    <VideoLibraryRoundedIcon />
                </button>
            </span>
            <span className="ql-formats">
                {/* <button className="ql-formula" /> */}
                <button className="ql-code-block">
                    <CodeOffRoundedIcon />
                </button>
                <button className="ql-code">
                    <CodeRoundedIcon />
                </button>
                {/* <button className="ql-clean" /> */}
            </span>
            <span className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </span>
        </div>
    )
};

export default QuillToolbar;