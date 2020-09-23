module.exports = app => {
    const githubClient = {
        client_id: "19a82025eb4214511c99",
        client_secret: "06911dab4defe1e3eed3ceacd967441cc11e7c78",
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