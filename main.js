const path = require('path')
const {app, BrowserWindow} = require('electron')
const debug = /--debug/.test(process.argv[2])

let mainWindow = null
var a;
function initialize () {
  
	makeSingleInstance()

	function createWindow () {
		const windowOptions = {
      		width: 800,
      		minWidth: 400,
      		height: 800,
      		title: app.getName(),
      			webPreferences: {
        			nodeIntegration: true
      			}
    		}

    		if (process.platform === 'linux') {
      		windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    		}

   	 	mainWindow = new BrowserWindow(windowOptions)
    		//mainWindow.loadURL("http://www.google.com")
		mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    		// Launch fullscreen with DevTools open, usage: npm run debug
    		if (debug) {
      			mainWindow.webContents.openDevTools()
     			mainWindow.maximize()
      			require('devtron').install()
    		}

    		mainWindow.on('closed', () => {
      		mainWindow = null
   		})
	}

	app.on('ready', () => {
		createWindow()
	})

	app.on('window-all-closed', () => {
    		if (process.platform !== 'darwin') {
      			app.quit()
    		}
	})

	app.on('activate', () => {
    		if (mainWindow === null) {
      			createWindow()
    		}
	})
}

function createAWindow(a){
	const windowOptions = {
                width: 400,
                minWidth: 300,
                height: 600,
		webPreferences: {
                	nodeIntegration: true
                },
		parent: mainWindow
        }
	
	aWindow = new BrowserWindow(windowOptions)
	aWindow.loadURL(a)
	//awindow.loadURL("http://www.google.com")
	createWindow()
	aWindow.show()
}

function makeSingleInstance () {
  	if (process.mas) return

  	app.requestSingleInstanceLock()

  	app.on('second-instance', () => {
    		if (mainWindow) {
     			 if (mainWindow.isMinimized()) mainWindow.restore()
      			 	mainWindow.focus()
    		}
  	})
}

initialize()
