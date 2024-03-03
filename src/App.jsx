import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import BookList from "./components/BookList"
import Favorites from './components/Favorites'
import BookDetails from "./components/BookDetails"
import DropDown from "./components/DropDown"

const App=()=>{
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<BookList/>} />
    <Route path="/dropdown" element={<DropDown/>}/>
    <Route path="/books/:id" element={<BookDetails/>} />
    <Route path="/favorites" element={<Favorites/>} />
    </Routes>  
    <Footer/>
    </>
  )
}


export default App
