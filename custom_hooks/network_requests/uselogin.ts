import axios from "axios";

const UseLogin = async (email:string, password: string) => {
    try {
        const result = await axios.request({
            url: 'http://192.168.249.128:4000/api/register',
            method: 'POST',
            data:{
                email,
                password
            },
            responseType: 'json'
        })
        return result.data
    } catch (error: Error | any) {
        alert(error.message)
    }

}