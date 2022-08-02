import { useAuthContext } from "../../hooks/useAuthcontext"
import AddTodo from "../../components/AddTodo"
import Todolister from "../../components/Todolister"
import './home.css'
import { useCollection } from "../../hooks/useCollection"

import { motion } from 'framer-motion';

export default function Home() {
  const {user} = useAuthContext()
  const { documents, error, isPending} = useCollection('Todolist', ['uid', '==', user.uid ], ['completed', 'desc'], ['createdAt', 'desc'])
 
  const todovariants = {
    hidden:{
        x: '-100vw',
    },
    visible:{
        x: 0,
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness:200, 
        },
    }
}

  return (
    <div className="top">
          <AddTodo uid ={user.uid}/>
        <motion.section
         variants={todovariants}
         initial= 'hidden'
         animate ='visible'
         className="Todo_holder" >
              {isPending && (<img src ='hourglass2.gif' alt="hourglassgif" />)}
              {error && (<p className='homeerror'>{error}</p>)}
              {documents && <Todolister todos ={documents} />}
        </motion.section>
      </div>
  )
}
