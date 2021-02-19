## What this for

The project is to send a daily reading notice to a wechat room. The notice content comes from content.json, which is composed of date, book, chapter, section and pages and the member list of the wechat room, so that every one could copy the template to notice the other members.

## How To Use

### 1. check node version, need to be $ge than v12.0.0

```
node --version // >= v12.0.0
```

### 2. install node modules

After cloning the repo, change current directory to repo's root folder:

RUN: `yarn install` or `npm install`

### 3. apply padlocal token

Replace ROOMNAME AND WECHATY_PUPPET_PADLOCAL_TOKEN in .env file (Please create it by yourself):

```
ROOMNAME=
WECHATY_PUPPET_PADLOCAL_TOKEN=
```

The token can be applied from [wechaty-puppet-padlocal](https://github.com/padlocal/wechaty-puppet-padlocal).

### 4. try it

RUN: `yarn start` or `npm start`

```
$ npm start
> ts-node main.ts

11:11:02 INFO
      ============================================================
       Welcome to Wechaty PadLocal puppet!

       - wechaty-puppet-padlocal version: 0.2.32
       - padlocal-ts-client version: 0.2.23
      ============================================================

11:11:02 INFO DailyBot started.
11:11:02 INFO [PuppetPadlocal] start login with type: AutoLogin
11:11:02 INFO [PuppetPadlocal] start login with type: OneClickLogin
11:11:03 INFO DailyBot onScan: Waiting(2)
11:11:03 INFO DailyBot onScan: Scanned(3)
11:11:56 INFO DailyBot onScan: Confirmed(4)
11:11:56 INFO DailyBot Contact<Samuel> login
11:11:56 WARN [PadLocalClient]
================================================================================
WARNING: Your token will be expired on: "2021/02/23". Please renew ASAP to avoid
                              service termination.
```
