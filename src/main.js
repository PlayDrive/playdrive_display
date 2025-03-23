const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const devMode = process.env.PLAYDRIVE_DEVMODE === "1";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        maximizable: false,
        title: "PlayDrive Display",
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        fullscreen: !devMode,
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    if (devMode) {
        mainWindow.webContents.openDevTools({mode: "detach"});
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    app.quit();
});
