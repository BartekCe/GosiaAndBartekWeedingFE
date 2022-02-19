import React from 'react';
import MainPage from "./pages/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UpperMenu from "./components/Menu/UpperMenu";

function App() {
  return (
    <div className="App">
        <div className="upperMenu-nav">
            <UpperMenu className="upperMenu"/>
        </div>

      <MainPage/>
    </div>
  );
}

export default App;