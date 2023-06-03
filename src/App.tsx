import { Outlet, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import ReactDOM from "react-dom/client";
import {HomePage} from "./components/Homepage/HomePage";
import { Footer } from './components/Homepage/components/Footer';
import { Navbar } from './components/NavbarAndFooter/Navbar';
import { SearchBookPage } from './components/SearchBooksPage/SearchBookPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const App = () => {  
    return (
        <>
        <Navbar/>
         <Outlet/>
        <Footer/>
        </>);
};

 export default App;


