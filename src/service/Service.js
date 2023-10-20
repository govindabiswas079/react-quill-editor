import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

let config = {
    onUploadProgress: progressEvent => {
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        console.log(percentCompleted)
        // do whatever you like with the percentage complete
        // maybe dispatch an action that will update a progress bar or something
    }
}

export const UploadQuillIMG = (data) => API.post('/quill/image', data, { onUploadProgress(progressEvent) { console.log({ progressEvent }) } },  { headers: { "Content-Type": 'multipart/form-data', "content-type": 'multipart/form-data' } },)
