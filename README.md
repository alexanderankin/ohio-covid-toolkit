# Ohio Covid 19 Toolkit

This unfortunately doesn't work because the site has been upgraded with a real captcha. If you know how to implement a good work-around, please send your input [here](https://github.com/alexanderankin/ohio-covid-toolkit/pulls).

*THIS PROGRAM DOES NOT WORK ANYMORE* for free, instead you must [buy a 2Captcha credit](https://2captcha.com/).

Where it all started: [https://pastebin.com/xPg08H7C](https://pastebin.com/xPg08H7C).

## Instructions

Add Node

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs


curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

Dependencies for pupeteer install command:

```
apt-get install -y ca-certificates fonts-liberation gconf-service libappindicator1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils libgbm1
```

Create user:

```
adduser worker
usermod -aG sudo worker
```

start script:

```
yarn global add ohio-covid-toolkit
su worker
screen
```

hit space, you are now in a screen session.

Provide your 2Captcha key as commandline argument:

```
ohio-covid-toolkit ddcbf7e89c77e.....
```

then hit `Ctrl A` + `Ctrl D` to jump out, and `screen -r` puts you back in.
sometimes it freezes so keep an eye out.
