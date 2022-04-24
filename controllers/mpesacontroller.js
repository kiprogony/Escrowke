require('dotenv').config()

const datetime=require('node-datetime')
const axios=require('axios')
const request = require('request');


module.exports.get_access_token_2=(req,res,next)=>{
    url="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth=new Buffer.from(process.env.consumer_key+':'+process.env.consumer_secret).toString('base64')//pass in the consumer key and consumer secret
    request(
        {
            url:url,
            headers:{
                "Authorization":"Basic "+auth
            }
        },
        (error,response,body)=>{
            if (error) {
                log.json(error)
            }
            else{
                req.access_token=JSON.parse(body).access_token
                next()
            }
        }
    )
}


module.exports.CallBackURI=(req, res, next)=>{
    console.log('........STK.........');
    console.log(req.body);
    res.end()
    next()
}


module.exports.stk_push2=(req, res, next)=>{
    console.log(req.body);
    const token=req.access_token
    const endpoint ="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    const auth="Bearer "+token
    let date_now=new Date()

    let month=date_now.getMonth()+1
    let second=date_now.getSeconds()
    let date=date_now.getDate()
    let hour=date_now.getHours()
    let minutes=date_now.getMinutes()

    let month_to_string=String(month)
    let second_to_string=String(second)
    let date_to_string=String(date)
    let hour_to_string=String(hour)
    let minutes_to_string=String(minutes)
    let string_month
    let string_second
    let string_date
    let string_hour
    let string_minutes
    if (month_to_string.length == 1) {
        console.log('month length',month_to_string.length);
        string_month='0'+month_to_string

    }
    if (second_to_string.length==1) {
        console.log('seconds length',second_to_string.length);
        string_second='0'+second_to_string
    }else{
        string_second=second
    }
    if (date_to_string.length==1) {
        console.log('date length',date_to_string.length);
        string_date='0'+date_to_string

    }else{
        string_date=date
    }
    if (hour_to_string.length==1) {
        console.log('hour length',hour_to_string.length);
        string_hour='0'+hour_to_string
    }else{
        string_hour=hour
    }
    if (minutes_to_string.length==1) {
        console.log('munutes length',munutes_to_string.length);
        string_minutes='0'+minutes_to_string
    }else{
        string_minutes=minutes
    }

    console.log('date____:',date);
    const timestamp=date_now.getFullYear()+''+''+string_month+''+''+string_date+''+''+string_hour+''+''+string_minutes+''+''+string_second
    console.log(date_now.getFullYear());
    console.log('month:',string_month);
    console.log('date:',string_date);
    console.log('hour:',string_hour);
    console.log('minutes:',string_minutes);
    console.log('Seconds: ',string_second);

    console.log(typeof(timestamp));
    const password=new Buffer.from(process.env.short_code+process.env.passkey+timestamp).toString('base64')
    request(
        {
            url:endpoint,
            mathod:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':auth
            },
            json:{
                'BusinessShortCode': process.env.short_code,
                'Password': password,
                'Timestamp': timestamp,
                'TransactionType': "CustomerPayBillOnline",
                'Amount': "1",
                'PartyA': "25403480368",
                'PartyB': process.env.short_code,
                'PhoneNumber': "25403480368",
                'CallBackURL': "https://43ad-197-248-137-65.eu.ngrok.io/daraja/stk/push/callback",
                'AccountReference': "Test",
                'TransactionDesc': "Processed",
            }
        },
        function(error,response,body) {
            if(error){
                console.log(error);
            }
            res.status(200).json(response)
            console.log(body);
            next()
        }
    )
}
