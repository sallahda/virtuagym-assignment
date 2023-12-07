# Using an official Node.js Docker runtime for the image.
FROM node:19

# Working directory will be called app.
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install the necessary dependencies in the working do
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the Docker daemon
EXPOSE 3000
    
# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
