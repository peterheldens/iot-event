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
        export class Packet {
        /**
         * The number payload if a number was sent in this packet (via ``sendNumber()`` or ``sendValue()``)
         * or 0 if this packet did not contain a number.
         */
        public receivedNumber: number;
       // public cmd: Commands;
        public par1: number;
        /**
         * The string payload if a string was sent in this packet (via ``sendString()`` or ``sendValue()``)
         * or the empty string if this packet did not contain a string.
         */
        public receivedString: string;
        /**
         * The buffer payload if a buffer was sent in this packet
         * or the empty buffer
         */
        public receivedBuffer: Buffer;
        /**
         * The system time of the sender of the packet at the time the packet was sent.
         */
        public time: number;
        /**
         * The serial number of the sender of the packet or 0 if the sender did not sent their serial number.
         */
        public serial: number;
        /**
         * The received signal strength indicator (RSSI) of the packet.
         */
        public signal: number;
    }

/*
    //% mutate=objectdestructuring
    //% mutateText=Packet
    //% mutateDefaults="cmd:Commands,par1:number;receivedString:name,receivedNumber:value;receivedString"
     //% draggableParameters=reporter
    //% block="on C2D received" blockGap=8
    export function onDataPacketReceived(cb: (packet: Packet) => void) {
            const packet = new Packet();
            packet.receivedNumber = p1;
            cb(packet)
        }
*/
        
    const cmdEventID = 1000;

  //  export let text = "icon"
    export let p1=1
    export let p2=2
    export let p3=3;
    let cmd=Commands.None;
    let lastCmd=Commands.None;
    let initialized = false;
    export let inputstring=Commands.None
    let onreceivedhandler: (p1?:number,p2?:number,p3?:number) => void
    
    function handleC2DReceived() {
        serial.writeLine("handleC2DReceived")
         if (onreceivedhandler)
            onreceivedhandler(p1,p2,p3);
    }

    function init() {
        serial.writeLine("Init")
        if (initialized) return;
        serial.writeLine("Set Init to True")
        initialized = true;
        serial.writeLine("register onC2DReceived handler")
        onC2DReceived(onreceivedhandler);
    }

    function onC2DReceived(body: () =>void):void {
            serial.writeLine("onC2DReceived Body")
            while(true) {
                cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    serial.writeValue("cmd", cmd)
                    serial.writeValue("lastcmd", lastCmd)
                    lastCmd = cmd; 
                    control.raiseEvent(cmdEventID, cmd);
                }
                basic.pause(50);
            }
    }


    //% block="on C2D $cmd with parameter $p1 $p2 $p3"
    //% draggableParameters="reporter"
    export function onC2Dcmd(cmd:Commands, cb:(p1?:number,p2?:number,p3?:number) => void) {
        serial.writeLine("onExpEvent")
        init()
        onreceivedhandler = cb;
        control.onEvent(cmdEventID, cmd, handleC2DReceived);
    }

/*
    //% block="new C2D received" blockGap=16
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
                    control.raiseEvent(cmdEventID, lastCmd);
                }
                basic.pause(50);
            }
    }

    function handleC2DReceived() {
         if (onReceivedC2DHandler)
            onReceivedC2DHandler(Iot.text, Iot.p1);
    }



    //% block="on some event $a1 $a2"
    //% draggableParameters
    export function onEventPeter(handler: (a1: number, a2: number) => void) {
        //handler("Hoi", true);
        handler(p1, p2);
        //control.onEvent(cmdEventID, cmd, handler);
    }
    
    //% block="on ander event $a1 $a2"
    //% draggableParameters
    export function onAnderEventPeter(a1:number, a2:number, handler: () => void) {
        //handler("Hoi", true);
        handler();
    }


    control.onEvent(cmdEventID, Commands.Servo, handelaar);
    
    function handelaar(x?: string, y?: string,z?:string) {
        handelaar("x","y","z")
    }

    //% block="handler $arg parameters $x $y $z"
    //% draggableParameters="reporter"
    export function onEventTest(arg: Commands, handler: (x: string, y: string,z:string) => void) {
        handler("x","y","z")
     }
  

      function handleC2DReceived() {
         if (onReceivedC2DHandler)
            onReceivedC2DHandler(Iot.p1);
    }


    //% block="on C2D command $cmd"
    //% draggableParameters="reporter"
    export function onEvent(cmd:Commands, phandler:(p?:number) => void) {
        //phandler(p1)
        control.onEvent(cmdEventID, cmd, phandler);
        control.inBackground(() => {
            while(true) {
                cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    phandler(p1)
                    lastCmd = cmd;      
                    control.raiseEvent(cmdEventID, lastCmd);
                    Iot.inputstring=Commands.None
                }
                basic.pause(50);
            }
        })
    }

        //% block="on Experimental Old C2D command $cmd"
    //% draggableParameters="reporter"
    export function onExpEventOld(cmd:Commands, phandler:(p?:number) => void) {
    //init()
    //   onReceivedC2DHandler = phandler;  
    //phandler(p1)

        serial.writeLine("init")
        control.onEvent(cmdEventID, cmd, phandler);
        control.inBackground(() => {
            while(true) {
                //phandler(p1) - flip
                const cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    inputstring=Commands.None
                    serial.writeValue("cmd", cmd)
                    lastCmd = cmd;      
                    
                    phandler(p1)
                    control.raiseEvent(cmdEventID, lastCmd);
                }
                basic.pause(50);
            }
        })
    }


    function onC2DRec(body: () =>void):void {
            while(true) {
                const cmd = inputstring; //get external input here
                if (cmd!= lastCmd) {
                    lastCmd = cmd; 
                    control.raiseEvent(cmdEventID, lastCmd);
                    Iot.inputstring=Commands.None
                }
                basic.pause(50);
            }
    }

    */

} 

