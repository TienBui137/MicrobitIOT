/**
 * MakeCode editor extension for Microbit Iot module
 * by Tien Bui
 */
//% block="Microbit IoT" weight=20 color=#660066 icon="☁"
namespace MicrobitIoT {
    export enum TimeType {
        //% block="second" enumval=0
        SECOND,
        //% block="minute" enumval=1
        MINUTE,
        //% block="hour" enumval=2
        HOUR,
        //% block="day" enumval=3
        DAY,
        //% block="month" enumval=4
        MONTH,
        //% block="year" enumval=5
        YEAR
    }
    let hour = 0
    let minute = 0
    let second = 0
    let day = 0
    let month = 0
    let year = 0
    let milisecond = 0
    // let textTime: string
    /**
    * Required time form Blynk server
    */
    function requiredTime(): void {
        if ((input.runningTime() - milisecond) >= 1000) {
            serial.writeLine("#tim@sync$");
            milisecond = input.runningTime();
            basic.pause(50);
        }
        //    textTime = serial.readUntil(serial.delimiters(Delimiters.Dollar));
    }
    /**
    * Get time form Blynk server
    * @param textTime is the string form Iot module, eg: "hh:mm:ss"
    */
    //% blockId=GetTime
    //% block="Get $data form $textTime" weight=40
    export function getTime(data: TimeType, textTime: string): number {
        requiredTime();
        switch (data) {
            case 0:
                if (textTime.includes("&")) {
                    second = parseInt(textTime.substr(textTime.indexOf("B") + 1, textTime.indexOf("C") - (textTime.indexOf("B") + 1)));
                }
                return second;
                break
            case 1:
                if (textTime.includes("&")) {
                    minute = parseInt(textTime.substr(textTime.indexOf("A") + 1, textTime.indexOf("B") - (textTime.indexOf("A") + 1)));
                }
                return minute;
                break
            case 2:
                if (textTime.includes("&")) {
                    hour = parseInt(textTime.substr(textTime.indexOf("&") + 1, textTime.indexOf("A") - (textTime.indexOf("&") + 1)));
                }
                return hour;
                break
            case 3:
                if (textTime.includes("&")) {
                    day = parseInt(textTime.substr(textTime.indexOf("C") + 1, textTime.indexOf("D") - (textTime.indexOf("C") + 1)));
                }
                return day;
                break
            case 4:
                if (textTime.includes("&")) {
                    month = parseInt(textTime.substr(textTime.indexOf("D") + 1, textTime.indexOf("E") - (textTime.indexOf("D") + 1)));
                }
                return month;
                break
            case 5:
                if (textTime.includes("&")) {
                    year = parseInt(textTime.substr(textTime.indexOf("E") + 1, textTime.length - textTime.indexOf("E")));
                }
                return year
                break
            default:
                return 0
        }
    }
    /**
     * Get Virtual Pin form Blynk server
     * @param text is the string form Iot module, eg: "#V30@1020$"
     */
    //% blockId=GetVirtualPin
    //% block="Get Virtual Pin form $text" weight=40
    export function getVirtualPin(text: string): number {
        let Vxx = text.substr(text.indexOf("V") + 1, text.indexOf("@") - (text.indexOf("#") + 1));
        return parseInt(Vxx);
    }
    /**
     * Connect to Blynk server
     * @param auth is the auth form blynk server, eg:"auth"
     * @param Wifi_ssid is the SSID of your wifi, eg:"SSID"
     * @param Wifi_password is the password of your wifi, eg:"password"
     */
    //% blockId=ConnectToBLYNK
    //% block="Connect to BLYNK IoT server:TX %tx|RX %rx|%auth|%Wifi_ssid|%Wifi_password" weight=50
    export function connectToBLYNK(tx: SerialPin, rx: SerialPin, auth: string, Wifi_ssid: string, Wifi_password: string): void {
        serial.redirect(tx, rx, 115200)
        basic.pause(500);
        serial.writeString("#sid@" + auth + "," + Wifi_ssid + ";" + Wifi_password + "$");
        basic.pause(5000);
    }
    /**
     * Get data form Blynk server
     * @param textData is the string form Iot module, eg:"#V30@1020$"
     */
    //% blockId=GetData
    //% block="Get data form Blynk: $textData" weight=30
    export function dataFromServer(textData: string): number {
        let Data_Value = textData.substr(textData.indexOf("@") + 1, textData.indexOf("$") - (textData.indexOf("@") + 1));
        return parseFloat(Data_Value);

    }
    /**
     * Send data to Blynk server
     * @param V is the Virtual Pin, eg: V30
     * @param data is the value, eg: 9.99
     */
    //% blockId=SendData
    //% block="Send data to Blynk: Virtual Pin $V| data $data" weight=20
    export function sendDataToServer(V: string, data: number): void {
        serial.writeString("#" + V + "@ " + data.toString() + "$");
    }
    /**
    * Send notify to Blynk server
    * @param notify is the notification to send, eg: "alert"
    */
    //%b lockId=SendNotify
    //% block="Send notification: $notify" weight=20
    export function sendNotifyToServer(notify: string): void {
        serial.writeString("#nty@ " + notify + "$");
    }

}
/**
 * MakeCode editor extension for Microbit Robot module
 * by Tien Bui
 */
//% block="Microbit robot" weight=20 color=#ff3300 icon="\uf0f9"
namespace MicrobitRobot {
    let leftMotorPin1: AnalogPin;
    let leftMotorPin2: AnalogPin;
    let rightMotorPin1: AnalogPin;
    let rightMotorPin2: AnalogPin;
    /**
    * Initialze robot module
    * @param Pin1 is the pin to control robot, eg: P0
    * @param Pin2 is the pin to control robot, eg: P1
    * @param Pin3 is the pin to control robot, eg: P2
    * @param Pin4 is the pin to control robot, eg: P3
    */
    //% blockId=initializeRobot
    //% block="Robot with left motor: $Pin1|$Pin2| and right motor: $Pin3|$Pin4" weight=30
    export function initialzeRobot(Pin1: AnalogPin, Pin2: AnalogPin, Pin3: AnalogPin, Pin4: AnalogPin,): void {
        leftMotorPin1 = Pin1;
        leftMotorPin2 = Pin2;
        rightMotorPin1 = Pin3;
        rightMotorPin2 = Pin4;
    }
    /**
    * Control DC motor of robot
    * @param left is the speed of left motor, eg: 0
    * @param right is the speed of right motor, eg: 0
    */
    //% blockId=RobotSpeed
    //% block="Robot move with left speed $left| right speed $right" weight=20
    //% left.min=-1000 left.max=1000 right.min=-1000 right.max=1000
    export function RobotSpeed(left: number, right: number): void {
        if (left >= 0) {
            pins.analogWritePin(leftMotorPin1, 0);
            pins.analogWritePin(leftMotorPin2, left);
        } else {
            pins.analogWritePin(leftMotorPin1, -left);
            pins.analogWritePin(leftMotorPin2, 0);
        }
        if (right >= 0) {
            pins.analogWritePin(rightMotorPin1, 0);
            pins.analogWritePin(rightMotorPin2, right);
        } else {
            pins.analogWritePin(rightMotorPin1, -right);
            pins.analogWritePin(rightMotorPin2, 0);
        }
    }
    /**
    * Control left DC motor of robot
    * @param left_speed is the speed of left motor, eg: 0
    */
    //% blockId=LeftSpeed
    //% block="Robot move with left speed $left_speed" weight=20
    //% left_speed.min=-1000 left_speed.max=1000
    export function leftSpeed(left_speed: number): void {
        if (left_speed >= 0) {
            pins.analogWritePin(leftMotorPin1, 0);
            pins.analogWritePin(leftMotorPin2, left_speed);
        } else {
            pins.analogWritePin(leftMotorPin1, -left_speed);
            pins.analogWritePin(leftMotorPin2, 0);
        }
    }
    /**
    * Control right DC motor of robot
    * @param right_speed is the speed of right motor, eg: 0
    */
    //% blockId=RightSpeed
    //% block="Robot move with right speed $right_speed" weight=20
    //% right_speed.min=-1000 right_speed.max=1000
    export function rightSpeed(right_speed: number): void {
        if (right_speed >= 0) {
            pins.analogWritePin(rightMotorPin1, 0);
            pins.analogWritePin(rightMotorPin2, right_speed);
        } else {
            pins.analogWritePin(rightMotorPin1, -right_speed);
            pins.analogWritePin(rightMotorPin2, 0);
        }
    }
    /**
    * Stop moving of robot
    * 
    */
    //% blockId=StopRobot
    //% block="Robot STOP" weight=20
    export function robotStop(): void {
        pins.analogWritePin(leftMotorPin1, 0);
        pins.analogWritePin(leftMotorPin2, 0);
        pins.analogWritePin(rightMotorPin1, 0);
        pins.analogWritePin(rightMotorPin2, 0);

    }
}
enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * MakeCode editor extension for Microbit SONAR
 */
//% block="Ultrasonic" color=#2929a3 icon="\uf14e"
namespace sonar {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo|unit %unit"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 400): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }
}