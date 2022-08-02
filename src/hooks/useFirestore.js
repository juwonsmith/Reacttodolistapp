import { projectFirestore , timestamp} from "../firebase/config";
import { useEffect,useReducer,useState } from "react";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (response, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOC':
            return { isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        case 'DELETED_DOC':
            return {isPending: false, document: null, success: true, error: null}
        case 'UPDATED_DOC':
            return {isPending: false, document:null, success:true,error: null}
        default: 
            return response
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [iscancelled, setIscancelled] = useState(false)

    //

    const ref  = projectFirestore.collection(collection)
    //only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) =>{
        // console.log(!iscancelled)
        if(!!iscancelled){
            dispatch(action)
        }
   
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
        try{
            const createdAt = timestamp.fromDate(new Date())
            const addeddoc = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({
                type: 'ADDED_DOC',
                payload: addeddoc
            })
        }catch(err){
            dispatchIfNotCancelled({
                type: "ERROR",
                payload: err.message
            })
        }
    }

    //delete a document
    const deletedocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        try{
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOC'})
        }
        catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: 'could not delete'})
        }
    }

    const updateCompletedStatus = async(id, cond) => {
        dispatch({type: 'IS_PENDING'})
        try{
            await ref.doc(id).update({completed: cond})
            dispatchIfNotCancelled({type: 'UPDATED_DOC'})

        }catch(err){
            dispatchIfNotCancelled({type: "ERROR", payload: 'could not update'})
        }
    }


    useEffect(() => {
        return () => setIscancelled(true)
    }, [])

    return {addDocument, deletedocument,updateCompletedStatus, response}
}
