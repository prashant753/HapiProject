# HapiProject
# README #


### What is this repository for? ###
GraphQL with mongoDB with hapi framework.

### How do I get set up? ###

```sh
git clone <repo name>
cd hapiproject
git checkout <branch name>
git merge origin/<branch name>

#For Local Development Environment
npm install
export APP_ENV=local
npm start

#For Docker Build
docker build -t <image-name> .

#For Docker Container
docker container run -p <exposed port>:<internal port> --name <container-name> -d <image-name>



```

### How to commit your changes ###

* git pull origin <branch name>
* git add .
* npm run commit (Add your comments)
* git push

### Tech Stack ###

* ES6 and Babel transpiler
* ESLint for code linting
* Nodejs and mongoose.
* GraphQL