export type ExplanationKind = 'home' | 'flow' | 'concepts' | 'actions' | 'tiles' | 'goals' | 'units';

export type ExplanationPos = [ExplanationKind] | [ExplanationKind, string] | null;
