import axios from 'axios';
import {faker} from '@faker-js/faker'

/**
 * Request 결과의 data 속성에 Response Body가 담겨져있음
 * 
 */

const baseAddress = "http://localhost:3000"

// 'Bearer ${token}'
const completeBearerToken = (token:string) => {
    return `Bearer ${token}`
}

// Get Request
async function invokeRoot(){
    const request = await axios.get(`${baseAddress}/`)
    return request.data
}

// POST Request
async function invokeSignup(){
    const request = await axios.post(`${baseAddress}/v1/auth/signup`,{
        "firstName": "choi",
        "lastName": "wonseok",
        "email": faker.internet.email(),
        "password": "password1234!"
      })
    const response = request.data
    const statusCode = response.statusCode
    const accessToken = response.access_token
    return accessToken
    
}

// POST
async function invokeCreatBoard(token:string){
    const request = await axios.post(`${baseAddress}/board`,{
        "title": faker.lorem.word(),
        "content": faker.lorem.text()
    },{
        headers: {
            "accept": "application/json",
            "Authorization": completeBearerToken(token),
            "Content-Type": "application/json"
        }
    })
    const response = request.data
    return response;
}

// Get Request with Pagination
async function invokeListBoard(token:string, page:number, limit: number){
    const request = await axios.get(`${baseAddress}/board?page=${page}&limit=${limit}&order=desc`,{
        headers: {
            "accept": "application/json",
            "Authorization": completeBearerToken(token)
        }
    })
    const response = request.data
    return response.id;
}

// Route Parameter 활용 호출
async function invokeReadSingleBoard(token:string,boardId:string){
    const request = await axios.get(`${baseAddress}/board/${boardId}`,{
        headers: {
            "accept": "application/json",
            "Authorization": completeBearerToken(token)
        }
    })
    const response = request.data
    return response.id
}

async function invokeupdateBoard(token:string,boardId:string){
    const request = await axios.patch(`${baseAddress}/board/${boardId}`,{
        "title": "up",
        "content": "date"
    },{
        headers: {
            "accept": "application/json",
            "Authorization": completeBearerToken(token),
            "Content-Type": "application/json"
        }
    })
    const response = request.data
    return response;
}

async function invokedeleteBoard(token: string, boardId: string) {
    
        const request = await axios.delete(`${baseAddress}/board/${boardId}`, {
            headers: {
                "accept": "application/json",
                "Authorization": completeBearerToken(token),
                
            }
        });
        const response = request.data
         return response;
    
}


async function main(){
    // Generate Access Token
    //const accessToken = await invokeSignup()
    //console.log(`Access Token Generated: ${accessToken}`)
    
    // 실행하는 명령어 npx ts-node test.ts
    // default
    // const rootData = await invokeRoot();
    // console.log(rootData);

    // signup
    const accessToken = await invokeSignup();
    console.log(`Access Token Generated: ${accessToken}`);
    

    //create new board
    const newBoard = await invokeCreatBoard(accessToken);
    console.log(newBoard);
    
    //read new board
    const newBoardId = newBoard.id
    const readNewBoard = await invokeReadSingleBoard(accessToken,newBoardId)
    console.log(`Created New Board: `,readNewBoard)

    const updatedBoard = await invokeupdateBoard(accessToken, newBoardId);
    console.log("Updated Board:", updatedBoard);

    const deleteResult = await invokedeleteBoard(accessToken, newBoardId);
    console.log("Delete : ",deleteResult)
    
  
    // 총 15개의 board를 생성
    // for(let i = 0; i < 15;i++){
    //     await invokeCreatBoard(accessToken)
    // }

    // loop의 i는 'page' Query Parameter의 값이 되며 limitCount는 'limit' Query Parameter의 값이 된다.
    // const limitCount = 4;
    // for(let i = 1; i <= 5; i++ ){
    //     const boards = await invokeListBoard(accessToken,i,limitCount)
    //     console.log(`In Page No.${i}, ${boards.length} datas exist`)
    // }

    // 새로운 board를 생성
    // const newBoard = await invokeCreatBoard(accessToken)

    // 새로 생성한 Board의 ID 반환
    // const newBoardId = newBoard.id
    // const readNewBoard = await invokeReadSingleBoard(accessToken,newBoardId)
    // console.log(`Created New Board: `,readNewBoard)
}

main();