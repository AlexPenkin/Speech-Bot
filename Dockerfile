FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

EXPOSE 443


# Install any needed packages specified in package.json
RUN npm install

# Run app.py when the container launches
CMD ["node", "index"]