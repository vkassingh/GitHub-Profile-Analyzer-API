# GitHub Profile Analyzer

A Node.js Express application that analyzes GitHub user profiles, computes repository insights, and stores the results in a MySQL database.

## 🚀 Overview

`github-profile-analyzer` fetches GitHub user profile data and repositories using the GitHub REST API, calculates analytics such as total stars, total forks, and top programming language, then saves the output to a local MySQL table.

## 🔍 Features

- Analyze GitHub user profiles by username
- Fetch GitHub profile metadata and repository list
- Compute:
  - total stars
  - total forks
  - most frequently used repository language
- Persist analysis results to MySQL
- Retrieve all analyzed profiles or a specific profile by username

## 📁 Project Structure

- `server.js` — Express server entry point
- `routes/profileRoutes.js` — API route definitions
- `controllers/profileController.js` — request handlers and controller logic
- `services/githubService.js` — GitHub API integration
- `services/analysisService.js` — analytics calculation logic
- `models/profileModel.js` — MySQL persistence logic
- `config/db.js` — MySQL connection pool configuration
- `schema..sql` — database schema and table creation script

## ⚙️ Requirements

- Node.js 18+ (recommended)
- npm
- MySQL database
- Optional: GitHub Personal Access Token for higher GitHub API rate limits

## ✅ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/github-profile-analyzer.git
cd github-profile-analyzer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
GITHUB_TOKEN=your_github_token   # optional
PORT=3000                        # optional
```

4. Create the database and table by running the SQL script in your MySQL client:

```sql
SOURCE schema..sql;
```

> Note: If you use a different database name, update `DB_NAME` in the `.env` file.

## 🧪 Run the App

Start the server in production mode:

```bash
npm start
```

Start the server in development mode with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

## 🌐 Live Deployment

The application is deployed and live at:

```
https://git-hub-profile-analyzer-api-phi.vercel.app
```

You can use this link directly to test the API without setting up a local instance.

## 📡 API Endpoints

### `POST /api/profiles/analyze`

Analyze a GitHub username and save profile insights.

**Base URL:** `https://git-hub-profile-analyzer-api-phi.vercel.app`

Request body:

```json
{
  "username": "octocat"
}
```

**Example with cURL (Live):**

```bash
curl -X POST https://git-hub-profile-analyzer-api-phi.vercel.app/api/profiles/analyze \
  -H "Content-Type: application/json" \
  -d '{"username": "octocat"}'
```

**Example with cURL (Local):**

```bash
curl -X POST http://localhost:3000/api/profiles/analyze \
  -H "Content-Type: application/json" \
  -d '{"username": "octocat"}'
```

Response example:

```json
{
  "message": "Profile analysis for 'octocat' saved successfully.",
  "insights": {
    "username": "octocat",
    "name": "The Octocat",
    "public_repos": 8,
    "followers": 1000,
    "total_stars": 123,
    "total_forks": 45,
    "top_language": "JavaScript"
  }
}
```

### `GET /api/profiles`

Returns a list of all analyzed GitHub profiles.

**Example with cURL (Live):**

```bash
curl https://git-hub-profile-analyzer-api-phi.vercel.app/api/profiles
```

**Example with cURL (Local):**

```bash
curl http://localhost:3000/api/profiles
```

Response example:

```json
[
  {
    "id": 1,
    "username": "octocat",
    "name": "The Octocat",
    "public_repos": 8,
    "followers": 1000,
    "top_language": "JavaScript",
    "analyzed_at": "2026-05-29T12:00:00.000Z"
  }
]
```

### `GET /api/profiles/:username`

Fetch a stored profile analysis by username.

**Example with cURL (Live):**

```bash
curl https://git-hub-profile-analyzer-api-phi.vercel.app/api/profiles/octocat
```

**Example with cURL (Local):**

```bash
curl http://localhost:3000/api/profiles/octocat
```

Response example:

```json
{
  "id": 1,
  "username": "octocat",
  "name": "The Octocat",
  "bio": "GitHub mascot",
  "public_repos": 8,
  "followers": 1000,
  "following": 5,
  "total_stars": 123,
  "total_forks": 45,
  "top_language": "JavaScript",
  "profile_url": "https://github.com/octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "analyzed_at": "2026-05-29T12:00:00.000Z"
}
```

## 🛠 Database Schema

The application uses a single table named `github_profiles` with these columns:

- `id` — primary key
- `username` — GitHub login (unique)
- `name` — profile display name
- `bio` — GitHub bio text
- `public_repos` — public repository count
- `followers` — follower count
- `following` — following count
- `total_stars` — aggregated stars from all repos
- `total_forks` — aggregated forks from all repos
- `top_language` — most common repository language
- `profile_url` — GitHub profile URL
- `avatar_url` — avatar image URL
- `analyzed_at` — timestamp of last analysis

## 💡 Notes

- The app normalizes usernames to lowercase for storage and retrieval.
- If a GitHub user is not found, the API returns `404`.
- The GitHub token is optional but recommended for larger request volumes and to prevent rate limiting.

## 📦 Available Scripts

- `npm start` — run the app normally
- `npm run dev` — run with `nodemon` for automatic reload
- `npm test` — placeholder test script

## 🔧 Customization

- Add more analysis metrics in `services/analysisService.js`
- Extend the model in `models/profileModel.js` for more stored fields
- Add caching, pagination, or authentication in `routes/profileRoutes.js`

## 🧾 License

This project is currently licensed under `ISC`.
