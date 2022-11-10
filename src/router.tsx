import App from "./App";
import BlogList from "./page/bolgList";
import BlogDetail from "./page/blogDetail";
import AddBlog from "./page/addBlog";
import Test from './page/test'
import Test2 from "./page/test2";
import Scroll from './page/scroll'
import Formily from './page/formily'
import FormilyExample from './page/formilyExample'
import React from 'react'
import { Route, Routes, useNavigate, BrowserRouter ,useRoutes} from 'react-router-dom'

let Router =  () => {
  let routers = useRoutes([
    { path: '/', element: <App /> },
    { path: 'BlogList', element: <BlogList /> },
    { path: 'BlogDetail', element: <BlogDetail /> },
    { path: 'AddBlog', element: <AddBlog /> },
    { path: 'Test', element: <Test /> },
    { path: 'Test2', element: <Test2 /> },
    { path: 'Scroll', element: <Scroll /> },
    { path: 'Formily', element: <Formily /> },
    {
      path:'FormilyExample',
      element:<FormilyExample></FormilyExample>
    }
  ]) 
  return (
    <>
      {routers}
    </>
  );
}
export default Router