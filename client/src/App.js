import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';


import './App.css';
import CreateDog from './components/Create Dog/CreateDog';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Landing />}/>
          <Route exact path='/home' element={<Home />}/>
          <Route path='/detail/:id' element={<Detail />}/>
          <Route exact path='/create' element={<CreateDog />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
