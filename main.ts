import { PuppetPadlocal } from "wechaty-puppet-padlocal";
import { Contact, log, Message, ScanStatus, Wechaty, Room } from "wechaty";

import cron from 'node-cron';

import content from './content.json';
import blacklist from './blacklist.json'

const checkinList = [];

const roomName = "南京盛和塾坚信4组";
const findRoom = async (name: string): Promise<Room> => {
    const room: Room = await bot.Room.find({ topic: name });
    if (room) {
        const topic: string = await room.topic();
        console.log("room found", topic)

    } else {
        console.log("damn! No room was found")
    }

    return room
}

const getDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return [yyyy, mm, dd].join("/")
}



const getMmebers = async (room: Room): Promise<string> => {
    const members = await room.memberAll()
    const memberNames = await Promise.all(
        members.map(async (member) => {
            let name: string = await member.alias()
            if (!name) {
                name = await member.name()
            }
            if (blacklist.indexOf(name) > -1) {
                return ""
            }
            return `${name}( )`
        }))

    const memberNamesString = memberNames.filter((name) => {
        return name
    }).join("\n")
    return memberNamesString
}

const getTodayContent = () => {
    const date = getDate();
    const todayContents = content.filter((c) => {
        if (c.Date === date) {
            return true
        }
        return false
    })
    if (todayContents.length == 0) {
        return null
    }
    return todayContents[0]
}

const getMsg = async (room: Room): Promise<string> => {
    const todayContent = getTodayContent();

    const date = getDate();

    if (!todayContent) {
        return ""
    }
    const [year, month, day] = date.split("/");
    const memberNamesString = await getMmebers(room);

    const template = `各位同学，大家好！\n今天是 ${year}年${month}月${day}日. \n今天要阅读的书是 ${todayContent.Book} ${todayContent.Chapter}: ${todayContent.Section}，第 ${todayContent.Page}页\n --  \n${memberNamesString}`

    return template
}

const sendMsg = async (room: Room) => {
    const msg = await getMsg(room);
    if (msg) {
        await room.say(msg)
    }
}

const makeSchedule = (room: Room) => {

    cron.schedule("0 6 * * * ", async () => {
        const todayContent = getTodayContent();
        if (todayContent) {
            await sendMsg(room)
        }
    })

}

const puppet = new PuppetPadlocal({
    token: ""
})

const bot = new Wechaty({
    name: "DailyBot",
    puppet,
})

    .on("scan", (qrcode: string, status: ScanStatus) => {
        if (status === ScanStatus.Waiting && qrcode) {
            const qrcodeImageUrl = [
                'https://wechaty.js.org/qrcode/',
                encodeURIComponent(qrcode),
            ].join('')

            log.info("DailyBot", `onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);

            require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
        } else {
            log.info("DailyBot", `onScan: ${ScanStatus[status]}(${status})`);
        }
    })

    .on("login", async (user: Contact) => {
        log.info("DailyBot", `${user} login`);
        const room = await findRoom(roomName);
        const msg = await getMsg(room);
        console.log("Msg", msg);
        makeSchedule(room)
    })

    .on("logout", (user: Contact, reason: string) => {
        log.info("DailyBot", `${user} logout, reason: ${reason}`);
    })

    .on("message", async (message: Message) => {
        log.info("DailyBot", `on message: ${message.toString()}`);
    })

    .on("error", (error) => {
        log.error("DailyBot", 'on error: ', error.stack);
    })


bot.start().then(() => {
    log.info("DailyBot", "started.");
});

