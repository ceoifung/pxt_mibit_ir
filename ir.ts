enum RemoteButton
{
  //% block=Power
  Power = 0x45,
  //% block=Menu
  Menu = 0x47,
  //% block=Test
  Test = 0x44,
  //% block=Plus  
  Plus = 0x40,
  //% block=Return
  Return = 0x43,
  //% block=Left
  Left = 0x07,
  //% block=Play
  Play = 0x15,
  //% block=Right
  Right = 0x09,
  //% block=Num0
  Num0 = 0x16,
  //% block=Minus
  Minus = 0x19,
  //% block=Cancle
  Cancle = 0x0D,
  //% block=Num1
  Num1 = 0x0C,
  //% block=Num2
  Num2 = 0x18,
  //% block=Num3
  Num3 = 0x5E,
  //% block=Num4
  Num4 = 0x08,
  //% block=Num5
  Num5 = 0x1C,
  //% block=Num6
  Num6 = 0x5A,
  //% block=Num7
  Num7 = 0x42,
  //% block=Num8
  Num8 = 0x52,
  //% block=Num9
  Num9 = 0x4A,
};

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1eb" block="MIBIT_IR"
namespace MIBIT_IR {
    let state: number;
    let data1: number;
    let irstate: number;
    let irData: number = -1;

    //% shim=XiaoRGEEKIR::irCode
    function irCode(): number {
        return 0;
    }

    /**
     * Read infrared value
     */
    
    //% weight=60
    //% blockId=MIBIT_IR_IR_read block="read IR key value"
    export function IR_read(): number {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        return valuotokeyConversion();
    }
    
    //% weight=60
    //% block="%key"
    export function IR_getRemoteKey(btn: RemoteButton) : number {
        return btn;
    }

    /**
     * The callback function when infrared information is received
     */

    //% weight=50
    //% blockId=MIBIT_IR_IR_callbackUser block="on IR received"
    //% draggableParameters
    export function IR_callbackUser(cb: (message: number) => void) {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        state = 1;
        control.onEvent(11, 22, function () {
            cb(data1)

        })
    }

    basic.forever(() => {
        if (state == 1) {
            irstate = irCode();
            if (irstate != 0) {
                data1 = irstate & 0xff;
                control.raiseEvent(11, 22)
            }
        }

        basic.pause(50);
    })

    function valuotokeyConversion(): number {
        //serial.writeValue("x", irCode() )
        let data = irCode();
        if (data == 0) {
        } else {
            irData = data & 0xff;
        }
        return irData;
    }
}
