import axios from "axios"

const UseVerifyEmail = async (email: string, code: string) => {
    try {
        const result = await axios.request({
            method: 'POST',
            url: 'http://192.168.200.128:4000/api/register/verifyemail',
            data:{
                email,
                code
            },
            responseType: 'json'
        })
        return result.data
    } catch (err: Error | any) {
        return(err.message)
    }
    
}
export default UseVerifyEmail