const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const readline = require('readline');

const server = {
  name: 'root',
  host: '47.107.105.76',
  port: 22,
  username: 'root',
  password: 'xxx',
  path: '/data/Blog/server/admin'
};

//读取用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

new Promise((resolve, reject) => {
  rl.question('请输入服务器密码:', (answer) => {
    if (!answer) reject('未输入密码')
    resolve(answer)
  })
}).then((value) => {

  server.password = value

  const spinner1 = ora('正在将admin发布到服务器...');
  spinner1.start();
  scpClient.scp(
    '../server/admin', {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path
  },
    function (err) {
      spinner1.stop();
      if (err) {
        console.log(chalk.red('admin发布失败.\n'));
        throw err;
      } else {
        console.log(chalk.green('Success! 成功将admin发布到服务器! \n'));
      }
    }
  );

  const spinner2 = ora('正在将web发布到服务器...');
  server.path = '/data/Blog/server/web'
  spinner2.start();
  scpClient.scp(
    '../server/web', {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path
  },
    function (err) {
      spinner2.stop();
      if (err) {
        console.log(chalk.red('web发布失败.\n'));
        throw err;
      } else {
        console.log(chalk.green('Success! 成功将web发布到服务器! \n'));
      }
    }
  );
}).catch((e) => {
  console.log(chalk.red(e));
})
