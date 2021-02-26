# Pratech Test App
#### The following is a SPA built in React (Partial implementation) and NodeJS with ExpressJS web framework using MongoDB deployed with docker that supports CRUD operations of registers and has authentication with JWT.
### Environment variables configuration
For setting the different environment variables for the docker containers, look for the .env file

## Requirements
This installation requires the previous installation of NodeJS, docker V1.13+ and docker-compose. 


## API starting commands
In order to start the API, run the following command in the root of this repository:
``` console
docker-compose up -d
```
## Endpoints

### Create a user - Sign Up (POST)
``` 
http://localhost:5000/users/signup
```
#### Create a user - Sign Up Request Payload structure
```
{
  "username": string, 
  "password": string
}
``` 
### Log In (POST)
``` 
http://localhost:5000/users/signup
```
#### Log In Request Payload structure
```
{
  "username": string, 
  "password": string
}
```
###NOTE:
### ****For the following requests, ensure you have a bearer token by logging in previously and including it in the request headers
### Create a register (POST)
``` 
http://localhost:5000/registers/
```
#### Create Register Request Payload structure
```
{
  [key:string]:any
}
``` 
### Get a single register (GET)
``` 
http://localhost:5000/registers/:id
```
### Get all registers (GET)
``` 
http://localhost:5000/registers/
```
### Update a register (PUT)
``` 
http://localhost:5000/registers/:id
```
#### Update Register Request Payload structure
```
{
  [key:string]:any
}
```  
#### Delete a register (DELETE)
``` 
http://localhost:5000/registers/:id
```
## SPA (Partial development)
## API starting commands
In order to start the SPA, run the following command inside the front-end folder of this repository:
``` console
ionic serve
```
