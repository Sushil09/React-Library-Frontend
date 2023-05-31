import './App.css'
import {HomePage} from "./components/Homepage/HomePage";
import { Footer } from './components/Homepage/components/Footer';
import { Navbar } from './components/NavbarAndFooter/Navbar';
import { SearchBookPage } from './components/SearchBooksPage/SearchBookPage';

const App = () => {
    return (
        <>
        <Navbar/>
        {/* <HomePage/> */}
        <SearchBookPage/>
        <Footer/>
        </>)
        ;
};

 export default App;

