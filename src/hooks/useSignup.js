import { useAuthContext } from "./useAuthcontext"
import { useState,useEffect } from "react"
import { projectAuth } from "../firebase/config"


export const useSignup = () => {
    const [error, setError] = useState(null)
    const [ispending, setIspending] = useState(false)
    const [iscancelled, setisCancelled] = useState(false)
    const {dispatch} = useAuthContext()

    const Register = async (email, password, displayName) => {
        setError(null)
        setIspending(true)
        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res){
                throw new Error('Could not complete signup')
            }
            await res.user.updateProfile({ displayName })

            //dispatch login action
            dispatch(
              {type: 'LOGIN', payload: res.user}
            )

            if(!!iscancelled){
                setError(null)
                setIspending(false)
            }

        }catch(err){
            if(!!iscancelled){
                console.log(err.message)
                setError(err.message)
                setIspending(false)
            }
        }
    }
    useEffect(() => {
        return () => setisCancelled(true);
    })
    return {Register, error, ispending}
}