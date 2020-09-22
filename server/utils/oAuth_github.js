module.exports = app => {
    const githubClient = {
        client_id: "9dea12e41f52fccf8ee9",
        client_secret: "90ee18d6ed60af6a0249761a39d2d3f1073e4906",
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