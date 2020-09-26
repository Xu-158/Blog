module.exports = app => {
    const githubClient = {
        client_id: "19a82025eb4214511c99",
        client_secret: "06911dab4defe1e3eed3ceacd967441cc11e7c78",
        url: "https://github.com/login/oauth/access_token",
        attestUrl: 'https://github.com/login/oauth/authorize?client_id=',
        headers: { accept: 'application/json' }
    }

    const githubInfo = {
        loginAccount: "15889280255",//第一次登陆有管理员权限 github账号
        url: "https://api.github.com/user",
        userAgent: 'http://developer.github.com/v3/#user-agent-required',
    }

    app.set('githubClient', githubClient)
    app.set('githubInfo', githubInfo)
}; 