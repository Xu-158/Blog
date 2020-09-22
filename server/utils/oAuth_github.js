module.exports = app => {
    const githubClient = {
        client_id: "9dea12e41f52fccf8ee9",
        client_secret: "b56a1f20ab895611f4592ad3cd3e8f1883b953e2",
        url: "https://github.com/login/oauth/access_token",
        attestUrl:'https://github.com/login/oauth/authorize?client_id=',
        headers: { accept: 'application/json' }
    }

    const githubInfo = {
        url: "https://api.github.com/user",
        userAgent:'http://developer.github.com/v3/#user-agent-required',
    }

    app.set('githubClient', githubClient)
    app.set('githubInfo', githubInfo)
}; 