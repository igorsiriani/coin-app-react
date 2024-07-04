import { Header } from './components/header/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/home';
import About from "./pages/about/about";
import Products from "./pages/products/products";
import Information from './pages/information/information';
import Contact from './pages/contact/contact';

import './assets/themes/styles.scss';

function App() {
  return <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Header />}> */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="information" element={<Information />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>

}

export default App
