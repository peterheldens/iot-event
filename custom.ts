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
    let phandler: (cmd: string,p1:number, p2:number, p3:number) => void
    export let inputstring=Commands.None
    export let text = "icon"
    export let p1=1
    export let p2=2
    export let p3=0

    let onReceivedC2DHandler: (name: string, value: number) => void;
    let initialized = false;

    //% block="on C2D received" blockGap=16
    // useLoc="radio.onDataPacketReceived" 
    //% draggableParameters=reporter
    export function onReceivedC2D(cb: (name: string, value: number) => void) {
        init();
        onReceivedC2DHandler = cb;
    }

    function init() {
        if (initialized) return;
        initialized = true;
        onC2DReceived(handleC2DReceived);
    }

    function onC2DReceived(body: () =>void):void {
            while(true) {
                const cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    lastCmd = cmd; 
                    //control.raiseEvent(cmdEventID, lastCmd);
                }
                basic.pause(50);
            }
    }

      function handleC2DReceived() {
         if (onReceivedC2DHandler)
            onReceivedC2DHandler(Iot.text, Iot.p1);
    }

    /**
     * The arguments on event handlers are variables by default, but they can
     * also be special "reporter" blocks that can only be used inside the event
     * handler itself, mimicking the behavior of locally scoped variables.
     */
    //% block="on some event $a1 $a2"
    //% draggableParameters
    export function onEventPeter(handler: (a1: number, a2: number) => void) {
        //handler("Hoi", true);
        handler(p1, p2);
    }

    //% block="on ander event $a1 $a2"
    //% draggableParameters
    export function onAnderEventPeter(a1:number, a2:number, handler: () => void) {
        //handler("Hoi", true);
        handler();
    }

    //% block="event $arg parameters $x $y $z"
    //% draggableParameters="reporter"
    export function onEventTest(arg: Commands, handler: (x: string, y: string,z:string) => void) {
        handler("x","y","z")
     }
  
    /**
     * A simple event taking a function handler
     */
    //% block="C2D command $cmd"
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

