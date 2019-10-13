const env = require("./env");
const request = require('request');
const path = require("path")
const fse = require("fs-extra");
var exec = require('child_process').exec;
var ghUrl = "git@github.com:ColinRoye/"
const Git = require("nodegit")

var signature = Git.Signature.now(env.name, env.email);


async function initGHRepo(repoName){
     var headers = {
         'Authorization': 'token ' + env.ghToken,
         'user-agent': 'node.js'
     };

     var dataString = JSON.stringify({"name": repoName});

     var options = {
         url: 'https://api.github.com/user/repos',
         method: 'POST',
         headers: headers,
         body: dataString
     };

     function callback(error, response, body) {
              var ghUrl = "git@github.com:"+env.userName+"/"+repoName+".git"
              dir = exec(  "ls"
                         + " && mkdir "+ repoName
                         + " && cd "+ repoName
                         + " && git init && touch test"
                         + " && git add . "
                         + " && git commit -m \"test\""
                         + " && git remote add gh " + ghUrl
                         + " && git push --set-upstream gh master &> log"
                              , {maxBuffer: 100000 * 500} ,(t)=>{
                              })
     }

     request(options, callback);

}


const args = process.argv;
//const svcName;

if(args.length >= 3){
     repoName = args[2];
}else{
     throw new Error("Must define repo name!")
}

initGHRepo(repoName);
