import axios from 'axios';

const baseAddress = "http://localhost:3000"
//호스트 연결

async function invokeGet(){
    const request = await axios.get(`${baseAddress}/api/vl/todos`)
    return request.data
}

async function invokePost(){
    const request = await axios.get(`${baseAddress}/api/vl/todos`)
    return request.data
}

async function main(){
    const getone = await invokeGet();
    console.log(getone);

    const postone = await invokePost();
    console.log(postone);

}

main();