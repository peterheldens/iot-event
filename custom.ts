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
    let lastCmd = Commands.None;
    let onReceivedNumberHandler: (receivedNumber: number) => void;
   // let onReceivedCommandHandler: (cmd: string,p1:number, p2:number, p3:number) => void

    /**
     * A simple event taking a function handler
     */
    //% block="on event"
    export function onEvent(phandler: () => void) {
        phandler();
    }

    //% block="on command"
    export function onReceivedCommand(command:number,handler:() => void) {
        control.onEvent(cmdEventID, command, handler);
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

    //export function onReceivedCommandHandler(cmd: string,p1:number, p2:number, p3:number) {

