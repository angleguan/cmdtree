---
title: 在Fedora 系统中使用 Deepin 桌面环境
date: 2017-04-15T11:32:52+00:00
category: Unix/Linux
---

**Fedora和Ubuntu可以说是Linux distribution中最受欢迎的两个桌面发行版，其社区相当活跃，现在，我们可以在 Fedora 系统中使用 Deepin 桌面环境。**

安装方法：
```zsh
sudo dnf install http://download1.rpmfusion.org/free/fedora/releases/$(rpm -E %fedora)/Everything/$(uname -i)/os/Packages/r/rpmfusion-free-release-$(rpm -E %fedora)-1.noarch.rpm
sudo dnf copr enable mosquito/deepin
sudo dnf update
sudo dnf install deepin-desktop deepin-session-ui deepin-launcher deepin-screenshot deepin-terminal
sudo systemctl disable gdm.service && sudo systemctl enable lightdm.service (optional, gdm also available)
sudo sed -i "/SELINUX=/s|enforcing|disabled|" /etc/selinux/config
```

执行完重启后即可使用！

此项目由FZUG Fedora中文社区软件源开源在Github ——<a href="https://github.com/FZUG/repo/tree/master/rpms/deepin_project">deepin_project</a>

These files are based on <a href="https://github.com/cz-guardian/fedora-deepin/">cz-guardian/fedora-deepin</a> and <a href="https://www.archlinux.org/packages/?q=deepin">Arch packages</a>. You can visit the <a href="https://copr.fedorainfracloud.org/coprs/mosquito/deepin/">Deepin Copr</a> to install them. Thanks for all of the community developers and packagers.
<h2><a id="user-content-installation-instructions" class="anchor" href="https://github.com/FZUG/repo/tree/master/rpms/deepin_project#installation-instructions"></a>Installation instructions</h2>
<pre class="lang:js decode:true">sudo dnf install http://download1.rpmfusion.org/free/fedora/releases/$(rpm -E %fedora)/Everything/$(uname -i)/os/Packages/r/rpmfusion-free-release-$(rpm -E %fedora)-1.noarch.rpm
sudo dnf copr enable mosquito/deepin
sudo dnf update
sudo dnf install deepin-desktop deepin-session-ui deepin-launcher deepin-screenshot deepin-terminal
sudo systemctl disable gdm.service &amp;&amp; sudo systemctl enable lightdm.service (optional, gdm also available)
sudo sed -i "/SELINUX=/s|enforcing|disabled|" /etc/selinux/config</pre>
After this is done, simply reboot into your new nice environment.
<h2><a id="user-content-fedora-deepin-repository-content" class="anchor" href="https://github.com/FZUG/repo/tree/master/rpms/deepin_project#fedora-deepin-repository-content"></a>fedora-deepin repository content</h2>
This repository contains the following .specs for integrating the deepin desktop environment into Fedora. You can simply compile them in order.
<ul>
     <li>deepin-gsettings</li>
     <li>python2-javascriptcore</li>
     <li>deepin-gettext-tools</li>
     <li>python2-deepin-ui</li>
     <li>python2-deepin-util</li>
     <li>deepin-music</li>
     <li>python2-xpybutil</li>
     <li>deepin-screenshot</li>
     <li>deepin-go-lib</li>
     <li>deepin-dbus-generator</li>
     <li>deepin-dbus-factory</li>
     <li>deepin-movie</li>
     <li>deepin-menu</li>
     <li>deepin-qml-widgets</li>
     <li>python2-ass</li>
     <li>python3-dae</li>
     <li>python2-pysrt</li>
     <li>python2-deepin-storm</li>
     <li>gsettings-qt</li>
     <li>golang-github-*</li>
     <li>deepin-tool-kit</li>
     <li>deepin-sound-theme</li>
     <li>deepin-social-sharing</li>
     <li>deepin-shortcut-viewer</li>
     <li>deepin-notifications</li>
     <li>deepin-nautilus-properties</li>
     <li>deepin-cogl</li>
     <li>deepin-mutter</li>
     <li>deepin-metacity</li>
     <li>deepin-image-viewer</li>
     <li>deepin-icon-theme</li>
     <li>deepin-gtk-theme</li>
     <li>deepin-grub2-themes</li>
     <li>deepin-gir-generator</li>
     <li>deepin-game</li>
     <li>deepin-desktop-schemas</li>
     <li>deepin-desktop-base</li>
     <li>deepin-artwork-themes</li>
     <li>deepin-calendar</li>
     <li>deepin-account-faces</li>
     <li>deepin-terminal</li>
     <li>deepin-wallpapers</li>
     <li>deepin-qt-dbus-factory</li>
     <li>deepin-file-manager</li>
     <li>deepin-qt5integration</li>
     <li>deepin-dock</li>
     <li>deepin-desktop</li>
     <li>deepin-launcher</li>
     <li>deepin-wm-switcher</li>
     <li>deepin-wm</li>
     <li>deepin-manual</li>
     <li>deepin-api</li>
     <li>startdde</li>
     <li>deepin-file-manager-backend</li>
     <li>deepin-control-center</li>
     <li>deepin-daemon</li>
     <li>deepin-session-ui</li>
</ul>
<h2><a id="user-content-resources" class="anchor" href="https://github.com/FZUG/repo/tree/master/rpms/deepin_project#resources"></a>Resources</h2>
<ul>
     <li><a href="https://github.com/linuxdeepin/">Deepin Github</a>, <a href="https://www.deepin.org/en/">Official site</a>, <a href="https://my.oschina.net/ManateeLazyCat/blog/831104">Deepin OS Design</a></li>
     <li><a href="https://copr.fedorainfracloud.org/coprs/mosquito/deepin/packages/">fedora-deepin repository list</a></li>
     <li><a href="https://github.com/cz-guardian/fedora-deepin/">fedora-deepin (jstepanek)</a>: thanks @cz-guardian</li>
     <li><a href="https://github.com/fasheng/arch-deepin/">arch-deepin</a>: <a href="https://bbs.archlinux.org/viewtopic.php?id=181861">Deepin Desktop Environment on Arch</a></li>
     <li><a href="https://github.com/manjaro/packages-community/">manjaro-deepin</a>: <a href="https://github.com/fasheng/arch-deepin/issues/98">issue 98</a></li>
     <li><a href="https://github.com/debiancn/repo/issues/31">debian-deepin</a></li>
     <li><a href="https://github.com/zhtengw/deepin-overlay/">gentoo-deepin</a></li>
</ul>
