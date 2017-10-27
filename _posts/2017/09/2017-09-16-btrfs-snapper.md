---
layout: post
date: 2017-09-16 16:39:03 +0800
title: "在BTRFS文件系统中使用snapper快照功能"
category: linux
---


很多玩过虚拟机（Vmware，virtualBox）的人都有用过“快照”功能，在系统运行的某个时间，我们可以创建一个快照，把当时整个系统“拍一个照片”，当以后使用中发生了什么错误时，可以一下子恢复到之前快照的中的系统，这是个很强大的功能。

目前来说，支持快照的文件系统主要有LVM和BTRFS，前者的知名度要大一些，因为在很多桌面发行版安装时都会在分区时有提供格式化全盘并使用LVM逻辑卷管理的选项，而BTRFS文件系统在刚发布时有很大的争议，在其渐渐稳定之后就有传言说它将取代传统（ext日志系统）文件系统，但是后来就慢慢的没什么消息了，相关资料也都是很久以前的了，值得一提的是openSUSE直到现在还是将BTRFS作为默认的文件系统（同时对于单独的/home分区，默认使用XFS文件系统），这是一个亮点，因为大部分的发行版都是默认的EXT4，这种传统的日志文件系统速度那是相当的快啊

![]({{ site.pics }}/2017/09/1601.png)

这是EXT4，EXT3，XFS，BTRFS文件系统的I/O速度比较，很明显，BTRFS真的时弱爆了，只有200kb每秒，而XFS表现的性能比较平衡，EXT系列最快。


# 在BTRFS中安装系统

推荐的做法是在一个设备已有的分区表上创建BTRFS分区，因为当前的UEFI启动必须要有一个FAT格式的efi分区（/boot/EFI）

也可以使用BTRFS作为分区表：

```
# mkfs.btrfs /dev/sdX
```

格式化一个分区为BTRFS文件系统

```
# mkfs.btrfs -L mylabel /dev/partition
```

然后挂载格式化好的分区，创建子卷

```
# btrfs subvolume create /path/to/subvolume
```

接着挂载子卷

```
# mount -o compress=lzo,subvol=/path/to/subvolume /dev/partition
```


更多关于BTRFS的内容可以查看[Btrfs - ArchWiki](https://wiki.archlinux.org/index.php/Btrfs)


# 使用快照

`snapper` 是一个由 openSUSE 开发的 Btrfs/LVM 快照管理软件。它可以自动创建和清理快照序列，在快照之间进行比较，回滚到之前的快照等，能够帮助我们充分利用 btrfs 的高级特性。

## 安装

以Archlinux 为例

```
# pacman -S snapper
```

Ubuntu系列：

```
# apt install snapper
```


## 创建配置文件

首先需要为 `snapper` 要管理的 btrfs subvolume 创建配置文件，执行以下命令将根据默认配置模板 `/etc/snapper/config-templates/default` 创建一个配置文件。

```
snapper -c configname create-config /path/to/subvolume
```

**例子**

```
# snapper -c arch_rootfs create-config /
# snapper -c home create-config /home
```

默认配置文件包括以下内容，更多内容可以 man snapper-configs 查看。

```
# 要创建快照的子卷
SUBVOLUME="/"

# 文件系统类型
FSTYPE="btrfs"

# 清理算法将使用的 btrfs qgroup，用于空间配额限制，仅用于 btrfs
QGROUP=""

# 快照占用的总空间限制，0.5 = 50%
SPACE_LIMIT="0.5"

# 允许访问该配置的用户和用户组，其他用户无法使用 snapper 操作该配置文件及对应快照
ALLOW_USERS=""
ALLOW_GROUPS=""

# 是否将以上的被允许用户和用户组写入到快照的ACL以允许他们访问快照
# 只有能够访问快照的用户才能进行查看、比较等操作
# 快照只能由 root 用户拥有，并且不能对其他用户可写
SYNC_ACL="no"

# 后台自动创建后续快照后是否比较前后快照
BACKGROUND_COMPARISON="yes"

# 是否运行基于数量的清理算法
NUMBER_CLEANUP="yes"

# 基于数量清理使用的参数
# 允许清理的最小快照创建时间，单位为秒
NUMBER_MIN_AGE="1800"

# 保留的快照数目，多余快照将被清理，优先保留新快照
NUMBER_LIMIT="50"

# 保留的重要快照数
NUMBER_LIMIT_IMPORTANT="10"

# 是否创建每小时快照
TIMELINE_CREATE="yes"

# 是否运行基于时间的清理算法
TIMELINE_CLEANUP="yes"

# 基于时间清理使用的参数
# 允许清理的最小快照创建时间，单位为秒
TIMELINE_MIN_AGE="1800"

# 保留的每小时快照数量，以下同
TIMELINE_LIMIT_HOURLY="10"

# 每日快照为每天创建的第一个快照，以下同
TIMELINE_LIMIT_DAILY="10"
TIMELINE_LIMIT_WEEKLY="0"
TIMELINE_LIMIT_MONTHLY="10"
TIMELINE_LIMIT_YEARLY="10"

# 是否清理前后无变动的快照
EMPTY_PRE_POST_CLEANUP="yes"

# 清理前后无变动快照时的限制参数
EMPTY_PRE_POST_MIN_AGE="1800"
```

## 启动定时器

要使用 systemd timer 运行 snapper。启动并启用 `snapper-timeline.timer` 来启用自动创建快照功能。启动并启用 `napper-cleanup.timer` 来启用自动清理功能。
```
# systemctl enable --now snapper-timeline.timer
# systemctl enable --now snapper-cleanup.timer
```


## 手动创建快照

```
# sudo snapper -c configname create --description /path
```

## 查看快照

```
# snapper -c configname list
```

**例子**

```
# snapper -c arch_root list
```

```
类型 | # | 前期 # | 日期                                      | 用户 | 清空   | 描述   | 用户数据
-------+---+----------+---------------------------------------------+--------+----------+----------+-------------
single | 0 |          |                                             | root   |          | current  |             
single | 1 |          | 2017年03月14日 星期二 17时27分56秒 | root   | timeline | timeline |             
single | 2 |          | 2017年03月14日 星期二 20时00分57秒 | root   | timeline | timeline |             
single | 3 |          | 2017年03月14日 星期二 21时00分52秒 | root   | timeline | timeline | 
```

###  快照位置

一般创建的快照可以在你创建快照的目录下的`.snapper`文件夹下找到。


## 比较快照
```
# snapper -c configname status number1..number2
```

**例子**
```
# snapper -c home status 1..3
```


## 回滚快照

使用快照的目的当然是为了滚挂时进行回滚了

```
# snapper -c configname rollback [number]
```

不带 number 参数时。将为默认子卷创建一个只读快照，再为当前子卷创建一个读写快照，并将默认子卷设置为后者。
带 number 参数时。将为当前子卷创建一个只读快照，再为指定 number 的快照创建一个读写快照，并将默认子卷设置为后者。


## 删除快照

```
# snapper -c configname delete number1
# snapper -c configname delete number1..number2
```

**例子**

```
# snapper -c home delete 1
# snapper -c home delete 1..3
```

## 总结

目前来说BTRFS已经是很稳定的了，openSUSE也是将其作为默认文件系统，所以大家完全可以放心的去使用它。但是它也有一些缺点例如速度慢，但是我认为它是值得被使用的，例如，我们使用在使用Archlinux系统中进行滚动升级时，如果发生了什么致命错误，导致我们无法进入到系统，我们就可以利用快照进行回滚，回到当初的某个状态，这对喜欢折腾的人的一个非常棒的功能。
