import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import CompletedPage from './components/CompletedPage';
import Register from './components/Register';
import Login from './components/Login';
//import Logout from './components/Logout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    getUser();
  }, []);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const data = await fetch('/user');
    if (data) {
      console.log(`data: ${data}`);
      const user = await data.json();
      console.log(user);
      setUser(user);
    }
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav user={user} />
          <Routes>
            <Route exact path='/' element={<HomePage user={user} />} />
            <Route exact path='/completedTasks' element={<CompletedPage user={user} />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
