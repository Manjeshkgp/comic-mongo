# NodeJS Backend Setup
## Pre-requisites

You must need NodeJS installed in your device to run that, if not installed then please watch this [tutorial](https://youtu.be/06X51c6WHsQ?si=NzteDYSmQlGLlvvw) and install it.

- Must check using `node --version` in terminal
- Also check `npm --version` in terminal

## Code Setup

- First of all create a folder and open a terminal in that folder
- Now run this command `git clone https://github.com/Manjeshkgp/comic-mongo ./`
- The command given above will clone all the code written above into your local repository / folder
- Now run this command `npm i` to install all the node modules
- Now create a `.env` file inside the folder
- Add `PORT` as 9000 and also add a mongodb connection url as `DB_CONNECTION_URI`
- As of now you can use this `mongodb+srv://manjeshkgp:9QzyY7KBVt_hms@comic-mongo.dyqul.mongodb.net/?retryWrites=true&w=majority&appName=comic-mongo` as `DB_CONNECTION_URI`
- I know it's bad to share the DB Connection URL in public, but since I've no other way to share it.

## Running & Logging the Server

-  Now please run `npm start` to start the server without debugging
-  Your NodeJS server is now running perfectly fine
-  Since I added logger, so you can check all the logs about API requests in the `logs/app.log` file
-  The log file can help you to find choke points of an application, you can use datadog like services to check it
-  If you wanna debug and run the server, then please use this command `npm run dev`


That's it happy coding!
