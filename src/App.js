import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Exercise from './components/Exercise'
import './App.css';
import Header from './components/Header';
import Error from './components/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExerciseList from './components/ExerciseList';
import "react-datepicker/dist/react-datepicker.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<ExerciseList />} />
        <Route path="/create" element={<Exercise />} />
        <Route path="/edit/:id" element={<Exercise />} />
        <Route path="/user" element={<Exercise />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
