FROM node:22-alpine
WORKDIR /app
# For deployment
# COPY server/package*.json ./ 

# For docker test
COPY package*.json ./

RUN npm install

# For deployment
# COPY server ./

#For docker test
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start"]
