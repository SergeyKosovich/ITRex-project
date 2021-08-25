# ITRex-Project
This project will be a single Express-based app that serves two separate, unrelated pieces of functionality  

How to run docker:  
docker build . -t node-app/node-web-app  
docker-compose up

In docker compose.yml:  
MEMORY_TYPE=1 - memory  
MEMORY_TYPE=2 - redis
MEMORY_TYPE=3 - postgres 

How to run app:  
npm start
In config.js:  
StorageType = 1 - memory  
StorageType = 2 - redis 
StorageType = 3 - postgres  

How to test:
npm test