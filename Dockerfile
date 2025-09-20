# Étape 1 : build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./            
COPY frontend/package*.json ./    
RUN npm install
COPY frontend ./                  
RUN npm run build                 

# Étape 2 : run
FROM node:20-slim
WORKDIR /app
COPY --from=build /app .          
RUN npm install -g serve          
EXPOSE 4173                        
CMD ["serve", "-s", "dist", "-l", "4173"]
