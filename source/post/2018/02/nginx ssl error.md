---
title: Nginx配置SSL踩坑日记
category: Unix/Linux
date: 2018-2-11 10:50:31
---

仅以此贴记录一下我在配置Nginx HTTPS时遇到的坑

**所有问题的报错信息均来自systemctl status nginx**

### unknown directive "ssl"

这个问题是由于你在nginx.conf中配置`ssl on`所致

原因：你没有给nginx安装https ssl模块

解决办法：重新安装一次你的当前版本

举例：我在上一篇文章中直接使用`./configure`生成的配置信息，你需要回到你的nginx源码解压目录，再次运行，并加上https模块

```
cd nginx-1.13.8
./configure --with-http_ssl_module
make
cp objs/nginx /usr/local/nginx/sbin/nginx
/usr/local/nginx/sbin/nginx
```

感谢[Nginx如何安装https-ssl证书 - 简书](https://www.jianshu.com/p/a2bd2c82ce3d)

### checking for OpenSSL library ... not found

接着，如果你在运行`./configure --with-http_ssl_module`之后，得到报错信息

```
checking for OpenSSL library ... not found

./configure: error: SSL modules require the OpenSSL library. You can either do not enable the modules, or install the OpenSSL library into the system, or build the OpenSSL library statically from the source with nginx by using --with-openssl= option.
```

解决办法：安装`libssl-dev`包（如果你没安装`openssl`，你需要安装一下）

感谢[ubuntu - Can't compile nginx with SSL support, OpenSSL not found - Server Fault](https://serverfault.com/questions/416571/cant-compile-nginx-with-ssl-support-openssl-not-found)

### [emerg]: bind() to 0.0.0.0:80 failed (98: Address already in use)

接着，如果你debug了半天你的nginx，然后重新启动，发现启动不了，查看status信息看到类似如下信息

```
Feb 11 02:45:44 ubuntu-s-1vcpu-1gb-sfo2-01 nginx[9635]: nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
Feb 11 02:45:45 ubuntu-s-1vcpu-1gb-sfo2-01 nginx[9635]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Feb 11 02:45:45 ubuntu-s-1vcpu-1gb-sfo2-01 nginx[9635]: nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
Feb 11 02:45:45 ubuntu-s-1vcpu-1gb-sfo2-01 nginx[9635]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
Feb 11 02:45:45 ubuntu-s-1vcpu-1gb-sfo2-01 nginx[9635]: nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
```

原因：你的80/443端口被占用了

解决办法：杀死占用进程

```
fuser -k 80/tcp
fuser -k 443/tcp
```

感谢[[emerg]: bind() to 0.0.0.0:80 failed (98: Address already in use) - EasyEngine](https://easyengine.io/tutorials/nginx/troubleshooting/emerg-bind-failed-98-address-already-in-use/)

### 总结

遇事多google！

感谢google!