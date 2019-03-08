const processArgv = process.argv;
const processArgvLength = processArgv.length;
const fs =require('fs');
let arr=[];
let id;
var addFunction=function(taskInput)
	{ 
		
		let fileContent=readFunction();
		if(fileContent.length===0)
			{id=1;}
		else
			{id=fileContent[fileContent.length-1].id+1;}

		const newInput={'id':id,'task':taskInput,'status':false};

		fileContent.push(newInput);
		fs.writeFileSync('todoDB',JSON.stringify(fileContent));	 
	}

var readFunction=function()
	{  data = fs.readFileSync('todoDB','utf8');
	   return JSON.parse(data);}
var listFunction=function()
	{
	console.log(readFunction());	
	}
var listCheckedFunction=function()
	{
	arr=readFunction();
	let checkArr=arr.filter((val)=>{
		if(val.status==true)return true;
		return false;
	})
	console.log(checkArr);
	}
var removeFunction=function(taskId)
	{
	arr=readFunction();
	let editedArr=arr.filter((val)=>{
		if(val.id==taskId)return false;
		return true;
	})
	fs.writeFileSync('todoDB',JSON.stringify(editedArr));
	}
var editFunction=function(taskId,newTask)
	{
	arr=readFunction();
	let editedArr=arr.filter((val)=>{
		if(val.id==taskId){val.task=newTask;}
		return true;
	})
	fs.writeFileSync('todoDB',JSON.stringify(editedArr));
	}
var checkFunction=function(taskId)
	{
	arr=readFunction();
	let editedArr=arr.filter((val)=>{
		if(val.id==taskId){val.status=true;}
		return true;
	})
	fs.writeFileSync('todoDB',JSON.stringify(editedArr));
	}
var unCheckFunction=function(taskId)
	{
	arr=readFunction();
	let editedArr=arr.filter((val)=>{
		if(val.id==taskId){val.status=false;}
		return true;
	})
	fs.writeFileSync('todoDB',JSON.stringify(editedArr));
	}
var runFunction= function()
	{
	if(!fs.existsSync('todoDB'))
	{fs.writeFileSync('todoDB','[]');}
	if(processArgv[2]=='add')
	{addFunction(processArgv[3]);}
	else if (processArgv[2]=='edit')
	{editFunction(processArgv[3],processArgv[4]);}
	else if (processArgv[2]=='remove')
	{removeFunction(processArgv[3]);}
	else if (processArgv[2]=='check')
	{checkFunction(processArgv[3]);}
	else if (processArgv[2]=='uncheck')
	{unCheckFunction(processArgv[3]);}
	else if (processArgv[2]=='list')
	{listFunction();}
	else if (processArgv[2]=='listchecked')
	{listCheckedFunction();}	
	}
runFunction();
