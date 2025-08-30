import axios from "axios"
const UseSignup = async (email: string, password: string) => {
    try {
        const result = await axios.request({
            method: 'POST',
            url: 'http://192.168.200.128:4000/api/register',
            data:{
                email,
                password
            },
            responseType: 'json',
            timeout: 30000 // 30 seconds timeout
        })
        return result.data
    } catch (err: Error | any) {
        console.log(err.message)
        return (err.message)
    }
    
}
export default UseSignup