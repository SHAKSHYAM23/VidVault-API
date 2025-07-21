VideoVault:


A full-stack video sharing platform inspired by YouTube, built with the MERN stack.
VideoVault allows users to upload, view, like, comment on, and manage videos, with powerful authentication and real-time features.

Table of Contents
🚀 Demo

🧩 Tech Stack

✅ Features

📁 Folder Structure

⚙️ Getting Started

🔐 Environment Variables

📡 API Endpoints

🤝 Contributing

📄 License


Tech stack 
Node.js with Express.js

MongoDB with Mongoose

JWT for authentication

Cloudinary for video/image upload

Socket.IO (planned) for real-time updates



Features
🔐 Authentication
JWT-based login & registration

Password hashing with Bcrypt

Optional email verification

📹 Video Management
Upload videos (Cloudinary)

Edit or delete videos

Track views, likes, and comments

🗣️ Social Features
Like/Dislike videos

Subscribe/Unsubscribe to users

Comment on videos

View user profiles & channels

🔍 Search & Explore
Search videos by title/tags

Explore trending & recent videos

Filter by category


 Folder Structure
 video-vault/
├── src/
│   ├── controllers/        # Route business logic
│   ├── models/             # MongoDB schemas via Mongoose
│   ├── routes/             # Express route definitions
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Cloudinary & helper functions
│   ├── db/                 # MongoDB connection logic
│   └── index.js            # Entry point of the backend server
├── .env
├── package.json
└── README.md


Insttallation steps
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/video-vault.git   ✅ CHANGE: Replace YOUR_USERNAME
cd video-vault

# 2. Install dependencies
npm install

# 3. Create a .env file
cp .env.example .env

# 4. Fill the environment variables inside .env

# 5. Run the server
npm run dev


Environmental Variable
MONGODB_URI=your_mongo_db_connection_string        
JWT_SECRET=your_jwt_secret                          
CLOUDINARY_CLOUD_NAME=your_cloud_name               
CLOUDINARY_API_KEY=your_cloudinary_api_key          
CLOUDINARY_API_SECRET=your_cloudinary_api_secret  

📡 API Endpoints (Backend)
These are some example endpoints. You can expand them as needed:

👤 Auth
POST /api/v1/users/register – Register a new user

POST /api/v1/users/login – Login and receive JWT

📹 Video
POST /api/v1/videos/upload – Upload a video

PUT /api/v1/videos/:id – Edit a video

DELETE /api/v1/videos/:id – Delete a video

GET /api/v1/videos/explore – Discover trending videos

💬 Comments
POST /api/v1/comments/:videoId – Add comment to a video

GET /api/v1/comments/:videoId – Fetch all comments

❤️ Likes & Subscriptions
POST /api/v1/videos/:id/like

POST /api/v1/users/:id/subscribe


