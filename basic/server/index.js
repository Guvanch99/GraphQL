const express=require('express')
const cors=require('cors')
const {graphqlHTTP}=require('express-graphql')

const schema=require('./schema')

const users=[{id:1,username:'hell',age:22}]

const app=express()

app.use(cors())

const createUser=(user)=>{
    console.log('b', user)
    const id=Date.now()
    return{
        ...user,id
    }
}

const root={
    getAllUsers:()=>users,
    getUser:({id})=>users.find(user=>user.id===id),
    createUser:({input})=>{
        console.log('input', input)
        const user=createUser(input)
        console.log('u',user)
         users.push(user)
        return user
    }

}

app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema,
    rootValue:root
}))

app.listen(5555,()=>console.log('server is running'))