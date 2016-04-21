
// ********** Boolean defs ************* //

type BOOL = TRUE | FALSE | AND | OR

type TRUE = ["true"]
type FALSE = ["false"]
type AND = ["and",BOOL,BOOL]
type OR = ["or",BOOL,BOOL]