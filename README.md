# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# To get Started
- open terminal
- git clone  https://github.com/Rufus100Procent/react-music-app.git
- npm install
- docker compose up -d --build
- npm run dev
- go to browser > http://localhost:5173/


# Requirment
- docker installed  ----> https://www.docker.com/get-started/
- npm/node
- git
- browser   


# Site

![image](https://github.com/user-attachments/assets/ec8cb784-2fe1-4e02-9fea-cb9684ac353b)

# Backend

Backend is written using java and spring framwork. when you run, [docker-compose.yml](https://github.com/Rufus100Procent/react-music-app/blob/master/docker-compose.yml) in terminal by using the command ```docker compose up -d --build```
you will build backend and database in localy, and backend will be accessable via http://localhost:8589, you can start focusing on developing the frontend. the backend also has old frontend using html,css,js, you can access that by going to 
http://localhost:8589 in the browser.

Backend source code https://github.com/Rufus100Procent/StykleMusicApplication
