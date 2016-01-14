import API from "./api";


const special = {
	ANYTHING: ()=> true,
	LAYERNAME: ()=> true,
	MARKNAME: ()=> true,
	CONTEXTPOSNAME: ()=> true,
	CONTEXTVALNAME: ()=> true
}

const processExpression = (type,def)=> {
	if (type==="value" && !Array.isArray(def)){
		def = ["val",def];
	}
	const [cmnd,...args] = def;
	if (!API[type] || !API[type][cmnd]){
		throw "Unknown - "+type+" - "+cmnd;
	}
	return [cmnd].concat(API[type][cmnd].map((argtype,n)=>{
		const item = args[n];
		if (special[argtype]){
			special[argtype](item);
			return item;
		} else {
			return processExpression(argtype,item);
		}
	}));
}

const expr = ["ifelse",["not",["true"]],5,["sum",2,0]];

console.dir(API,{depth:null});

console.log("TESTING",processExpression("value",expr));