
// ********** Boolean defs ************* //

type TRUE = ["true"]
type FALSE = ["false"]
type AND = ["and",BOOL]
type OR = ["or",BOOL,BOOL]
type NOT = ["not",BOOL]

type BOOL = TRUE | FALSE | AND | OR | NOT;