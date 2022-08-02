import { useState,useEffect } from "react"
import './login.css'
import { useLogin } from "../../hooks/useLogin"

// import hourglass from '.../assets/Hourglass.gif'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error, ispending, login} = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email,password)
  }
  return (
        <form onSubmit={handleSubmit} className='form'>
          <div className="semiholder">
                  <h2 className="title"> Login Here</h2>
                  <label>
                    <span>Email: </span>
                    <input type= 'text' onChange={(e) => setEmail(e.target.value)} required value={email}  />
                  </label>
                  <label>
                    <span>Password: </span>
                    <input type= 'password' onChange={(e) => setPassword(e.target.value)} required value={password}/>
                  </label>
                  <ul>
                    {!ispending &&<button className="btn">Login</button>}
                    {ispending &&<button className="btn" disabled>Loading</button>}
                    {ispending && <img src ='walking.gif' alt='loading-gif' className="loading"/>}
                  </ul>
                  {error && <p className="err"> {error} </p>}
            </div>
        </form>

  )
}
