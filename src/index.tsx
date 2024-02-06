import {App} from './components/App'
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById('root');

const container = createRoot(rootElement)

console.log(container)

container.render(<App />)