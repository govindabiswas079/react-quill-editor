import { Box, ButtonGroup } from "@mui/material";
import React from "react";
import { Quill } from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import hljs from 'highlight.js';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

hljs.configure({
    // optionally configure hljs
    languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
});

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
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

/// font size
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ["8px", "10px", "12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px",]
Quill.register(SizeStyle, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "open-sans", "courier-new", "georgia", "helvetica", "lucida"];
Quill.register(Font, true);

const Block = Quill.import("blots/block");
Quill.register(Block, true);
Quill.register('modules/imageResize', ImageResize);

const AvailableLineHeights = [...Array(110).keys()].map((x) => (80 + x * 5) / 100)
const parchment = Quill.import('parchment')
const lineHeightConfig = { scope: parchment.Scope.INLINE, whitelist: AvailableLineHeights }
const lineHeightStyle = new parchment.Attributor.Style('line-height', 'line-height', lineHeightConfig)
Quill.register(lineHeightStyle, true)

// const lineHeightStyle = Quill.import('attributors/style/lineheight');
// Quill.register(lineHeightStyle, true);

// Modules object for setting up the Quill editor

function insertStar() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, '★');
    this.quill.setSelection(cursorPosition + 1);
}

export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            insertStar: insertStar,
            undo: undoChange,
            redo: redoChange,
            color: function (value) {
                // if (value == 'custom-color') value = window.prompt('Enter Hex Color Code');
                // this.quill.format('color', value);
                const newQuill = this.quill;
                if (value === 'custom-color') {
                    var picker = document.getElementById('custom-color');
                    if (!picker) {
                        picker = document.createElement('input');
                        picker.id = 'custom-color';
                        picker.type = 'color';
                        picker.style.display = 'none';
                        picker.value = '#FF0000';
                        document.body.appendChild(picker);

                        picker.addEventListener('change', function () {
                            newQuill.format('color', picker.value);
                        }, false);
                    }
                    picker.click();
                } else {
                    this.quill.format('color', value);
                }
            },
            background: function (value) {
                // if (value == 'custom-color') value = window.prompt('Enter Hex Color Code');
                // this.quill.format('color', value);
                const newQuill = this.quill;
                if (value === 'custom-background') {
                    var picker = document.getElementById('custom-background');
                    if (!picker) {
                        picker = document.createElement('input');
                        picker.id = 'custom-background';
                        picker.type = 'color';
                        picker.style.display = 'none';
                        picker.value = '#FF0000';
                        document.body.appendChild(picker);

                        picker.addEventListener('change', function () {
                            newQuill.format('background', picker.value);
                        }, false);
                    }
                    picker.click();
                } else {
                    this.quill.format('background', value);
                }
            },
        },
        keyboard: {
            bindings: {
                tab: false,
                custom: {
                    key: 13,
                    shiftKey: true,
                    handler: function () { /** do nothing */ }
                },
                handleEnter: {
                    key: 13,
                    handler: function () { /** do nothing */ }
                }
            }
        },
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
    // 'emoji-toolbar': true,
    // 'emoji-textarea': true,
    // 'emoji-shortname': true,
    // toolbar: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline'], [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link']]
};


// Formats objects for setting up the Quill editor
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "lineheight",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

// Quill Toolbar component
export const QuillToolbar = () => {
    const icons = Quill.import('ui/icons');
    icons.bold = null; // for  custome bold button
    icons.align[""] = null; // for custome align button
    icons.align.center = null; // for custome align button
    icons.align.justify = null; // for custome align button

    icons.align.right = null; // for custome align button


    return (
        <Box id="toolbar" style={{ borderBottom: '1px solid rgba(145, 158, 171, 0.2)', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, }}>
            <Box className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="open-sans">Open Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
                <select className="ql-size" defaultValue="14px">
                    <option value="8px">8px</option>
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="22px">22px</option>
                    <option value="24px">24px</option>
                    <option value="26px">26px</option>
                    <option value="28px">28px</option>
                </select>
                <select className="ql-header" defaultValue="3">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                </select>
            </Box>
            <Box className="ql-formats" >
                <button className="ql-bold" ><FormatBoldIcon /></button>
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </Box>
            <Box className="ql-formats" >
                <button className="ql-insertStar" />
            </Box>
            {/* <Box className="ql-formats" >
                <select className="ql-lineheight" defaultValue="8px">
                    <option value="8px">8px</option>
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="22px">22px</option>
                    <option value="24px">24px</option>
                    <option value="26px">26px</option>
                    <option value="28px">28px</option>
                    <option value="30px">30px</option>
                    <option value="32px">32px</option>
                    <option value="34px">34px</option>
                    <option value="36px">36px</option>
                    <option value="38px">38px</option>
                    <option value="40px">40px</option>
                </select>
            </Box> */}
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
            <Box className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </Box>
            <Box className="ql-formats">
                <button className="ql-blockquote" />
            </Box>

            <Box className="ql-formats">
                <select className="ql-color">
                    <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" />
                    <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)" />
                    <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)" />
                    <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)" />
                    <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)" />
                    <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)" />
                    <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)" />
                    <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)" />
                    <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)" />
                    <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)" />
                    <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)" />
                    <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)" />
                    <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)" />
                    <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)" />
                    <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)" />
                    <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)" />
                    <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)" />
                    <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)" />
                    <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)" />
                    <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)" />
                    <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)" />
                    <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)" />
                    <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)" />
                    <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)" />
                    <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)" />
                    <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)" />
                    <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)" />
                    <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)" />
                    <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)" />
                    <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)" />
                    <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)" />
                    <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)" />
                    <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)" />
                    <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)" />
                    <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)" />
                    <option value="custom-color" label="custom-color" />
                </select>
                <select className="ql-background" >
                    <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" />
                    <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)" />
                    <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)" />
                    <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)" />
                    <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)" />
                    <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)" />
                    <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)" />
                    <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)" />
                    <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)" />
                    <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)" />
                    <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)" />
                    <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)" />
                    <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)" />
                    <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)" />
                    <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)" />
                    <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)" />
                    <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)" />
                    <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)" />
                    <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)" />
                    <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)" />
                    <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)" />
                    <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)" />
                    <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)" />
                    <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)" />
                    <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)" />
                    <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)" />
                    <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)" />
                    <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)" />
                    <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)" />
                    <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)" />
                    <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)" />
                    <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)" />
                    <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)" />
                    <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)" />
                    <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)" />
                    <option value="custom-background" label="custom-background" />
                </select>
            </Box>


            <Box className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
            </Box>
            <Box className="ql-formats">
                <button className="ql-code-block" />
            </Box>
            <Box className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </Box>
        </Box>
    )
};

export default QuillToolbar;