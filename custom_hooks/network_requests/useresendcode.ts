import axios from "axios";

const UseResendCode = async (email:string) => {
    try {
        const result = await axios.request({
            url: 'http://192.168.200.128:4000/api/register/verifyemail/resendcode',
            method: 'POST',
            data:{
                email
            },
            responseType: 'json',
            timeout: 30000
        })
        return result.data
    } catch (error: Error | any) {
        console.log(error.message)
        return (error.message)
    }

}

export default UseResendCode