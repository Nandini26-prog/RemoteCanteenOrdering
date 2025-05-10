📄 SnapPick: Remote Canteen Ordering System

🥪 Overview
SnapPick is a web-based platform that allows students to place canteen orders remotely and helps canteen staff manage and prepare those orders efficiently. The system reduces queue time, improves user experience, and ensures smooth operations during peak hours.

________________________________________

🚀 Features

●	🔒 User authentication (Students, Admins, Super Admin)

●	📱 Remote ordering interface for students

●	🕒 Real-time order tracking and status updates

●	🍽 Admin dashboard for order management

●	📊 Super admin controls for overall system monitoring

●	📦 Order history and estimated pickup time

●	🌱 Clean UI with a green & white aesthetic for a fresh user experience

________________________________________



🛠️ Tech Stack
Frontend:
●	React.js

●	Tailwind CSS (optional for styling)

●	Figma (UI/UX Designing)

Backend:
●	Spring Boot (Java)

●	REST APIs

Database:
●	PostgreSQL

Others:
●	JWT (for authentication)
●	Git & GitHub (version control)
●	IntelliJ IDEA & VS Code (development)
●	pgAdmin (database management) 

________________________________________



System Architecture
●	Frontend communicates with Spring Boot REST APIs
●	Backend interacts with PostgreSQL database
●	Data flows securely with input validation and error handling
●	Role-based access control separates Student and Admin functionalities



________________________________________

Installation : Prerequisites
●	Node.js & npm
●	Java JDK 17+
●	PostgreSQL
●	Maven
________________________________________
🧑‍💻 How to Run the Project
Frontend Setup:
●	cd Source/frontend-react
●	npm install
●	npm start
Backend Setup:
●	cd “Source/backend-spring boot”
●	mvn clean install
●	mvn spring-boot:run
Database Setup:
●	Create a new PostgreSQL database (named as: snappick)
●	Edit the application.properties file in backend and edit your own username and password.
________________________________________
🧪 Functional Requirements
●	Users can register, login, and browse menu

●	Students can place or track orders

●	Admins can manage orders and update status

●	Super Admin can manage users, view reports, and monitor system health

________________________________________
🎯 Non-Functional Requirements
●	High availability and responsiveness

●	Secure data handling

●	Scalable for large user base

●	Mobile responsive design

________________________________________
🔮 Future Scope
●	Integration with UPI/Payment gateways

●	AI-based order prediction and recommendation

●	QR code-based pickup system

●	Admin-side analytics dashboard

________________________________________

👨‍👩‍👧‍👦 Contributors
●	Aastha Joshi – 2216196
●	Bhumika Rahwani – 2216253
●	Nandini Garg – 2216332
●	Nandini Jain – 2216334

