import io from 'socket.io-client';
const serverEndpoint = 'http://46.101.29.63/'

function register(){
    return new Promise((resolve, reject) => {
        console.log('trying to register')
        fetch(serverEndpoint + '/register',{
            method: "POST",
            body: JSON.stringify({
                name: 'test'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            resolve(data._id)
        }).catch((err)=>{
            console.log(err)
        })
    })
}

function getState(){
    return new Promise((resolve, reject) => {
        console.log('getting state (GET)')
        fetch(serverEndpoint + '/state',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            resolve(data)
        }).catch((err)=>{
            console.log(err)
        })
    })
}

export {register, getState}