import * as _ from "lodash";

const universal = {
	"ifelse": ["boolean","DATATYPE","DATATYPE"],
	"playercase": ["DATATYPE","DATATYPE"]
};

const api = {
	boolean: {
		"true": [],
		"false": [],
		"not": ["boolean"],
		"same": ["value","value"],
		"different": ["value","value"],
		"morethan": ["value","value"]
	},
	value: {
		"val": ["ANYTHING"],
		"sum": ["value","value"],
		"layername": ["LAYERNAME"],
		"markpos": ["MARKNAME"],
		"contextval": ["CONTEXTVALNAME"]
	},
	set: {
		"layername": ["LAYERNAME"],
		"union": ["set","set"],
		"intersect": ["set","set"],
		"subtract": ["set","set"]
	},
	position: {
		"markpos": ["MARKNAME"],
		"contextpos": ["CONTEXTPOSNAME"]
	},
	generatorlist: {
		"LISTOF": "GENERATORNAME"
	}
};

export default _.mapValues(api,(obj,name)=>
	Object.assign(
		_.mapValues(universal,(udef,uname)=>
			udef.map(i=>i==="DATATYPE"?name:i)
		),
		obj
	)
)
