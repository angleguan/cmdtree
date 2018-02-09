npm start
gulp build
git clone https://github.com/git-ftp/git-ftp.git
cd git-ftp
sudo make install
cd public
git init
git config git-ftp.url "ftp://138.68.24.161:21"
git config git-ftp.user $FTP_USER
git config git-ftp.password $FTP_PASSWD
