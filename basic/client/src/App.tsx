import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_USER, GET_ALL_USERS, GET_USER} from "./query/user";
import './App.css'
type State={
  id:number
  username:string
  age:number
}
const App=()=>{
  const {data,loading,error, refetch}=useQuery(GET_ALL_USERS)
  const {data:oneUser,loading:oneUserLoading}=useQuery(GET_USER,{
    variables:{
      id:1
    }
  })
  const [newUser]=useMutation(CREATE_USER)
  const [users, setUsers]=useState<State[]>([] as State[])
  const [user,setUser]=useState<Omit<State, 'id'>>({
    username:'',
    age:0
  })
  useEffect(()=>{
    if(!loading||!oneUserLoading)
      setUsers(data.getAllUsers)
  },[data])

  const handleChange=({target:{name,value}}:ChangeEvent<HTMLInputElement>)=> {
      setUser({...user, [name]: !isNaN(Number(value))?Number(value):value})
  }
  const adduser=(e:SyntheticEvent)=>{
    e.preventDefault()
    const {username,age}=user
    newUser({
      variables:{
        input:{
          username,age
        }
      }
    }).then(()=>{
      refetch()
      setUser({
        username:'',
        age:0
      })
    })
  }

  return(
    <div>
      <form>
        <input name='username' value={user.username} onChange={handleChange} type='text'/>
        <input name='age' value={user.age} onChange={handleChange} type='number'/>
        <div className='btns'>
          <button onClick={adduser}>Create</button>
        </div>
      </form>
      <div>
        {
         users.length>0 &&  users.map(({id,username,age})=>(
            <div className='user'>{id}. {username} {age} </div>
          ))
        }
      </div>
    </div>
  )
}
export default App