import logo from './logo.svg';
import './App.css';

import "../src/index.css";

import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import NotFound from './NotFound';
import Signup from './Signup';

import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
        <Button variant="contained">MUI UI</Button>
				<Routes>
          <Route path="/" element={<Main />}></Route>
					<Route path="/Login" element={<Login />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="/Signup" element={<Signup />} />

					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
