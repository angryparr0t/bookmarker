const {
    app,
    BrowserWindow
} = require("electron");

let mainWindow = null

//app模块暴露了ready事件，应用在完全启动后立即被调用
app.on("ready", () => {
    console.log("hello,electron");
    mainWindow = new BrowserWindow();
    mainWindow.webContents.loadFile('app/index.html');
});