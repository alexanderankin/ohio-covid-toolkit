# Ohio Covid 19 Toolkit

**UPDATE 5/14/2020:** [https://secure.jfs.ohio.gov/covid-19-fraud/](https://secure.jfs.ohio.gov/covid-19-fraud/) is down!

The site maintainers upgraded the form to add a recaptcha.

In order to circumvent this, you'll need to [create a 2Captcha account and buy credits](https://2captcha.com/).

Where it all started: [https://pastebin.com/xPg08H7C](https://pastebin.com/xPg08H7C).

## Requirements

- node 12+
- yarn

## Setup

Install Node & Yarn

```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs


curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

Dependencies for puppeteer install command:

```bash
apt-get install -y ca-certificates fonts-liberation gconf-service libappindicator1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils libgbm1
```

## Installation

Finally, you can install the cli itself:

```bash

yarn global add ohio-covid-toolkit

```

## Usage

Now, you can run the script.

Provide your 2Captcha key as a required command line argument

```bash

ohio-covid-toolkit ddcbf7e89c77e.....

```

you can hit `ctrl + c` or `cmd + c` to exit at any time

## Advanced example usage w/ screen

If you use this with `screen`, you can run and manage multiple instances at once

Create user:

```bash
adduser worker
usermod -aG sudo worker
```

start script:

```bash
yarn global add ohio-covid-toolkit
su worker
screen
```

hit space, you are now in a screen session.

then hit `Ctrl A` + `Ctrl D` to jump out, and `screen -r` puts you back in.
sometimes it freezes so keep an eye out.

## Development

If you want to contribute, that's fantastic.

1. Follow the instructions above to install dependencies
2. `yarn` to install package dependencies

then, you can either:

- `yarn start <2captcha token>` - to run main.js
- `yarn watch <2captcha token>` - to run main.js and watch the source file tree for changes and reload
