import { useAuthContext } from "./useAuthcontext"
import { useState,useEffect } from "react"
import { projectAuth } from "../firebase/config"


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [ispending, setIspending] = useState(false)
    const [iscancelled, setisCancelled] = useState(false)
    const {dispatch} = useAuthContext()


    const login = async (email, password) => {
        setIspending(true)
        setError(null)
        try{
           const res = await  projectAuth.signInWithEmailAndPassword(email,password)
           dispatch({type: 'LOGIN', payload: res.user})

           if(!iscancelled){
            setIspending(false)
            setError(null)
           
           }
        }catch(err){
            if(!iscancelled){
                setIspending(false)
                setError('wrong details')
                
            }

        }
    }
    useEffect(() => {

        return () => setisCancelled(true)
}, [])

    return {error, ispending, login}
}