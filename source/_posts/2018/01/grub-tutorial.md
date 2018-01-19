---
title: GRUB简单入门教程
date: 2018-01-19 15:48:05
category: Unix/Linux
---

## GRUB2

GRUB全称GRand Unified Bootloader，是GNU项目中一个支持多系统启动的系统引导程序。GRUB目前分为两个版本，0.9版本以前称为`GRUB legacy`，1.x以后的版本称为GRUB2，本文描述的是GRUB2。

![](/pics/2018/01/1901.png)

### 区别

GRUB2较于GRUB的一些变化：

- grub2的配置文件是命令生成的

- 增加了rescue模式，可用来修复引导

- 支持多种文件系统

- 添加模块机制，可动态加载模块

- 分区编号使用1开头

<!-- more -->

## 设备命名方式

GRUB2的设备命令方式：

我们知道，在linux系统中，IDE硬盘使用hd开头，SATA硬盘使用sd开头，例如/dev/sda1表示第一块硬盘的第一个分区、/dev/sdb3表示第二块硬盘的第三个分区。

但是在GRUB中不同，硬盘都使用hd（Hard disk）表示，设备从0开始标号，分区从1开始标号。例如(hd0,1)表示第一块硬盘的第一个分区，在Windows中可以理解为C盘。

## 安装方法

通常情况下，大部分的Linux版本都不需要我们手动安装。

你也可以下载源代码编译安装

```
# git clone git://git.savannah.gnu.org/grub.git
# ./configure
# make
# sudo make install
```

## 配置文件

GRUB的主要配置文件是/boot/grub/grub.cfg，这份文件不可以直接编辑，如果想修改启动项或者添加自定义启动项应该编辑`/etc/grub.d/`下的脚本。

下面是已经生成的双系统电脑中的`grub.cfg`文件中两份系统的信息：

**Ubuntu 16.04**

```
menuentry 'Ubuntu, with Linux 4.13.0-26-generic' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-4.13.0-26-generic-advanced-3c909df0-784e-4b1c-890b-b1e971c84d47' {
    recordfail
    load_video
    gfxmode $linux_gfx_mode
    insmod gzio
    if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
    insmod part_gpt
    insmod ext2
    set root='hd1,gpt5'
    if [ x$feature_platform_search_hint = xy ]; then
      search --no-floppy --fs-uuid --set=root --hint-bios=hd1,gpt5 --hint-efi=hd1,gpt5 --hint-baremetal=ahci1,gpt5  3c909df0-784e-4b1c-890b-b1e971c84d47
    else
      search --no-floppy --fs-uuid --set=root 3c909df0-784e-4b1c-890b-b1e971c84d47
    fi
    echo  'Loading Linux 4.13.0-26-generic ...'
    linux  /boot/vmlinuz-4.13.0-26-generic.efi.signed root=UUID=3c909df0-784e-4b1c-890b-b1e971c84d47 ro  quiet splash $vt_handoff
    echo  'Loading initial ramdisk ...'
    initrd  /boot/initrd.img-4.13.0-26-generic
  }
```

**Windows 10**

```
menuentry 'Windows Boot Manager (on /dev/sdb2)' --class windows --class os $menuentry_id_option 'osprober-efi-18E3-6B87' {
  insmod part_gpt
  insmod fat
  set root='hd1,gpt2'
  if [ x$feature_platform_search_hint = xy ]; then
    search --no-floppy --fs-uuid --set=root --hint-bios=hd1,gpt2 --hint-efi=hd1,gpt2 --hint-baremetal=ahci1,gpt2  18E3-6B87
  else
    search --no-floppy --fs-uuid --set=root 18E3-6B87
  fi
  chainloader /EFI/Microsoft/Boot/bootmgfw.efi
}
```

如果你想添加自定义启动项，你可以编辑`/etc/grub.d/40_custom`文件，仿照上面的格式添加启动项：

### 添加linux启动项

```
menuentry "Linux Name" {
  set root=(hd0,2) # 系统所在位置
  linux /boot/vmlinuz # 引导内核
  initrd /boot/initrd.img # 临时内核
}
```

### 添加Windows启动项

```
menuentry "Windows" {
  insmod part_gpt # 载入模块，下同
  insmod fat
  set root='hd1,gpt2' # 系统所在位置
  chainloader /EFI/Microsoft/Boot/bootmgfw.efi # UEFI启动的Windows的efi引导文件
}
```

### 添加‘关机’项

```
menuentry "System shutdown" {
  echo "System shutting down..."
  halt
}
```

### 添加‘重启’项

```
menuentry "System restart" {
  echo "System rebooting..."
  reboot
}
```


每当你修改了这些配置文件，都需要输入下面的命令来重新生成grub.cfg文件

```
$ grub-mkconfig -o /boot/grub/grub.cfg
```

## UEFI启动

现在大部分的电脑都支持UEFI启动，如果你使用UEFI启动且磁盘使用GPT分区表，你需要安装软件包`efibootmgr`来生成`.efi`文件，默认位于/boot/EFI/grubx64.efi。

使用下面的命令来生成UEFI模块在/boot/grub/x86_64-efi目录下

```
# grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub
```

> 如果你想在Windows系统中编辑或添加UEFI启动项，你可以使用EasyUEFI软件（在非企业版系统中免费），EasyBCD只能在传统（legacy）启动中使用。


















