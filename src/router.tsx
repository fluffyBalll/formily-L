import App from "./App";
import BlogList from "./page/bolgList";
import React from 'react'
import { Route, Routes, useNavigate, BrowserRouter ,useRoutes} from 'react-router-dom'

let Router =  () => {
  let routers = useRoutes([
    { path: '/', element: <App /> },
    { path: 'BlogList', element: <BlogList /> },
  ]) 
  return (
    <>
      {routers}
    </>
  );
}
export default Router