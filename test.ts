// tests go here; this will not be compiled when this package is used as an extension.
Iot.onEvent(Commands.Neo, 0, function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
})
Iot.onEventWithHandlerReporterArgs(0, function (handlerStringArg, handlerBoolArg) {
	
})
input.onButtonPressed(Button.A, function () {
    Iot.inputstring=Commands.Neo
})
Iot.onEvent(Commands.Servo, 0, function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.B, function () {
    Iot.inputstring=Commands.Servo
})
