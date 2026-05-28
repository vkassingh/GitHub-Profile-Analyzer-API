const AnalysisService = {
    calculateInsights(repos) {
        let totalStars = 0;
        let totalForks = 0;
        const languageCounts = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
            if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
        });

        let topLanguage = 'Unknown';
        let maxCount = 0;
        for (const [lang, count] of Object.entries(languageCounts)) {
            if (count > maxCount) {
                maxCount = count;
                topLanguage = lang;
            }
        }

        return { totalStars, totalForks, topLanguage };
    }
};

module.exports = AnalysisService;