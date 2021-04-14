module.exports = app => {
    const baseConfig = app.get("baseConfig")
    const isDev = baseConfig.mode == "dev"
    const githubClient = {
        client_id: isDev ? "19a82025eb4214511c99" : "811be2d52886c5979fde",
        client_secret: isDev ?
            "a7dd13e210a7bb366e629309f8023fb97f96c7ba"
            : "40c0548b280d8d24938aba098682eb13427b029b",
        redirect_uri: isDev ? "http://localhost:8080/login" : "http://www.xujinfeng.top/admin",
        url: "https://github.com/login/oauth/access_token",
        attestUrl: 'https://github.com/login/oauth/authorize?client_id=',
        headers: { accept: 'application/json' }
    }

    const githubInfo = {
        loginAccount: "15889280255",//登陆有管理员权限 githubID
        url: "https://api.github.com/user?",
        userAgent: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)"
    }

    app.set('githubClient', githubClient)
    app.set('githubInfo', githubInfo)
}; 