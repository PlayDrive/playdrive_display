package main

import (
	"embed"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	isDev := os.Getenv("PD_DEV") == "1"

	// Create application with options
	err := wails.Run(&options.App{
		Title:      "PlayDrive Display",
		Width:      1280,
		Height:     720,
		Fullscreen: !isDev,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: isDev,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
