const pool = require('../config/db');

const ProfileModel = {
    async upsertProfile(values) {
        const query = `
            INSERT INTO github_profiles 
            (username, name, bio, public_repos, followers, following, total_stars, total_forks, top_language, profile_url, avatar_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name), bio = VALUES(bio), public_repos = VALUES(public_repos),
            followers = VALUES(followers), following = VALUES(following), total_stars = VALUES(total_stars),
            total_forks = VALUES(total_forks), top_language = VALUES(top_language),
            profile_url = VALUES(profile_url), avatar_url = VALUES(avatar_url);
        `;
        return pool.query(query, values);
    },

    async getAllProfiles() {
        const [rows] = await pool.query(
            'SELECT id, username, name, public_repos, followers, top_language, analyzed_at FROM github_profiles ORDER BY analyzed_at DESC'
        );
        return rows;
    },

    async getProfileByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM github_profiles WHERE username = ?', [username.toLowerCase()]);
        return rows[0];
    }
};

module.exports = ProfileModel;