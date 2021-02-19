## How To Use

### 1. check node version, need to be $ge than v12.0.0

```
node --version // >= v12.0.0
```

### 2. install node modules

After cloning the repo, change current directory to repo's root folder:

RUN: `yarn install` or `npm install`

### 3. apply padlocal token

**Contact [admin](mailto:oxddoxdd@gmail.com) to apply PadLocal token.**

Then replace _YOUR_PADLOCAL_TOKEN_ with granted token in .env file (Please create it by yourself):

```
ROOMNAME=
WECHATY_PUPPET_PADLOCAL_TOKEN=
```

### 4. try the demo

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
