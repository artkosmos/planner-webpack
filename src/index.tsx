import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes";
import {Provider} from 'react-redux'
import {store} from "@/store";
import '@/style/style.scss'

const rootElement = document.getElementById('root')
const container = createRoot(rootElement)

container.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
