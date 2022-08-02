import { Link } from "react-router-dom"
import './navbar.css'
import { useAuthContext } from "../hooks/useAuthcontext"
import { useLogout } from "../hooks/useLogout"

import Typewriter from 'typewriter-effect';

export default function Navbar() {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  return (
    <nav className="navbar">
      <ul>
         {user && (<li className="title"> <Link to = '/'>Hi <span><Typewriter options={{ strings: user.displayName, autoStart: true,loop: true,}}/></span></Link></li>)}
         {!user && (<li className="title"> <Link to = '/'>Hi New User</Link></li>) }

        <div>
              <div className="flex_test">

                    {!user && (<>
                    <li><Link to = '/login'>Login</Link></li>
                    <li><Link to = '/Signup'>Signup</Link></li>
                    </>)}

                    {user && (<>
                    <li className ='logout' onClick={logout}>LogOut</li>
                  
                    </>)}
                </div>
          </div>

      </ul>

    </nav>
  )
}
