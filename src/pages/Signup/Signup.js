import { useState } from "react"
import './signup.css'
import { useSignup } from "../../hooks/useSignup"
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setdisplayName] = useState('')
  const { Register, error, ispending } = useSignup()
  const handleSubmit = (e) => {
    e.preventDefault();
    Register(email,password, displayName);
  }
  return (
          <form onSubmit={handleSubmit} className='Signupform'>
            <div className="signupform_holder">
              <h2>Register Here</h2>

              <label>
                <span>username:</span>
                <input type= 'text' onChange={(e) => setdisplayName(e.target.value)} required value={displayName} />
              </label>


              <label>
                <span>Email:</span>
                <input type= 'text' onChange={(e) => setEmail(e.target.value)} required value={email} />
              </label>

              <label>
                <span>Password:</span>
                <input type= 'password' onChange={(e) => setPassword(e.target.value)} required value={password}/>
              </label>
              <ul> 
                  { !ispending && <button className="btn">sign up</button> }
                  { ispending && <button className="btn" disabled>loading</button> }
                  {ispending && <img src ='walking.gif' alt='loading-gif' className="loading"/>}
              </ul>

              { error && <p className="errmessage">{error}</p> }
            </div>
          </form>
  )
}
