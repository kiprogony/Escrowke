function get_access_token(req,res,next){
    url="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth='Basic ' + Buffer.from(process.env.consumer_key + ':' + process.env.consumer_secret).toString('base64')

    const headers={
        Authorization:auth,
    }

    axios.get(url,{
        headers,
    })
    .then((response)=>{

        let data=response.data
        let access_token=data.access_token
        req.token=access_token
        next()
    })
    .catch((e)=>{
        console.log(e.message);
    })	
}