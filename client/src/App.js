// Custom components
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Main from "./Main/Main";

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
