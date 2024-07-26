const token = sessionStorage.getItem('access_token')
if(token){
    var ACCESS_TOKEN = "Bearer "+ token
}

export {ACCESS_TOKEN}