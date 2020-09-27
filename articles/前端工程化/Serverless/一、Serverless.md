# 一、Serverless

[[_TOC_]]

## 1. Serverless

### (1) Serverless

Serverless 翻译成中文就是`无服务器`的意思，无服务器的意思是开发者无需考虑服务器环境搭建和维护等问题，只需要专注于开发，Serverless 不是框架，而是一种`软件的部署方式`

传统的应用程序需要部署在服务器或虚拟机上，安装运行环境之后以`进程`的方式启动，Serverless 可以省略这个过程，直接使用云厂商提供的运行环境，由云厂商管理、由事件触发、以无状态的方式运行在容器内

### (2) Serverless 特点

#### ① 免维护

Serverless 不但提供了运行代码的环境，还能自动实现负载均衡、弹性压缩等高级功能，极大地降低了服务搭建的复杂性，有效提高开发和迭代速度

#### ② 费用

以阿里云的函数计算为例，费用包括调用次数、执行时间、公网流量，如下所示

![阿里云收费](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Serverless/%E9%98%BF%E9%87%8C%E4%BA%91%E6%94%B6%E8%B4%B9.png)

#### ③ 深度绑定

使用某个云厂商的 Serverless 时，一般会包括多种产品例如函数计算、对象存储、数据库等等，这些产品和云厂商深度绑定，因此如果要进行项目迁移，成本相对于部署在服务器上会增加很多

#### ④ 运行时长限制

通常云厂商对于 Serverless 中的`函数执行时间`是有限制的，例如阿里云的函数计算产品，超过`最大执行时长`需要单独申请调整时长上限，或者自行将超时函数拆分成粒度更小的函数，但这种方式会增加一定的开发成本

#### ⑤ 冷启动

函数是`按需执行`的，首次执行会创建`运行容器`，一般创建时间在几百毫秒，在延迟敏感的业务场景下需要优化

## 2. Serverless 架构

### (1) 函数即服务（Function-as-a-Service，Faas）

一个函数就是一个服务，函数可以由任何语言编写

可以理解为，你写了一个实现业务的函数，然后把这个函数丢给 Serverless 容器，Serverless 容器就会自动把这个函数映射到一个服务上面，然后你就可以直接通过 HTTP 调用这个服务接口，也就是调用这个函数了

### (2) 后端即服务（Backend-as-a-Service，BaaS）

集成了许多中间件技术，例如数据库服务、缓存、网关

BaaS 相对综合一点，它提供了一系列后端常用服务，比如数据或文件的存储、消息推送、账户系统等等

## 3. 阿里云 Serverless 实例

使用阿里云函数计算实现代码自动部署，当 github 仓库中某个分支有新的提交时，拉去最新代码并编译，然后将编译后的代码部署到 OSS 存储的静态服务器上

`HTTP 函数`负责接收 github 发出的 webhook 请求，收到请求后使用内部模块调用一个`事件函数`执行具体的操作

![github自动部署](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Serverless/github%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2.png)

### (1) HTTP 函数

考虑到可扩展性，对每个项目仓库使用了单独的配置文件，具体到代码中就是调用 `getOSSConfigFile()` 函数从 OSS 存储上读取仓库相关的配置文件信息，然后通过 `invokeFunction()` 函数调用事件函数并传递配置信息

```javascript
/**
 * ACCOUNT_ID 主账号ID
 * ACCESS_KEY_ID 访问 bucket 所需要的 key
 * ACCESS_KEY_SECRET 访问 bucket 所需要的 secret
 * REGION bucket 所在的 region
 * BUCKET 用于存储配置文件的 bucket
 */
const {
  ACCOUNT_ID,
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  REGION,
  BUCKET
} = process.env
const FCClient = require('@alicloud/fc2');
const OSS = require('ali-oss')
const getRawBody = require('raw-body')

/**
 * 从 OSS 存储上读取仓库相关的配置文件信息
 * @param {string} filePath 函数计算配置文件路径
 */
const getOSSConfigFile = async (filePath) => {
  try {
    const client = new OSS({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
      bucket: BUCKET
    });
    const result = await client.get(filePath);
    const content = result.content ? result.content.toString() : '{}'
    return JSON.parse(content)
  } catch(e) {
    console.error(e)
    return {}
  }
}

exports.handler = (req, resp) => {
  getRawBody(req, async (e, payload) => {
    const body = JSON.parse(payload)
    if (e) {
      console.error(e)
      resp.setStatusCode(400)
      resp.send('请求体解析失败')
      return
    }
    let cfg
    try {
      let config
      config = await getOSSConfigFile(`/config/${body.repository.name}.json`) || {}
      cfg = config.action[body.action]
      if (!cfg) {
        console.error(config.action, body.action)
        throw Error('未找到对应仓库的配置信息.')
      }
    } catch (e) {
      console.error(e)
      resp.setStatusCode(500)
      resp.send(e.message)
      return
    }
    if (cfg) {
      const client = new FCClient(ACCOUNT_ID, {
        accessKeyID: ACCESS_KEY_ID,
        accessKeySecret: ACCESS_KEY_SECRET,
        region: cfg.region
      });

      // 调用事件函数并传递配置信息
      client.invokeFunction(cfg.service, cfg.name, JSON.stringify(cfg)).catch(console.error)
      resp.send(`client.invokeFunction(${cfg.service}, ${cfg.name}, ${JSON.stringify(cfg)})`)
    }
  })
}
```

### (2) 事件函数

前面讲 `Serverless 函数冷启动`问题的时候提到过，函数执行完成后会存活一段时间，在这段时间内再次调用会执行之前创建的函数，短时间内重复执行的话会因为已经存在目录导致拉取失败，所以创建了随机目录并修改工作目录到随机目录下以获取写权限

然后再根据配置文件中的信息，`串行加载`对应的执行模块并传入参数

```javascript
const fs = require('fs')

/**
 * @param {*} event
 *   {
 *     repo     仓库地址
 *     region   bucket 所在区域
 *     bucket   编译后部署的bucket
 *     command  编译命令
 *   }
 * @param {*} context
 * @param {*} callback
 */
exports.handler = async (event, context, callback) => {
  const {events} = Buffer.isBuffer(event) ? JSON.parse(event.toString()) : event
  let dir = Math.random().toString(36).substr(6)

  // 设置随机临时工作目录，避免容器未销毁的情况下，重复拉取仓库失败
  const workDir = `/tmp/${dir}`

  // 为了保证后续流程能找到临时工作目录，设置为全局变量
  global.workDir = workDir
  try {
    fs.mkdirSync(workDir)
  } catch(e) {
    console.error(e)
    return
  }
  process.chdir(workDir);
  try {
    await events.reduce(async (acc, cur) => {
      await acc
      return require(`./${cur.module}`)(cur)
    }, Promise.resolve())
    callback(null, `自动部署成功.`);
  } catch(e) {
    callback(e)
  }
}
```

自动化实现拉取代码会碰见一些麻烦的细节问题

* 身份认证问题：私有仓库只能通过`密钥文件`或`账户密码`的方式认证访问权限
  * 账户密码：通过账户密码的形式登陆，需要模拟终端交互，这个实现成本相对较高
  * 密钥文件：采用配置 ssh key 的方式，具体实现是根据前面传入的配置信息，找到私钥文件所在地址并下载到本地，但因为权限问题，不能直接保存到当前用户的 .ssh 目录下
* 终端交互问题：首次进行 git clone 操作的时候，终端会出现一个是否添加 known hosts 的提示，需要键盘输入 Y、N 来继续后续操作，具体实现是使用 shell 脚本来关闭这个提示
  
  ```shell
  #!/bin/sh
  ID_RSA=/tmp/id_rsa
  exec /usr/bin/ssh -o StrictHostKeyChecking=no -o GSSAPIAuthentication=no -i $ID_RSA "$@"
  ```

解决了身份认证问题和终端交互问题之后，剩下的逻辑就比较简单了，执行 git clone 命令拉取仓库代码就行，为了加快速下载速度，可以通过设置 `--depth 1` 这个参数来指定只拉取最新提交的代码

```javascript
const OSS = require('ali-oss')
const cp = require('child_process')
const { BUCKET, REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET } = process.env
const shellFile = 'ssh.sh'
/**
 * 
 * @param {string} repoURL 代码仓库地址
 * @param {string} repoKey 访问代码仓库所需要的密钥文件路径
 * @param {string} branch  分支名称
 */
const downloadRepo = async ({repoURL, repoKey, branch='master'}, retryTimes = 0) => {
  try {
    console.log(`Download repo ${repoURL}`);
    process.chdir(global.workDir)
    const client = new OSS({
      accessKeyId: ACCESS_KEY_ID,
      accessKeySecret: ACCESS_KEY_SECRET,
      region: REGION,
      bucket: BUCKET
    });
    await client.get(repoKey, `./id_rsa`);
    await client.get(shellFile, `./${shellFile}`);
    cp.execSync(`chmod 0600 ./id_rsa`);
    cp.execSync(`chmod +x ./${shellFile}`);
    cp.execSync(`GIT_SSH="./${shellFile}" git clone -b ${branch} --depth 1 ${repoURL}`);
    console.log('downloaded');
  } catch (e) {
    console.error(e);
    if (retryTimes < 2) {
      downloadRepo({repoURL, repoKey, branch}, retryTimes++);
    } else {
      throw e
    }
  }
};
module.exports = downloadRepo
```

安装依赖并构建这个步骤没有太多复杂的地方，通过子进程调用 `yarn install --check-files` 命令，然后执行 package.json 文件中配置的脚本任务即可，具体代码如下

```javascript
const cp = require('child_process')

const install = (repoName, retryTimes = 0) => {
  try {
    console.log('Install dependencies.');
    cp.execSync(`yarn install --check-files`);
    console.log('Installed.');
    retryTimes = 0
  } catch (e) {
    console.error(e.message);
    if (retryTimes < 2) {
      console.log('Retry install...');
      install(repoName, ++retryTimes);
    } else {
      throw e
    }
  }
}
const build = (command, retryTimes = 0) => {
  try {
    console.log('Build code.')
    cp.execSync(`${command}`);
    console.log('Built.');
  } catch (e) {
    console.error(e.message);
    if (retryTimes < 2) {
      console.log('Retry build...');
      build(command, ++retryTimes);
    } else {
      throw e
    }
  }
};

module.exports = ({
  repoName,
  command
}) => {
  const {
    workDir
  } = global
  process.chdir(`${workDir}/${repoName}`)
  install(repoName)
  build(command)
}
```

最后上传部署可以根据不同的场景编写不同的模块，比如有的可能部署在 OSS 存储上，会需要调用 OSS 对应的 SDK 进行上传，有的可能部署在某台服务器上，需要通过 scp 命令来传输，以下实例是部署到 OSS 存储

由于未找到阿里云 OSS SDK 中上传目录的功能，所以只能通过深度遍历的方式来逐个将文件进行上传，考虑编译后生成地文件数量并不多，这里没有做并发数限制，而是将全部文件进行批量上传

```javascript
const path = require('path');
const OSS = require('ali-oss');
// 遍历函数
const traverse = (dirPath, arr = []) => {
  var filesList = fs.readdirSync(dirPath);
  for (var i = 0; i < filesList.length; i++) {
    var fileObj = {};
    fileObj.name = path.join(dirPath, filesList[i]);
    var filePath = path.join(dirPath, filesList[i]);
    var stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      traverse(filePath, arr);
    } else {
      fileObj.type = path.extname(filesList[i]).substring(1);
      arr.push(fileObj);
    }
  }
  return arr
}
/**
 * 
 * @param {string} repoName
 * 
 */
const deploy = ({ dist = '', source, region, accessKeyId, accessKeySecret, bucket, repoName }, retryTimes = 0) => new Promise(async (res) => {
  const { workDir } = global
  console.log('Deploy.');
  try {
    const client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    });
    process.chdir(`${workDir}/${repoName}`)
    const root = path.join(process.cwd(), source)
    let files = traverse(root, []);
    await Promise.all(files.map(({ name }, index) => {
      const remotePath = path.join(dist, name.replace(root + '/', ''));
      console.log(`[${index}] uploaded ${name} to ${remotePath}`);
      return client.put(remotePath, name);
    }));
    res();
    console.log('Deployed.');
  } catch (e) {
    console.error(e);
    if (retryTimes < 2) {
      console.log('Retry deploy.');
      deploy({ dist, source, region, accessKeyId, accessKeySecret, bucket }, ++retryTimes);
    } else {
      throw e
    }
  }
})
module.exports = deploy
```
