#!/usr/bin/env node
const fs= require("fs");
let arguments= process.argv.slice(2);
//console.log(arguments);

let flags= [];
let filenames=[];
let secondaryArguments =[];

for(let i of arguments){
    if(i[0]=="-")
    {
        flags.push(i);

    } else if(i[0]=="$"){
        secondaryArguments.push(i.slice(1));

    }
    else{
        filenames.push(i);
    }
}
//if(flags.length == 0 && filenames.length !=0){
  //  for(let file of filenames)
    //{
      //  console.log(fs.readFileSync(file ,"utf-8"))      //  shows all the content of files if flag is not present

//    }

//}else {                                                  // show all the content of files without any space or new line 
  //  for(let flag of flags){
    //    if(flag=="-rs"){
      //      for(let file of filenames){
          //      let filedata=fs.readFileSync(file,"utf-8");
                //let filedataArray= filedata.split(" ");        //  Conversion of string in array by spaces
                
        //        let filedataArray= filedata.split(" ").join("");  // rempveall the spaces and shows string
            //    console.log(filedataArray);
 //           }
   //     }
    //}

//}

for(let file of filenames){
    let filedata= fs.readFileSync(file, "utf-8");
    for(let flag of flags){
        if(flag=="-rs"){
           // filedata= filedata.split(" ").join("");

              //OR
              filedata= removeAll(filedata, " ");
        }
        if(flag=="-rn"){                                 // remove new line
           //filedata= filedata.split("\r\n").join("");    // \r\n-> represents for new line
             
            //OR
            filedata= removeAll(filedata, "\r\n");
        }
        if(flag == "-rsc"){                                  // remove special value
           // let temp = "";
           // for(let char of filedata){
             //   if(char.charCodeAt(0)>=65 && char.charCodeAt(0)<=90 || (char.charCodeAt(0)>=97 && char.charCodeAt(0)<=122) )
               // temp= temp+char;

               for(let secars of secondaryArguments){
                   filedata= removeAll(filedata ,secars);
               }
  
               //}
           // filedata=temp;
        }
        if(flag=="-w"){
            for(let data of filedata){
                fs.writeFileSync()
            }
        }
        if(flag=="-s"){
            let data=addSequence(filedata);
            console.log(data);
        }
        if(flag=="-sn"){
            let data=addSequence(filedata);
            console.log(data);
        }

        if(flag=="-rem"){
            let ans=removeExtraLine(filedata)
            for(let i=0; i<ans.length; i++){
            console.log(ans[i]);}
        }
    }
    console.log(filedata);
}
 function removeAll(string, removedata){
     return string.split(removedata).join("");
 }
 function addSequence(content){                      // Add no. in all the lines of file
     let contentArr= content.split("\r\n");
     for(let i=0; i<contentArr.length; i++){
    
        contentArr[i]= (i+1)+ " "+contentArr[i];
     }
     return contentArr;
 }
 function addSequence(content){                      // Add no. in all the non empty  lines of file
    let contentArr= content.split("\r\n");
    let count=1;
    for(let i=0; i<contentArr.length; i++){
       if(contentArr[i]!=""){
       contentArr[i]= count+ " "+contentArr[i];
       count++;
      }
    }
    return contentArr;
}
function removeExtraLine(filedata){
    let contentArr= filedata.split("\r\n");
    let data=[];
    for(let i=1; i<contentArr.length; i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
           // console.log("*");
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            //console.log("&");
            contentArr[i]=null;
        }
     
    }
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
  return data;
}