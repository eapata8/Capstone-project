# main_control.py
import time
import serial
import RPi.GPIO as GPIO
from UltrasonicSensor import UltrasonicSensor
from ServoControl import ServoControl

# Configuration
TRIG = 4
ECHO = 21
SERVO_PIN = 17
sensor = UltrasonicSensor(TRIG, ECHO)
servo = ServoControl(SERVO_PIN)

# Communication série vers ESP32
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
time.sleep(2)

def measure_at(direction):
    servo.set_position(direction)
    return sensor.get_distance()


if __name__ == '__main__':
    try:
        while True:
            left = measure_at("left")
            center = measure_at("center")
            right = measure_at("right")

            print(f"Gauche: {left} | Centre: {center} | Droite: {right}")

            if center < 20 and left < 20 and right < 20:
                ser.write(b"S\n")
            elif center < 20:
                if left > right:
                    ser.write(b"L\n")
                else:
                    ser.write(b"R\n")
            else:
                ser.write(b"F\n")

            time.sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()
        ser.write(b"S\n")
        print("Arrêt")
