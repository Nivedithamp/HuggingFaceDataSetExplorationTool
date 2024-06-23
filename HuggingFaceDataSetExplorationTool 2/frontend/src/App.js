import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/loginSignup';
import Main from './Components/Main/main';


function App() {
    return (
      <Router>
          <Routes>
              <Route exact path="/" element={<LoginSignup />} />
              <Route path="/main" element={<Main />} />
          </Routes>
      </Router>
  );
}

export default App;
