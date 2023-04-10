import logo from './logo.svg';
import './App.css';

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
