import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Payment from './payment'
import Articles from './ARTICLES';
import Questions from './QUESTIONS';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
         <header>
    <nav className="navbar">
        <ul>
          <li className="l1">DEV@DEAKIN</li>
           <li><a href="/QUESTIONS">QUESTIONS</a></li>
           <li><a href="/ARTICLES">ARTICLES</a></li>
           <li><a href="/payment">Plans</a></li>
        </ul>
    </nav>
</header>
      <Routes>

        <Route path="/QUESTIONS" element={<Questions />} />
        <Route path="/ARTICLES" element={<Articles />} />
        <Route path="/payment" element={<Payment/>} />
  

      </Routes>
    </Router>
  );
}

export default App;
