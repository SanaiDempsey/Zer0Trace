# ZeroTrace
ZeroTrace is my first made website, it is a terminal-inspired secure messaging web application built with JavaScript, Firebase Authentication, Cloud Firestore, and Vite.

The application allows users to create an accounts, choose anonymous codenames, exchange messages in real time, and automatically remove messages after a short period. 

# Live Demo
[Launch ZeroTrace] https://zerotrace-14b10.web.app

## Features

- Email/password authentication using Firebase Authentication
- Codename creation before entering the chat
- Real-time messaging using Cloud Firestore
- Messages automatically delete after 5 minutes
- Terminal-inspired chat interface
- Secure logout flow
- Multi-page production build with Vite
- Deployed using Firebase Hosting

## Future plans
- Add Visual message delete animations
- Dark/light theme support
- Add a random Codename Generator
- Add Read/unread message indicators
- Allow users to change their codename
- Allow password reset functionality


## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** Firebase Authentication
- **Database:** Cloud Firestore
- **Build Tool:** Vite
- **Hosting:** Firebase Hosting
- **Version Control:** Git & GitHub


## Security & Privacy

- Firebase Authentication manages user sign-in and account access
- Firestore stores chat data and user profile information
- Environment variables keep Firebase configuration out of committed source files
- Messages are designed to automatically delete after 5 minutes
- Codename-based identities reduce the need to display personal information in chat


## Project Structure

- **index.html:** Login and signup interface
- **codename.html:** Codename selection before entering chat
- **chat.html:** Main real-time chat interface
- **src/auth.js:** Authentication and redirect logic
- **src/codename.js:** Codename creation and saving logic
- **src/chat.js:** Real-time messaging and message deletion logic
- **src/firebase.js:** Firebase initialization
- **src/style.css:** Application styling
- **vite.config.js:** Multi-page Vite build configuration
- **.env.example:** Template for required environment variables



## Project file overview
- index.html: Login and Signup interface
- codename.html: Codename selector before entering chat
- chat.html: Main chat room with terminal style UI
- auth.js: Handles signup,login, and logout flow
- style.css: Styling for the entire project
- .env.example: Template for required Firebase environment variables
