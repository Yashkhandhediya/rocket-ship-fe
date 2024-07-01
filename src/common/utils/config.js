const token = localStorage.getItem('access_token')
if(token){
    var ACCESS_TOKEN = "Bearer "+ token
}

export {ACCESS_TOKEN}




// const token = localStorage.getItem('access_token');
// const ACCESS_TOKEN = token ? `Bearer ${token}` : null;

// export { ACCESS_TOKEN };
