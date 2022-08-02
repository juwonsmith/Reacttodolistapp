//paginate
import ReactPaginate from 'react-paginate';

//react framer --animation
import { motion } from 'framer-motion';

import { useFirestore } from '../hooks/useFirestore'
import { useEffect,useState,useRef,useReducer} from 'react'
import './todolister.css'



export default function Todolister({ todos }) {
    const {deletedocument ,response, updateCompletedStatus} = useFirestore('Todolist');
    const [ischecked, setIsChecked] = useState(false);
    const [anid, setanId] = useState(null);
    const [test, setTest]= useState(true)
    const _updateCompletedStatus = useRef(updateCompletedStatus).current;

    //trying pagination
    const [currentTodos,setCurrentTodos] =useState([]);
    const [pageCount,setPageCount] =useState(0)
    const [todoOffset,setTodoOffset] =useState(0);
    const [curr, setCurr] = useState(1)
    const TodoPerPage = 6
    useEffect(() => {
        const endOffset = todoOffset + TodoPerPage
        setCurrentTodos(todos.slice(todoOffset, endOffset))
        setPageCount(Math.ceil(todos.length/TodoPerPage))
    }, [todoOffset,TodoPerPage,todos])
    useEffect(() => {
        setTest( currentTodos.length>=TodoPerPage || curr > 1 || pageCount >1 ? true: false)

    }, [currentTodos,pageCount,curr])

    useEffect(() => {
        if(currentTodos.length === 0 && pageCount>=1 && todos.length >=6){
            setTodoOffset(prev => prev-6)
            setCurr(curr => curr-1)
        }
    }, [currentTodos,pageCount,todos])

    const handlePageClick = (eve) => {     
        const newOffset = (eve.selected * TodoPerPage)%todos.length;
        setTodoOffset(newOffset)
        setCurr(eve.selected+ 1)
    }
    const handleClick = (id) => {
        deletedocument(id)

    }

    const  handleCheck = (e,todo) => {
        setIsChecked(!todo.completed)
        setanId(todo.id)
    }
    useEffect(() => {
        _updateCompletedStatus(anid,ischecked)
    }, [ischecked,anid,_updateCompletedStatus])
  return (
    <div className='lister'>
        <ul className='contain'>
            {currentTodos.map((todo,iiid) => ( 
                <li key={todo.id} className='value'>
                    <motion.div
                    initial = {{
                        opacity:0,
                        translateX:-50,
                    }}
                    animate = {{
                        opacity: 1,
                        translateX: 0,

                    }}
                    transition ={{
                        duration: 0.3,
                        delay: iiid * 0.1
                    }}
                    className='item'>
                        <span  className = {todo.completed ? 'checked' : ''}>
                            {todo.item}
                        </span>
                        <img src='checkCircle.svg' id={todo.id} alt='check' className='checkcircle' onClick={(e) => handleCheck(e,todo)}/>
                        <img src='close.svg' alt='delete'  className='delete' onClick={() => handleClick(todo.id)}/>
                    </motion.div>
                </li>
            ))}
        </ul>
    <div className= 'pagination-border'>
        {test && (<ReactPaginate 
        breakLabel='...'
        nextLabel={curr ===pageCount? '':'>>>'}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel=  {curr ===1 ?'':'<<<'}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'/>)}
    </div>

        
    </div>
  )
}
