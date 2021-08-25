# ITRex-Project
This project will be a single Express-based app that serves two separate, unrelated pieces of functionality  

How to run docker:  
docker build . -t node-app/node-web-app  
docker-compose up

in docker compose.yml:  
MEMORY_TYPE=1 - memory  
MEMORY_TYPE=2 - redis
MEMORY_TYPE=3 - postgres 

How to run app:  
npm start
in config.js  
storageType = 1 - memory  
storageType = 2 - redis 
storageType = 3 - postgres  