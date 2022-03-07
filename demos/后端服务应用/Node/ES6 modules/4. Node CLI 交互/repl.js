const replServer = repl.start();
const initializeContext = context => {
     context.m = 'test';
}
initializeContext(replServer.context);
replServer.on('reset', initializeContext)