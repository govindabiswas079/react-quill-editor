import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from "react-quill";
import { Grid, Box, useTheme, Container, Button } from '@mui/material';
// import { QuillToolbar, modules, formats } from "./component/EditorToolbar";
import EditorToolbar, { modules, formats } from "./component/EditorToolbarV2";
import "./quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import MyEditor from './MyEditor';
import JSZip from 'jszip';
import axios from 'axios';

const App = () => {
  const quillRef = useRef()
  const theme = useTheme()
  const [value, setValue] = useState('');
  const [state, setState] = React.useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(URL.createObjectURL(input?.files[0]));
        // const formData = new FormData();
        // formData.append("image", file);
        // const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
        const url = URL.createObjectURL(file) // res?.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        // ErrorToast('You could only upload images.');
      }
    };
  }

  /* const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['image', "link",],
        [{ "align": '' }, { "align": 'center' }, { "align": 'right' }, { "align": 'justify' }]
        ["blockquote", "direction","formula", "code-block", "clean"],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), []); */


  const onChangeFile = (event) => {
    console.log(event?.target?.files)
    setValue(URL.createObjectURL(event?.target?.files[0]))
  }

  const readZipFile = async () => {
    await axios.get(
      'http://localhost:8080/api/download/zip',
      /* { responseType: 'blob' } */
      { responseType: 'arraybuffer', }
    )
      .then(async (response) => {
        const url = window.URL.createObjectURL(
          new Blob([response?.data], { type: "application/zip" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("saveas", "generate.zip");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    var jszip = new JSZip();
    const getBlob = async () => {
      await axios.get(
        'http://localhost:8080/api/download/zip',
        { responseType: 'arraybuffer', }
      )
        .then(async (response) => {
          // jszip.loadAsync(response?.data)
          //   .then(function (zip) {
          //     Object.keys(zip.files).forEach(function (filename) {
          //       console.log(filename);
          //     })
          //     // Expected outline.png, publish.png, manifest.json
          //   });

          // await jszip.loadAsync(response?.data)
          // jszip.forEach(async (relativePath, file) => {
          //   const content = await file.async("string");
          //   console.log(relativePath)
          //   //save the file in the desired location
          // });

          // await zip.loadAsync(response?.data);
          // zip.forEach((relativePath, zipEntry) => {
          //   console.log('File:', relativePath);
          //   console.log('Content:', zipEntry);
          // });

          // jszip.loadAsync(response?.data).then(function (zip) {
          //   let imagess = [];
          //   Object.keys(zip.files).forEach(function (filename) {
          //     zip.files[filename].async("base64").then(function (fileData) {
          //       console.log(fileData)
          //       const image = document.createElement("img");
          //       image.src = "data:image/*;base64," + fileData;
          //       // document.querySelector(".unziped-container").appendChild(image);
          //     });
          //   });
          // });


          const folderTree = {};
          await jszip.loadAsync(response?.data)
          jszip.forEach((relativePath, zipEntry) => {
            const pathParts = relativePath.split('/');
            let currentFolder = folderTree;

            pathParts.forEach((part, index) => {
              if (index === pathParts.length - 1) {
                // File
                currentFolder[part] = zipEntry;
              } else {
                // Folder
                if (!currentFolder[part]) {
                  currentFolder[part] = {};
                }
                currentFolder = currentFolder[part];
              }
            });
          });
          // console.log(folderTree);
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getBlob()

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://storage.googleapis.com/node-bucket-841e6.appspot.com/source%2Fnode_server-main.zip',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  return (
    <Fragment>
      <Container sx={{ width: '100%' }}>
        <Grid container spacing={0} sx={{}}>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
            <Box sx={{ overflow: 'hidden', position: 'relative', borderRadius: '8px', border: '1px solid rgba(145, 158, 171, 0.2)', display: 'block', margin: '0 auto' }}>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                ref={quillRef}
                value={state.value}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
                style={{ border: 'none', overflow: 'hidden', height: 350 }}
              />
            </Box>
          </Grid>
        </Grid>
        <div className="ql-snow">
          <div className="ql-editor">
            <ReactMarkdown children={state.value} rehypePlugins={[rehypeRaw]} />
          </div>
        </div>
        {/* <MyEditor /> */}

        <input type='file' multiple onChange={(event) => onChangeFile(event)} />
        {/* <img src={value}  /> */}
        <Button onClick={() => readZipFile()}>Download a Zip</Button>
      </Container>
    </Fragment>
  )
}

export default App // "https://storage.googleapis.com/node-bucket-841e6.appspot.com/source%2Fnode_server-main.zip"


/*

const onChangeFile = (e) => {
    var new_zip = new JSZip();
    let folderName = "";
    new_zip.loadAsync(e.target.files[0]).then(function (zip) {
      zip?.forEach((entry) => {
        const entryParts = entry.split("/");
        if(entryParts[entryParts.length - 1] === "__init__.py") {
          folderName = entryParts.slice(0, entryParts.length - 1).join("/");
        }
      });
      zip?.folder(folderName)?.file("__init__.py")?.async("string").then(function (data) {
        let newData = `{${data}}`.replaceAll("=", ":");
        newData = newData.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":');
        const jsonData = JSON.parse(newData)
        console.log(jsonData);
      });
    });
  };
*/


/// https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/

// https://github.com/emetdas/Youtube-code/tree/master/web%20components/React-Swiper-Slider-3D-Coverflow