import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainPage from './components/page/MainPage';
import DetailPage from './components/page/DetailPage';
import CartPage from './components/page/CartPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage></MainPage>}></Route>
          <Route path='/detail/:productId' element={<DetailPage></DetailPage>}></Route>
          <Route path='/cart/:productId' element={<CartPage></CartPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
