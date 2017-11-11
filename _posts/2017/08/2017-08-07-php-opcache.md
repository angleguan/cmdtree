---
title: PHP性能优化之Opcache
date: 2017-08-07T13:42:31+00:00
layout: post
category: learn
---
# 说明

PHP 5.5+版本以上的，可以使用PHP自带的opcache开启性能加速（默认是关闭的）。对于PHP 5.5以下版本的，需要使用APC加速，这里不说明，可以自行上网搜索PHP APC加速的方法。

# PHP开启opcache方法

1、打开php.ini文件

2、找到：[opcache]，设置为：

```
[opcache]
; dll地址
zend_extension=php_opcache.dll
; 开关打开
opcache.enable=1
; 开启CLI
opcache.enable_cli=1
; 可用内存, 酌情而定, 单位为：Mb
opcache.memory_consumption=528
; Zend Optimizer + 暂存池中字符串的占内存总量.(单位:MB)
opcache.interned_strings_buffer=8
; 对多缓存文件限制, 命中率不到 100% 的话, 可以试着提高这个值
opcache.max_accelerated_files=10000
; Opcache 会在一定时间内去检查文件的修改时间, 这里设置检查的时间周期, 默认为 2, 定位为秒
opcache.revalidate_freq=1
; 打开快速关闭, 打开这个在PHP Request Shutdown的时候回收内存的速度会提高
opcache.fast_shutdown=1

```

3、重启apache即可。

# 测试

配置完成后，可以使用如下代码查询opcache：

```
<?php
    phpinfo();
?>
```

访问页面可以看到以下信息

![](/pics/2017/08/fzy_screenshot20170807132328.png)

我们可以看到`Up and Running`，是已经在运行的了，这就说明已经开启成功了

tips:这里看到我的File Cache是没有打开的，开启Opcache File Cache(实验性), 通过开启这个, 我们可以让Opcache把opcode缓存缓存到外部文件中, 对于一些脚本, 会有很明显的性能提升.
在php.ini中加入:
```
opcache.file_cache=/tmp
```
这样PHP就会在/tmp目录下Cache一些Opcode的二进制导出文件, 可以跨PHP生命周期存在.


**以下是opcache的配置说明：**

```
[opcache]
zend_extension=/www/server/php/extensions/no-debug-non-zts-20160303/opcache.so

; Zend Optimizer + 的开关, 关闭时代码不再优化.
opcache.enable=1
 
; Determines if Zend OPCache is enabled for the CLI version of PHP
opcache.enable_cli=1
 
 
; Zend Optimizer + 共享内存的大小, 总共能够存储多少预编译的 PHP 代码(单位:MB)
; 推荐 128
opcache.memory_consumption=64
 
; Zend Optimizer + 暂存池中字符串的占内存总量.(单位:MB)
; 推荐 8
opcache.interned_strings_buffer=4
 
 
; 最大缓存的文件数目 200  到 100000 之间
; 推荐 4000
opcache.max_accelerated_files=2000
 
; 内存“浪费”达到此值对应的百分比,就会发起一个重启调度.
opcache.max_wasted_percentage=5
 
; 开启这条指令, Zend Optimizer + 会自动将当前工作目录的名字追加到脚本键上,
; 以此消除同名文件间的键值命名冲突.关闭这条指令会提升性能,
; 但是会对已存在的应用造成破坏.
opcache.use_cwd=0
 
 
; 开启文件时间戳验证 
opcache.validate_timestamps=1
 
 
; 2s检查一次文件更新 注意:0是一直检查不是关闭
; 推荐 60
opcache.revalidate_freq=2
 
; 允许或禁止在 include_path 中进行文件搜索的优化
;opcache.revalidate_path=0
 
 
; 是否保存文件/函数的注释   如果apigen、Doctrine、 ZF2、 PHPUnit需要文件注释
; 推荐 0
opcache.save_comments=1
 
; 是否加载文件/函数的注释
;opcache.load_comments=1
 
 
; 打开快速关闭, 打开这个在PHP Request Shutdown的时候会收内存的速度会提高
; 推荐 1
opcache.fast_shutdown=1
 
;允许覆盖文件存在（file_exists等）的优化特性。
;opcache.enable_file_override=0
 
 
; 定义启动多少个优化过程
;opcache.optimization_level=0xffffffff
 
 
; 启用此Hack可以暂时性的解决”can’t redeclare class”错误.
;opcache.inherited_hack=1
 
; 启用此Hack可以暂时性的解决”can’t redeclare class”错误.
;opcache.dups_fix=0
 
; 设置不缓存的黑名单
; 不缓存指定目录下cache_开头的PHP文件. /png/www/example.com/public_html/cache/cache_ 
;opcache.blacklist_filename=
 
 
; 通过文件大小屏除大文件的缓存.默认情况下所有的文件都会被缓存.
;opcache.max_file_size=0
 
; 每 N 次请求检查一次缓存校验.默认值0表示检查被禁用了.
; 由于计算校验值有损性能,这个指令应当紧紧在开发调试的时候开启.
;opcache.consistency_checks=0
 
; 从缓存不被访问后,等待多久后(单位为秒)调度重启
;opcache.force_restart_timeout=180
 
; 错误日志文件名.留空表示使用标准错误输出(stderr).
;opcache.error_log=
 
 
; 将错误信息写入到服务器(Apache等)日志
;opcache.log_verbosity_level=1
 
; 内存共享的首选后台.留空则是让系统选择.
;opcache.preferred_memory_model=
 
; 防止共享内存在脚本执行期间被意外写入, 仅用于内部调试.
;opcache.protect_memory=0
```

# Opcache status

有一个可视化的查看opcache优化效果的项目在Github，[GitHub - rlerdorf/opcache-status: A one-page opcache status page](https://github.com/rlerdorf/opcache-status)

将下载下来的项目放入到当前的Web服务器根目录下，直接访问即可，先看效果：

![](/pics/2017/08/fzy_screenshot20170807133858.png)

从上面的截图及项目文件看出，该Opcache工具是一个简化的GUI版本，使用它可以清楚了解和分析下面的内容：
1、缓存使用情况、剩余情况及内存浪费情况及比例；
2、缓存的keys、剩余的keys数；
3、缓存命中数以及未命中数；
4、缓存配置、状态以及缓存捕获脚本；
5、缓存的脚本文件，以视图形式划分直观显示；
 
 
# 注意事项
1、不建议Xcache和Opcache同时启用PHP优化；
因为PHP 5.5.0及后续版本已经内嵌对Opcache的支持，所以PHP意识到其重要性，相对于Xcache等第三方的PHP优化器来说，使用Opcache会是更好的选择。另外，两者同时存在的话，会使Opcache的缓存命中数大大降低，而且增加不必要的开销。
 
2、不建议在开发过程中开启Opcache
原因很明显，开启了Opcache之后，开发人员修改的内容不会立即显示和生效，因为受到opcache.revalidate_freq=60的影响，所以建议在开发并测试之后，测试性能时再行打开测试，当然，生产环境一直都要开着Opcache了哦。
 
3、不建议将Opcache指标设置太大
Opcache各项指标配置大小或是否开启，需要结合项目实际情况需求及Opcache官方建议的配置，项目的实际情况分析，可结合上面第四部分的可视化缓存信息分析调整。
 
4、不建议长期使用老版本的Opcache
建议及时关注Opcache官网动态，实时了解其的bugs修复，功能优化及新增功能，以便更好的将其应用在自己的项目中。
 
5、不建议在生产环境中，将上面介绍的开源项目放入Web服务根目录
原因很简单，因为这个开源项目并未做访问的限制和安全处理，也就是说凡是可以访问外网的用户，只要知道了访问地址就可以直接访问，所以不安全。一般下，这个开源工具只是帮助可视化分析PHP的性能，通常在开发调试阶段使用。如果就是想在生产环境开启使用，那么就必须做好安全限制工作。
