import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import EditForm from './components/EditForm';
import UserPage from './components/UserPage';
import EditPage from './components/EditPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter >
        <Routes> 
            <Route path='/main' element={<Main />}/>
            <Route path='/main-edit' element={<EditForm />  }/>
            <Route path='/user' element={<UserPage />  }/>
            <Route path='/edit' element={<EditPage /> }/>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
