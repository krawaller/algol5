import api from './engine'

let UI = api.startGame('semaphor');

UI = api.performAction(UI.sessionId, 'a1');
UI = api.performAction(UI.sessionId, 'deploy');
UI = api.performAction(UI.sessionId, 'endturn');
UI = api.performAction(UI.sessionId, 'a1');

let restoredUI = api.inflateFromSave(UI.save);

console.log("OLD", UI.save, "NEW", restoredUI.save);