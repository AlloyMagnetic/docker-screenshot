FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY *.js ./

EXPOSE 8080
CMD [ "npm", "start" ]
