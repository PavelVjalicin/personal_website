# Personal website for Pavel Vjalicin

Currently hosted at: https://vjalicin.com   
Node 12 required

## Features
ES6 for both server and client.  
Server side rendering for bots to improve SEO (based on user-agent Regex validation).  
Page based bundle splitting.  
Easy deployment to Phusion Passenger.

## Development stack
Babel  
Hapi v19 Server  
React  
Material-UI  
Webpack 4  
SCSS module support  

## Dev environment setup

Create private/public keys for https server during dev  
Execute from project dir:
  
`openssl req -x509 -newkey rsa:4096 -nodes -sha256 -subj '/CN=localhost' -keyout private.pem -out cert.pem`

## Deployment 
Run: `npm run build` `npm run build-server`  
Pull git repo onto server.  
Copy server-dist, dist folders to server.  
Install non dev npm dependencies to server.  
Run `node prod.js` to start server.
