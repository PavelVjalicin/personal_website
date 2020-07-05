Personal website for Pavel Vjalicin

NodeJS 12 required

Create private/public keys for HTTP2 connection during dev execute from project dir:
  
`openssl req -x509 -newkey rsa:4096 -nodes -sha256 -subj '/CN=localhost' -keyout private.pem -out cert.pem`