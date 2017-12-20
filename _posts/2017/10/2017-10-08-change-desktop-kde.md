---
layout: post
date: 2017-10-08 17:14:00 +0800
title: 从Gnome3.26转到KDE Plasma
category: Unix/Linux
---

就在前几天Arch更新了gnome，直接从gnome3.24更新到3.26.1跳过了3.26，更新完，默认使用的xwayland，卡的不行，移动鼠标也会莫名卡住，注销，换成xorg，好很多了，但还是感觉有点不舒服。干脆换成KDE算了，随即装上KDE全家桶，gdm换成sddm，重启，Ok～

接着卸载gnome，很顺利，除了顺带把networkmanager卸载了，之后重启wifi-menu又装上。

嗯，很流畅。还是以前的味道。

但是不知道是什么原因，使用Plasma时，CPU温度总在60度以上，之前也是，而gnome却总保持在47度左右。