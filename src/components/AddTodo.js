import { useState,useEffect,useRef } from "react"
import './addtodo.css'
import { useAuthContext } from "../hooks/useAuthcontext"
import { useFirestore } from "../hooks/useFirestore"

import { motion } from 'framer-motion'; 



// console.log(context)
export default function AddTodo({ uid }) {
    const [item, setItem] = useState('')
    const [completed]= useState(false)
    const {user} = useAuthContext()
    const {addDocument, response} = useFirestore('Todolist')
    const [error, setError] = useState(null)
    const input = useRef(null)
    const handleSubmit =(e) => {
        e.preventDefault()
        if(item === ''){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000)
           
        }else{ 
            addDocument({
                uid,
                item,
                completed
            })
            setItem('')
        }
    }
    useEffect(() => {
        if (response.success){
            setItem('')
            input.current.focus()
        }
    }, [response.success]);

    useEffect(() => {
        input.current.focus()
   
    }, [])
    
  return (
    <div className="addtodo">
           <form onSubmit={handleSubmit}>
            <div className="imagetest">
                        <label htmlFor='add'>
                        <input 
                        type='text'
                        onChange={(e) => setItem(e.target.value)}
                        value={item}
                        required
                        placeholder={' input your todo here  ' +  user.displayName}
                        maxLength='60'
                        ref={input}

                        />
                        </label>

                        <div className="imageholder">
                            <motion.img 
                            animate={{
                                scale: [1,1.5,1.5,1,1],
                                rotate: [0,0,270, 270, 0],
                                transition: {
                                    duration: 2
                                }
                            }}
                            onClick={handleSubmit} src="libraryAdd.svg" alt='add'/>
                            <span >Add Your Todo for the Day!!</span>
                        </div>

                        {error && (<p className="error">put some tasks</p>)}
                    
            
            </div>   
             </form>

    </div>
  )
}
