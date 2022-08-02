import { projectFirestore } from "../firebase/config";
import { useState,useEffect, useRef } from "react";


export const useCollection = (collection, _query, _orderBy, _orderBy2) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIspending] = useState(false)
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current 
    const orderBy2 = useRef(_orderBy2).current

    useEffect(() => {
        setIspending(true)
        let ref = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy, ).orderBy(...orderBy2)
        }
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
        //update state
        
        setDocuments(results)
        setError(null)
        setIspending(false)
        }, (err) => {
            console.log(err)
            setError('could not fetch data')
            setIspending(false)
        })


        return () => unsubscribe() 
    }, [collection, query, orderBy,orderBy2])
    return {documents, error, isPending}
}