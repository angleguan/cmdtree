---
title: Nginx的安装及配置
date: 2017-07-23T22:20:36+00:00
layout: post
category: use
---
> 测试环境：Centos 7.2



# 一、安装依赖库

```
$ sudo yum install gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl--devel -y
```

# 二、安装Nginx
```
$ cd /usr/local/
$ wget http://nginx.org/download/nginx-1.8.0.tar.gz
$ tar -zxvf nginx-1.8.0.tar.gz
$ cd nginx-1.8.0  
$ ./configure --prefix=/usr/local/nginx 
$ make
$ make install
```

# 三、启动
```
$ /usr/local/nginx/sbin/nginx
```

打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功。

![](/pics/2017/07/fzy_screenshot20170723115712.png)

部分命令如下：

重启：

```
$ /usr/local/nginx/sbin/nginx –s reload
```

停止：

```
$ /usr/local/nginx/sbin/nginx –s stop
```

测试配置文件是否正常：

```
$ /usr/local/nginx/sbin/nginx –t
```


强制关闭：

```
$ pkill nginx
```

# 四、配置

以上安装方法nginx的配置文件位于
```
/usr/local/nginx/conf/nginx.conf
```
Nginx配置文件常见结构的从外到内依次是「http」「server」「location」等等，缺省的继承关系是从外到内，也就是说内层块会自动获取外层块的值作为缺省值。

## Server

接收请求的服务器需要将不同的请求按规则转发到不同的后端服务器上，在 nginx 中我们可以通过构建虚拟主机（server）的概念来将这些不同的服务配置隔离。
```
server {
    listen       80;
    server_name  localhost;
    root   html;
    index  index.html index.htm;
}
```

这里的 listen 指监听端口，server_name 用来指定IP或域名，多个域名对应统一规则可以空格分开，index 用于设定访问的默认首页地址，root 指令用于指定虚拟主机的网页跟目录，这个地方可以是相对地址也可以是绝对地址。

通常情况下我们可以在 nginx.conf 中配置多个server，对不同的请求进行设置。就像这样：

```
server {
    listen       80;
    server_name  host1;
    root   html;
    index  index.html index.htm;
}
server {
    listen       80;
    server_name  host2;
    root   /data/www/html;
    index  index.html index.htm;
}
```

但是当 server 超过2个时，建议将不同对虚拟主机的配置放在另一个文件中，然后通过在主配置文件 nginx.conf 加上 include 指令包含进来。更便于管理。
```
include vhosts/*.conf;

```
就可以把vhosts的文件都包含进去啦。

## Localtion

每个 url 请求都会对应的一个服务，nginx 进行处理转发或者是本地的一个文件路径，或者是其他服务器的一个服务路径。而这个路径的匹配是通过 location 来进行的。我们可以将 server 当做对应一个域名进行的配置，而 location 是在一个域名下对更精细的路径进行配置。

以上面的例子，可以将root和index指令放到一个location中，那么只有在匹配到这个location时才会访问root后的内容：

```
    location / {
        root   /data/www/host2;
        index  index.html index.htm;
    }
```


## location 匹配规则

```
~      波浪线表示执行一个正则匹配，区分大小写
~*    表示执行一个正则匹配，不区分大小写
^~    ^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
=      进行普通字符精确匹配

```
匹配例子：
```
location  = / {
  # 只匹配"/".
  [ configuration A ] 
}
location  / {
  # 匹配任何请求，因为所有请求都是以"/"开始
  # 但是更长字符匹配或者正则表达式匹配会优先匹配
  [ configuration B ] 
}
location ^~ /images/ {
  # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
  [ configuration C ] 
}
location ~* \.(gif|jpg|jpeg)$ {
  # 匹配以 gif, jpg, or jpeg结尾的请求. 
  # 但是所有 /images/ 目录的请求将由 [Configuration C]处理.   
  [ configuration D ] 
}

请求:

/ -> 符合configuration A
/documents/document.html -> 符合configuration B
/images/1.gif -> 符合configuration C
/documents/1.jpg ->符合 configuration D


```
## 静态文件映射



访问文件的配置主要有 root 和 aliasp's 两个指令。这两个指令的区别容易弄混：

### alias

alias后跟的指定目录是准确的，并且末尾必须加 /。

```
    location /c/ {
        alias /a/;
    }

```
如果访问站点http://location/c访问的就是/a/目录下的站点信息。

### root

root后跟的指定目录是上级目录，并且该上级目录下要含有和location后指定名称的同名目录才行。


```
    location /c/ {
        root /a/;
    }

```

这时访问站点http://location/c访问的就是/a/c目录下的站点信息。

如果你需要将这个目录展开，在这个location的末尾加上「autoindex on; 」就可以了

## 转发

配置起来很简单比如我要将所有的请求到转移到真正提供服务的一台机器的 8001 端口，只要这样：

```
location / {
    proxy_pass 172.16.1.1:8001;
}

```
这样访问host时，就都被转发到 172.16.1.1的8001端口去了。

## 负载均衡


```
upstream myserver; {
    ip_hash;    
    server 172.16.1.1:8001;
    server 172.16.1.2:8002;
    server 172.16.1.3;
    server 172.16.1.4;
}
location / {
    proxy_pass http://myserver;
}

```
我们在 upstream 中指定了一组机器，并将这个组命名为 myserver，这样在 proxypass 中只要将请求转移到 myserver 这个 upstream 中我们就实现了在四台机器的反向代理加负载均衡。其中的 ip_hash 指明了我们均衡的方式是按照用户的 ip 地址进行分配。另外还有轮询、指定权重轮询、fair、url_hash几种调度算法。

# 总结

以上是最简单的通过 nginx 实现静态文件转发、反向代理和负载均衡的配置。在 nginx 中所有的功能都是通过模块来实现的，比如当我们配置 upstream 时是用 upstream 模块，而 server 和 location 是在 http core 模块，其他的还有流控的 limt 模块，邮件的 mail 模块，https 的 ssl 模块。他们的配置都是类似的可以再 nginx 的模块文档中找到详细的配置说明。

