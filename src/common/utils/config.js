const token = sessionStorage.getItem('login')
if(token){
    var ACCESS_TOKEN = "Bearer "+ token
}

export {ACCESS_TOKEN}