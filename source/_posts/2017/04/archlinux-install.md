---
title: Arch Linux 安装使用配置
date: 2017-04-16T16:38:53+00:00
category: Unix/Linux
---

> Arch Linux(或称Arch)是一种以轻量简洁为设计理念的Linux发行版。其开发团队秉承简洁、优雅、正确和代码最小化的设计宗旨。Arch Linux 项目受 CRUX 启发，由 Judd Vinet 于2002年启动。

Arch Linux下载地址

- 官方下载地址 [Arch Linux - Downloads](https://www.archlinux.org/download/)
- 阿里云镜像站 [Index of /archlinux/](https://mirrors.aliyun.com/archlinux/)
- 中科大镜像站 [Index of /archlinux/](http://mirrors.ustc.edu.cn/archlinux/)
- 网易云镜像站 [Index of /archlinux/](http://mirrors.163.com/archlinux/)

各镜像站进入后选择ISO目录选择最新版本就可以了。

官方安装wiki [Installation guide - ArchWiki](https://wiki.archlinux.org/index.php/Installation_guide)

Arch Linux是官方wiki最完善强大的Linux发行版，其社区也相当活跃，非常适合喜欢一步步diy自己Linux系统的用户使用，这里只是简单介绍一下最基本的**原生Arch Linux**（有相当多的基于Arch的发行版，例如Manjaro Linux都是相当优秀的发行版）系统的**传统**安装过程的步骤。

这里为了好操作，我使用了VirtualBox虚拟机来安装，推荐大家也先在虚拟机中使用操作一下再到实体机中使用。

# 在VirtualBox虚拟机中操作

## 配置虚拟环境

打开VirtualBox软件，选择上方【新建】

![](/pics/2017/04/1601.png)

输入虚拟机名称

![](/pics/2017/04/1602.png)

分配内存，1-2GB就可以了

![](/pics/2017/04/1603.png)

创建虚拟磁盘，选择【动态分配】还是【固定大小】

![](/pics/2017/04/1604.png)

![](/pics/2017/04/1605.png)

然后设置好磁盘空间，这里我设置20G

![](/pics/2017/04/1606.png)

然后创建成功后右键选择刚才创建的虚拟机选择设置

![](/pics/2017/04/1607.png)

依次选择来挂载一个安装镜像，选择我们刚才下载的镜像

![](/pics/2017/04/1608.png)

挂载完成后点击【启动】即可

# 配置安装环境

这里要在镜像Live中配置好安装前的环境，从这里开始的步骤在虚拟机实体机中通用

![](/pics/2017/04/1609.png)

配置好镜像启动虚拟机出现这样的画面，选择第一项

稍等一会就会进入到Live环境了，我们将在这个环境下安装好系统

首先应该分区，先建立一个Swap交换分区，依次输入如下命令

```
# fdisk /dev/sda  #选择操作的磁盘
n               #新建分区
p               #新建主分区
Enter           #输入开始的扇区，默认2048，直接回车
2000000         #输入终止的扇区，视情况选择，我这里输入2000000，约980MB
```

然后新建一个主分区，用于挂载根目录，同样是上面的步骤，输入n新建一个分区，然后一直回车即可。这里我只新建了两个分区，一个作交换分区一个挂载根目录，一般情况具体使用的话还会挂载/home,/boot等分区，这里不多加累述

![](/pics/2017/04/1612.png)

![](/pics/2017/04/1613.png)

# 开始安装

配置好分区之后开始安装系统

**修改镜像源**

因为Archlinux一直都是在线安装的，使用默认源可能会出现速度极慢或无法安装的问题，所以这里我把安装源修改为网易的镜像源

[Archlinux镜像使用帮助](http://mirrors.163.com/.help/archlinux.html)

```
# nano /etc/pacman.d/mirrorlist
```

使用nano编辑器在/etc/pacman.d/mirrorlist文件最前面添加，后面的i686是32位系统的，如果你下载的是64位系统的就改成x86_64

```
# Server = http://mirrors.163.com/archlinux/$repo/os/i686
```


![](/pics/2017/04/1615.png)


按Ctrl + o 保存

Ctrl + x 退出

**开始安装**

```
# pacstrap /mnt base base-devel
```

然后耐心等待

**生成fstab**

```
# genfstab -U -p /mnt >> /mnt/etc/fstab
```

之后就可以跳转到新系统了，使用以下命令

```
# arch-chroot /mnt
```

设置语言环境

```
# nano /etc/locale.gen     #把en_US.UTF-8 UTf-8,zh_CN.GBK GBK,zh_CN.UTF-8 UTF-8,zh_CN GB2312前面的注释去掉
# locale-gen             #更新语言环境
```

设置主机名和密码

```
# nano /etc/hostname
```

设置root密码

```
# passwd
```

安装引导器

```
# pacman -S grub os-prober
# grub-install --target=i386-pc /dev/mnt
# grub-mkconfig -o /boot/grub/grub.cfg
```

卸载分区并重启

```
# exit
# umount /mnt
# shutdown now
```

关机之后，如果是虚拟机则把刚才挂载的镜像删除，如果是实体机则把安装介质移除

然后开机就可以进入到新系统了

![](/pics/2017/04/1617.png)

熟悉的grub2引导界面

![](/pics/2017/04/1618.png)

输入root和密码。

**上面的安装有个疏落，就是没有安装任何的网络管理工具，这有可能会导致我们初次进入系统是没有网络的**

**如果是在虚拟机中，按照刚才的方式进入新系统后，是没有网络连接的这时候输入`dhcpcd`即可，然后执行`systemctl enable dhcpcd.service`可以加入开机自启即可。**

# 使用配置

## 显卡驱动

```
# lspci | grep VGA    # 确定显卡型号
# pacman -S <驱动包>
#
# # 官方仓库提供的驱动包：
# # +----------------------+--------------------+--------------+
# # |                      |        开源        |     私有     |
# # +----------------------+--------------------+--------------+
# # |         通用         |   xf86-video-vesa  |              |
# # +----------------------+--------------------+--------------+
# # |         Intel        |  xf86-video-intel  |              |
# # +--------+-------------+--------------------+--------------+
# # |        | GeForce 9+  |                    |    nvidia    |
# # +        +-------------+                    +--------------+
# # | nVidia | GeForce 8/9 | xf86-video-nouveau | nvidia-340xx |
# # +        +-------------+                    +--------------+
# # |        | GeForce 6/7 |                    | nvidia-304xx |
# # +--------+-------------+--------------------+--------------+
# # |        AMD/ATI       |   xf86-video-ati   |              |
# # +----------------------+--------------------+--------------+

```

> 虚拟机安装Arch Linux的显卡驱动参考下面

```
VirtualBox: community/virtualbox-guest-dkms

VMWare: extra/xf86-video-vmware
```

安装中文字体

```
# pacman -S adobe-source-han-sans-cn-fonts # 可选，思源黑体
```

### 安装桌面环境
```
# pacman -S <桌面环境>
```

官方仓库提供的桌面环境有

- [Cinnamon](http://cinnamon.linuxmint.com/): cinnamon
- [Enlightenment](https://www.enlightenment.org/): enlightenment
- [GNOME](http://www.gnome.org/): gnome gnome-extra
- [KDE](http://www.kde.org/): plasma kde-applications kde-l10n-zh_cn
- [LXDE](http://lxde.org/): lxde-gtk3
- [Xfce](http://www.xfce.org/): xfce4 xfce4-goodies
- [其他桌面环境](https://wiki.archlinux.org/index.php/Desktop_Environment)
- [窗口管理器](https://wiki.archlinux.org/index.php/Window_Manager)

**配置桌面启动环境**

启动方式主要有两种：

- [startx](https://wiki.archlinux.org/index.php/Startx)
- [显示管理器](https://wiki.archlinux.org/index.php/Display_Manager)


### 安装中文输入法


**fcitx**：

```
# pacman -S fcitx-im fcitx-configtool
```
配置：
```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```
KDM、GDM、LightDM 等显示管理器的用户，向 `~/.xprofile`添加以上命令。

startx 与 slim 的用户，向 `~/.xinitrc`，在 `exec` 语句前添加以上命令。

在 GNOME 上使用 fcitx 须禁用 iBus：
```
$ gsettings set org.gnome.settings-daemon.plugins.keyboard active false
```

添加输入法：

```
$ fcitx-configtool
```

安装其他输入法引擎：

```
# pacman -S <输入法引擎>
```

官方仓库提供的 fcitx 输入法引擎：
```
$ pacman -Ssq fcitx pinyin    # 拼音
fcitx-cloudpinyin
fcitx-googlepinyin
fcitx-libpinyin
fcitx-sunpinyin
$ pacman -Ssq fcitx zhengma    # 五笔、郑码、仓颉
fcitx-table-extra
```


**[iBus](https://wiki.archlinux.org/index.php/Ibus)**

待更新。
