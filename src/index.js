import ReactDOM from "react-dom/client";
import App from './App';
import Example from './Example';
import ImageToText from './ImageToText';
import ZipFolderTree from './ZipFolderTree';
import TagsInput from './TagsInput';
import Debounceing from './debounceing/Debounceing';
import Throttleing from './throttleing/Throttleing';
import InfinitScroll from './InfinitScroll';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <TagsInput />
);
