
import './App.scss';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Scanner from './pages/Scanner/Scanner';
import RestMap from './pages/RestMap/RestMap';
import Emergency from './pages/Emergency/Emergency';
import Favorite from './pages/Favorite/Favorite';
import Diary from './pages/Diary/Diary';
import Traductor from './pages/Traductor/Traductor';
import { useState } from 'react';
import { JwtContext } from './shared/contexts/JwtContext';
import { IsAllergicContext } from './shared/contexts/IsAllergicContext';
import { ProductContext } from './shared/contexts/ProductContext';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RequireAuth from './shared/components/RequireAuth';
import LoginAuth from './shared/components/LoginAuth';
import ResultScanner from './pages/ResultScanner/ResultScanner';
import Profile from './pages/Profile/Profile';
import Shared from './pages/Shared/Shared';
import Terms from './pages/Terms/Terms';







function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);
  const [isAllergic, setIsAllergic]=useState(0);
  const [product, setProduct]=useState({});
  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
    <IsAllergicContext.Provider value={{ isAllergic, setIsAllergic }}>
    {/* <ProductContext.Provider value={{ product, setProduct }}> */}
    <div>
    <Router>
        <Routes>
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/scanner" element={<RequireAuth><Scanner props={{product,setProduct}} /></RequireAuth>} />
          <Route path="/resultscanner" element={<RequireAuth><ResultScanner props={{product,setProduct}} /></RequireAuth>} />
          <Route path="/restaurant-map" element={<RequireAuth><RestMap /></RequireAuth>} />
          <Route path="/emergency" element={<RequireAuth><Emergency /></RequireAuth>} />
          <Route path="/favorite" element={<RequireAuth><Favorite /></RequireAuth>} />
          <Route path="/diary" element={<RequireAuth><Diary /></RequireAuth>} />
          <Route path="/shared" element={<RequireAuth><Shared /></RequireAuth>} />
          <Route path="/terms" element={<RequireAuth><Terms /></RequireAuth>} />
          <Route path="/traductor" element={<RequireAuth><Traductor /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/" element={<LoginAuth><LoginPage /></LoginAuth>} />


     
        </Routes>

     </Router>
      
    </div>
    {/* </ProductContext.Provider> */}
    </IsAllergicContext.Provider>
    </JwtContext.Provider>
  );
}

export default App;
