const {
    app,
    BrowserWindow
} = require("electron");

let mainWindow = null

//app模块暴露了ready事件，应用在完全启动后立即被调用
app.on("ready", () => {
    console.log("hello,electron");
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true, // 启用 Node.js 集成
            contextIsolation: false, // 禁用上下文隔离（否则仍无法访问）

        }
    });
    mainWindow.webContents.loadFile('app/index.html');
});