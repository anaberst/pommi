# :alarm_clock: Pommi

 :tomato:  A Pomodoro timer app built with React + TypeScript.   
 :tomato:  Designed to be simple, accessible, and pleasant to use for busy students like myself.

:link: Live Demo: https://anaberst.github.io/pommi/

<img alt="Pommi App Demo" src="./Demo.gif" width="300">

## :sparkles: Features
- Customizable timer (5 / 25 / 45 minutes)
- Audio alert on timer completion
- Light and dark theme
- Settings persisted using localStorage
- Responsive layout

## :pancakes: Tech Stack
- React
- TypeScript
- Vite
- Bootstrap

## :open_file_folder: File Structure
```
pommi/
├── README.md                           # You are here
├── Demo.gif                            # README gif
├── .gitignore
├── package.json
├── package-lock.json
└── react-app/                           # Main app directory                    
│   └── src/                             # Source files
│        └── assets/                    
│            ├── audio.wav               # Timer completion audio track
│            ├── icon.png                # Browser tab icon
│            ├── illustration-light.png  # Light mode illustration
│            ├── illustration-dark.png   # Light mode illustration
│        └── components/                 
│            ├── ConfirmModal.tsx        # Confirmation pop-up component
│            ├── Controls.tsx            # Buttons component
│            ├── FactDisplay.tsx         # Fact display component
│            ├── IllustrationDisplay.tsx # Illustration component
│            ├── SettingsModal.tsx       # Settings pop-up component
│            ├── Timer.tsx               # Timer component
│        └── styles/                     
│            ├── app-layout.css          # General app structure CSS
│            ├── theme.css               # Theme CSS
│        └── dist/                       # GitHub Pages deployment files
│            ├── assets/
│            ├── index.html
│        ├── App.tsx                     # Main app component 
│        ├── main.tsx                    # React entry point
│    ├── .gitignore
│    ├── eslint.config.js
│    ├── index.html
│    ├── package.json
│    ├── package-lock.json
│    ├── tsconfig.app.json
│    ├── tsconfig.json
│    ├── tsconfig.node.json
│    ├── vite.config.ts
```

