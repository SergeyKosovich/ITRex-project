# ITRex-Project
This project will be a single Express-based app that serves two separate, unrelated pieces of functionality  

How to run docker:  
docker build . -t app-node/node-web-app  
docker-compose up

in docker compose.yml:  
MEMORY_TYPE=1 - memory  
MEMORY_TYPE=2 - redis

How to run app:  
npm start
in config.js  
storageType = 1 - memory  
storageType = 1 - redis 