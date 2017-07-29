# myBlog
使用koa,react搭建个人博客

### 环境搭建
```bash
git clone git@github.com:myTurn2015/myBlog.git
cd myBlog
npm install
```

### 开发环境

项目采用了前后端分离开发

启动前端开发环境

`npm run dev`

接口通过webpack设置了代理,解决了异步请求跨域问题

启动后端开发环境

`npm start`

### 生产环境

windows

```bash
set NODE_ENV=production

webpack

```

mac,linux
```bash
export NODE_ENV=producton

webpack
```


### 启动

安装pm2,通过pm2来启动程序
```bash
npm install pm2 -g

pm2 start ./bin/run
```

再浏览器中打开127.0.0.1:3000可以访问

