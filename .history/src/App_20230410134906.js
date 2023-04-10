import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import EditForm from './components/EditForm';

import UserFor4 from './components/User4';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter >
        <Routes> 
            <Route path='/main' element={<Main />}/>
          
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
