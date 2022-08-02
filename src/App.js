import './App.css'

//router imports 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

//components
import Navbar from './components/Navbar';

//pages
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'

//context
import { useAuthContext } from './hooks/useAuthcontext';


function App() {
  const {authisReady, user} = useAuthContext()  
   return (
    <div className="App">
      {authisReady && (
          <BrowserRouter> 
            <Navbar />  
            <Routes>
              <Route  path ='/' 
              element = {(
                <>
                {user && <Home />}
                {!user && <Navigate to ='/login' />}
                </>
              )}
              />

              <Route path ='/login' element =  {(
              <>
                {user && <Navigate to='/' />}
                {!user && <Login /> } 
              </>
                )} />

              <Route path ='/signup' element= {(
                <>
                  {user && <Navigate to='/' />}
                  {!user && <Signup /> }
                </>
              )} />


            </Routes>
          
          </BrowserRouter>)}
    </div>
  );
}

export default App

