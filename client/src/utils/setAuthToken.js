import axios from 'axios';

const setAuthToken=token=>{
    // console.log(JSON.parse(token).token);
    if(token){
        axios.defaults.headers.common['x-auth-token']=JSON.parse(token).token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;