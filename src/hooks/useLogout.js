import { useAuthContext } from "./useAuthcontext"
import { useState,useEffect } from "react"
import { projectAuth } from "../firebase/config"

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [ispending, setIspending] = useState(false)
    const [iscancelled, setisCancelled] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () => {
        setIspending(true)
        setError(null)

        try{
            await projectAuth.signOut()
            dispatch({type: 'LOGOUT'})

            if(!iscancelled){
                setError(null)
                setIspending(true)
            }
        }catch(err){
            if(!iscancelled){
                setError(err.message)
                setIspending(true)
                console.log(err.message)
            }
        }
    }
    useEffect(() => {
        return () => setisCancelled(true)
    })
    return { logout, error, ispending}
}