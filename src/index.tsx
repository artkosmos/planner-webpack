import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes";
import {Provider} from 'react-redux'
import {store} from "@/store";
import '@/style/style.scss'

const bodyElement = document.querySelector('body');
const container = createRoot(bodyElement)

container.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
