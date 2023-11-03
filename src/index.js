import ReactDOM from "react-dom/client";
import App from './App';
import Example from './Example';
import ImageToText from './ImageToText';
import ZipFolderTree from './ZipFolderTree';
import TagsInput from './TagsInput';
import Debounceing from './debounceing/Debounceing';
import Throttleing from './throttleing/Throttleing';
import InfinitScroll from './InfinitScroll';
import SideProfile from './newscreens/SideProfile';
import UserProfile from './newscreens/UserProfile';

import "@fontsource/open-sans"
import "@fontsource/open-sans/300-italic.css"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400-italic.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/500-italic.css"
import "@fontsource/open-sans/500.css"
import "@fontsource/open-sans/600-italic.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700-italic.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/800-italic.css"
import "@fontsource/open-sans/800.css"

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <App />
);
