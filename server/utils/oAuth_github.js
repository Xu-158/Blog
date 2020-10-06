module.exports = app => {
    const baseConfig = app.get("baseConfig")
    const githubClient = {
        client_id: baseConfig.mode == "dev" ? "19a82025eb4214511c99" : "19a82025eb4214511c99",
        client_secret: baseConfig.mode == "dev" ?
            "d66d87938649286ccd047d2b352c41fea8229379"
            : "d66d87938649286ccd047d2b352c41fea8229379",
        redirect_uri: baseConfig.mode == "dev" ? "http://localhost:8080/login" : "http://localhost:8080/login",
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