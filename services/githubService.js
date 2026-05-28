const axios = require('axios');

const githubConfig = {
    headers: {
        'User-Agent': 'Github-Profile-Analyzer',
        ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
    }
};

const GitHubService = {
    async fetchProfile(username) {
        const response = await axios.get(`https://api.github.com/users/${username}`, githubConfig);
        return response.data;
    },

    async fetchRepositories(username) {
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, githubConfig);
        return response.data;
    }
};

module.exports = GitHubService;