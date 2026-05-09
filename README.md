# GhostChat - Anonymous Social Platform

An Instagram-like social platform where users can share photos, videos, and messages completely anonymously. No account creation required, no tracking, pure anonymity.

## Features

- 📸 **Anonymous Posts**: Share photos and videos without creating an account
- 💬 **Anonymous Comments & Likes**: Engage with other users' content anonymously
- 🔄 **Feed**: Discover content from other anonymous users
- 🎨 **Stories**: Share temporary content that disappears after 24 hours
- 🔐 **Privacy First**: No user tracking, no data collection
- 💾 **Local Storage**: Session-based data storage
- 🌐 **Real-time Updates**: Live feed updates using WebSockets

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Socket.io-client
- Axios

### Backend
- Node.js + Express
- Socket.io
- MongoDB (optional, can use in-memory storage)
- JWT for session management

### Database
- MongoDB for persistent storage (optional)
- In-memory storage for demo

## Project Structure

```
GhostChat/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── docs/
    ├── API.md
    └── ARCHITECTURE.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nitesh1110111/GhostChat.git
cd GhostChat
```

2. Install backend dependencies
```bash
cd backend
npm install
cp .env.example .env
npm start
```

3. Install frontend dependencies (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser

## API Endpoints

### Posts
- `POST /api/posts` - Create anonymous post
- `GET /api/posts` - Get feed
- `POST /api/posts/:id/like` - Like a post
- `DELETE /api/posts/:id` - Delete own post

### Comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

### Stories
- `POST /api/stories` - Create story
- `GET /api/stories` - Get active stories
- `DELETE /api/stories/:id` - Delete story

## Features in Detail

### Anonymous Identity
- Each user gets a random anonymous ID
- No email, username, or personal data required
- Session stored in browser localStorage

### Content Sharing
- Upload images (max 10MB)
- Add captions and hashtags
- Tag other anonymous users

### Engagement
- Like posts
- Comment on posts
- View engagement metrics

### Privacy
- No account tracking
- No third-party analytics
- Data expires after 30 days
- Users can delete their content anytime

## Security Considerations

- Rate limiting on all endpoints
- Input validation and sanitization
- CORS protection
- No sensitive data stored
- Content moderation on reported items

## Contributing

Feel free to contribute! Please read our contributing guidelines.

## License

MIT License - See LICENSE file for details

## Roadmap

- [ ] Direct messaging between anonymous users
- [ ] Video support
- [ ] Advanced filtering and search
- [ ] Trending hashtags
- [ ] User reputation system
- [ ] Mobile app
- [ ] Dark mode

## Support

For issues and questions, please open a GitHub issue.
