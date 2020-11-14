/**
 * Events are functions that take a function (lambda) as the last argument
 */
enum Commands {
    //% block=None
    None = 0,
    //% block=Icon
    Icon = 1,
    //% block=Text
    Text = 2,
    //% block=Servo
    Servo = 3,
    //% block=Neo
    Neo = 4,
}

//% color="#AA278D"
namespace Iot {  
    const cmdEventID = 3100;
    let lastCmd = Commands.None
    export let command=""

    /**
     * A simple event taking a function handler
     */
    //% block="on event"
    export function onEvent(handler: () => void) {
        handler();
    }

    //% block="on command"
    export function onCommand(cmd:Commands,  p1:number, p2:number, p3:number, handler: () => void) {
        control.onEvent(cmdEventID, cmd, handler);
        control.inBackground(() => {
            while(true) {
                const cmd = Commands.None; //get external input here
                if (cmd != lastCmd) {
                    lastCmd = cmd; 
                    control.raiseEvent(cmdEventID, lastCmd);
                }
                basic.pause(50);
            }
        })
    }
}