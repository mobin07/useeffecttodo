import axios from "axios"
import React,{ useState,useEffect }  from "react";

const Todos = () => {

    const [limit, setLimit] = useState(5)
    const [page,setPage]=React.useState(1);
    const [totalCount,setTotalCount]=React.useState(0);
    const [todos,setTodos]=React.useState([]);
    useEffect(()=>{
       axios.get(`http://localhost:2020/todos?_page=${page}&_limit=${limit}`).then((r)=>{
        //  console.log(r);
          setTodos(r.data);
          setTotalCount(Number(r.headers["x-total-count"]));
        });
    },[page,limit])


  return (
    <div>
        <button disabled={page<=1}  onClick={()=>{
      
      setPage(page-1)
    
  }}
  >{`<`}</button>
 <select onChange={(e)=>setLimit(Number(e.target.value))}>
   <option value={"5"}>5</option>
   <option value={"10"}>10</option>
   <option value={"15"}>15</option>
   <option value={"20"}>20</option>
 </select>
  <button disabled={totalCount<=page*limit} onClick={()=>setPage(page+1)}>{">"}</button>
  {todos.map((todo)=>
  (
    
    <div key={todo.id}>
      {todo.id}{` : `}{todo.value}
    </div>

  ))}
    
    </div>
  )
}

export default Todos