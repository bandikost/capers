import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import MainEdit from './components/Main-edit';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter >
        <Routes> 
            <Route path='/main' element={<Main />}/>
            <Route path='/main-edit' element={<MainEdit />}/>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
