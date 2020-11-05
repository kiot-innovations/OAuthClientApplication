### How to Start
Put your .env file in the project root folder. Refer to `Sample.env` for required fields. 

- Obtain Client Id and Client from secret by contacting us. 
- Update PORT, APP_HOST_URL, REDIRECT_URL acording to your hosting environment. For example if you host it on program.partnerwebsite.com:3000. Then update PORT to 3000, APP_HOST_URL to http://program.partnerwebsite.com:3000 and REDIRECT_URI to http://program.partnerwebsite.com:3000/token/fetch_and_save. (Send your redirect uri/APP_HOST_URL to us)


That's it. Users will now be able to login and generate token. Modify `routes/token/index.js` file and update `fetch_and_save` route handler to handle token, you can store this code into your database directly or send it to any of your api server. 


#### Example Response from Token Service 
```JSON
{
   "access_token": "Access Token String",
   "token_type": "Bearer",
   "expires_in": 7775999,
   "refresh_token": "Refresh Token String",
   "user": {
      "id": "USER_ID",
      "phone": "USER_PHONE"
   }
}
```

### Use of Refresh Tokens
Also store refresh_token in your database, access_token have a relatively short life time, post expiry of the access_token use refresh_token to obtain access_token again. 
[Getting Access Token using refresh_token](https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/)
Use `https://api.kiot.io/oauth/token` as token url. 



### To Start Server
```
npm install
npm start
```

### Hosting
Host this application in your preferred server. 


