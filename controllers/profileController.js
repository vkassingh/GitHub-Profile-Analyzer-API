const GitHubService = require('../services/githubService');
const AnalysisService = require('../services/analysisService');
const ProfileModel = require('../models/profileModel');

const ProfileController = {
    async analyzeProfile(req, res) {
        const { username } = req.body;
        if (!username) return res.status(400).json({ error: 'Username is required' });

        try {
            const pData = await GitHubService.fetchProfile(username);
            const repos = await GitHubService.fetchRepositories(username);
            const { totalStars, totalForks, topLanguage } = AnalysisService.calculateInsights(repos);

            const values = [
                pData.login.toLowerCase(), pData.name, pData.bio, pData.public_repos,
                pData.followers, pData.following, totalStars, totalForks,
                topLanguage, pData.html_url, pData.avatar_url
            ];

            await ProfileModel.upsertProfile(values);

            res.status(200).json({
                message: `Profile analysis for '${username}' saved successfully.`,
                insights: { username: pData.login, name: pData.name, public_repos: pData.public_repos, followers: pData.followers, total_stars: totalStars, total_forks: totalForks, top_language: topLanguage }
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return res.status(404).json({ error: 'GitHub user not found' });
            }
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getAll(req, res) {
        try {
            const profiles = await ProfileModel.getAllProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    },

    async getByUsername(req, res) {
        try {
            const profile = await ProfileModel.getProfileByUsername(req.params.username);
            if (!profile) return res.status(404).json({ error: 'Profile not found in database.' });
            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    }
};

module.exports = ProfileController;