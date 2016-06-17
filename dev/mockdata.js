/************* TYPES ***********/

var layer: {
	pos1: obj,
	pos2: obj //, ...
}

var layerbag: {
	layername1: layer,
	layername2: layer //, ...
}

var action: "a1"; // or for ex "move", it is a position or a command name

var actionfunction: "selectmark" // or win or end: it is a mark or command 

/************* BAGS ************/

var permanents = {
	connections: {
		pos: {
			dir: pos,
			dir: pos, ...
		}
	},
	BOARD: layerbag
}

var playervars = {
	ownernames: ["neutral","my","opp"], // or ["neutral","opp","my"]
	player: 1, // or 2
	otherplayer: 2, // or 1     // although, these aren't needed! :D
}

var step = {
	ARTIFACTS: layerbag,
	UNITLAYERS: layerbag,
	UNITDATA: {
		id1: obj,
		id2: obj //, ...
	},
	MARKS: {
		markname: pos,
		markname: pos //, ...
	}
	nextunitid: int, // only used if game contains spawn
	potentiallinks: {
    	action: actionfunction,
    	action: actionfunction //, ...
	},
	links: {
		action: stepid,
		action: stepid //, ...
	},
	path: [action,action,...],
	stepid: stepid
}
// TOADD: battlevars, turnvars, playervars

var turn = {
	canend: [stepid, stepid, ...],
	steps: {
		stepid: step,
		stepid: step, ...
	},
	blockedby: string
}
// TOADD: special undo object, so we don't have to copy! :)
