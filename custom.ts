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
    let lastCmd : Commands
    let cmd : Commands
    let onReceivedNumberHandler: (receivedNumber: number) => void;
    //let phandler: (cmd: string,p1:number, p2:number, p3:number) => void
    export let inputstring=Commands.None
    export let p1=0
    export let p2=0
    export let p3=0



    /**
     * The arguments on event handlers are variables by default, but they can
     * also be special "reporter" blocks that can only be used inside the event
     * handler itself, mimicking the behavior of locally scoped variables.
     */
    //% block="on some event $flags $handlerBoolArg from $arg"
    //% draggableParameters="reporter"
    export function onEventPeter(arg: number, handler: (handlerStringArg: string, handlerBoolArg: boolean) => void) {
        handler("Hoi", true);
     }


    //% block="event $arg parameters $x $y $z"
    //% draggableParameters="reporter"
    export function onEventTest(arg: Commands, handler: (x: string, y: string,z:string) => void) {
        handler("x","y","z")
     }
  
    /**
     * A simple event taking a function handler
     */
    //% block="C2D command $cmd with flags $flags"
    //% draggableParameters="reporter"
    export function onEvent(cmd:Commands, phandler: () => void) {
        control.onEvent(cmdEventID, cmd, phandler);
        control.inBackground(() => {
            while(true) {
                const cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    lastCmd = cmd; 
                    control.raiseEvent(cmdEventID, lastCmd);
                    Iot.inputstring=Commands.None
                }
                basic.pause(50);
            }
        })
    }

    
    //% block="on command"
    export function onReceivedCommand(command:number,handler:() => void) {
        control.onEvent(cmdEventID, command, handler);
        control.inBackground(() => {
            while(true) {
                const cmd = command; //get external input here
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

