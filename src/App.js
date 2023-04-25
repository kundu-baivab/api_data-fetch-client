import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Table from './components/Table';
import City from './components/City';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Table/>} />
          <Route path='/cities' element={<City/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
