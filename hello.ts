import axios from 'axios';

const baseAddress = "http://localhost:3000"
//호스트 연결

async function invokeGet(){
    const request = await axios.get(`${baseAddress}/api/v1/todos`)
    return request.data
}

async function invokePost(){
    const request = await axios.post(`${baseAddress}/api/v1/todos`,{
        "title": "string",
        "content": "string",
        "is_done": true
      })
    
    return request.data
}

async function invokeRememberId(id: number){
    const request = await axios.get(`${baseAddress}/api/v1/todos/${id}`)
    const response = request.data
    return response
}

async function invokeDeleteId(id: number){
    const request = await axios.delete(`${baseAddress}/api/v1/todos/${id}`)
    const response = request.data
    return response
}

async function invokeUpdateId(id: number){
    const request = await axios.put(`${baseAddress}/api/v1/todos/${id}`,{
        "title": "up",
        "content": "date",
        "is_done": true
    })
    const response = request.data
    return response
}

async function main(){
    const getone = await invokeGet();
    console.log(getone);
   
    
    
    const readId = await invokePost();
    console.log(readId);

    const rememberId = await invokeRememberId(readId.id)
    console.log(`Remember Id: `,rememberId)

    const updateId = await invokeUpdateId(readId.id)
    console.log(`Update Id: `,updateId)

    const deleteId = await invokeDeleteId(readId.id)
    console.log(`Delete Id: `,deleteId)



}

main();