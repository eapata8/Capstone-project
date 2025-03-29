# main_control.py
import time
import serial
import RPi.GPIO as GPIO
from UltrasonicSensor import UltrasonicSensor
from ServoControl import ServoControl
from gpiozero import LineSensor


# Configuration
TRIG = 4
ECHO = 21
SERVO_PIN = 17
sensor = UltrasonicSensor(TRIG, ECHO)
servo = ServoControl(SERVO_PIN)

LEFT_SENSOR = 20
MIDDLE_SENSOR = 16
RIGHT_SENSOR = 26
IR01_sensor = LineSensor(LEFT_SENSOR)
IR02_sensor = LineSensor(MIDDLE_SENSOR)
IR03_sensor = LineSensor(RIGHT_SENSOR)

# Communication série vers ESP32
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
time.sleep(2)

def measure_at(direction):
    servo.set_position(direction)
    return sensor.get_distance()

def get_line_position():
    LMR = 0x00
    if IR01_sensor.value:
        LMR |= 4
    if IR02_sensor.value:
        LMR |= 2
    if IR03_sensor.value:
        LMR |= 1
    return LMR

def follow_line():
    LMR = get_line_position()
    if LMR == 2:
        ser.write(b"F\n")  # Avancer
    elif LMR == 4 or LMR == 6:
        ser.write(b"L\n")  # Tourner gauche
    elif LMR == 1 or LMR == 3:
        ser.write(b"R\n")  # Tourner droite
    elif LMR == 7:
        ser.write(b"S\n")  # Stop : perdu la ligne
    else:
        ser.write(b"S\n") 

def avoid_obstacle(left_distance, right_distance):
    print("Obstacle détecté → évitement en cours")

    # Reculer légèrement
    ser.write(b"B\n")
    time.sleep(0.8)

    if left_distance > right_distance:
        # Tourner à gauche
        ser.write(b"L\n")
        time.sleep(0.8)
    else:
        # Tourner à droite
        ser.write(b"R\n")
        time.sleep(0.8)

    # Avancer un peu
    ser.write(b"F\n")
    time.sleep(1)

    # Tourner pour tenter de retrouver la ligne
    ser.write(b"L\n" if left_distance > right_distance else b"R\n")
    time.sleep(1)

    # Avancer doucement jusqu'à retrouver la ligne
    while True:
        LMR = get_line_position()
        if LMR != 0:
            print("Ligne retrouvée !")
            break
        ser.write(b"F\n")
        time.sleep(0.2)

# tester le Ultrasonic sensor
def test_ultrasonic_servo():
    try:
        while True:
            for direction in ["left", "center", "right"]:
                servo.set_position(direction)
                dist = sensor.get_distance()
                print(f"{direction.capitalize()} distance: {dist} cm")
                time.sleep(0.5)
    except KeyboardInterrupt:
        print("\nFin du test.")


if __name__ == '__main__':
    #test_ultrasonic_servo() 
    
    try:
        while True:
            left = measure_at("left")
            center = measure_at("center")
            right = measure_at("right")

            print(f"Gauche: {left} | Centre: {center} | Droite: {right}")

            if center < 20:
                ser.write(b"S\n")
                avoid_obstacle(left, right)
            else:
                follow_line()

            time.sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()
        ser.write(b"S\n")
        print("Arrêt manuel")
