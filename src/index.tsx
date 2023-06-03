import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './App.css'
// import App from "./App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./components/Homepage/HomePage";
import { SearchBookPage } from "./components/SearchBooksPage/SearchBookPage";
import { Navbar } from "./components/NavbarAndFooter/Navbar";
import { Footer } from "./components/Homepage/components/Footer";


const App = () => {  
  return (
      <>
      <Navbar/>
      {/*{Outlet}*/}
       <Outlet/>
      <Footer/>
      </>);
};

export default App;


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/search",
        element: <SearchBookPage />
      }
    ]
  }
  
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RouterProvider router={router}/>
);