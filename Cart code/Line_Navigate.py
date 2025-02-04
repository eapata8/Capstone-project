from gpiozero import Robot, LineSensor
from time import sleep

class Line_Navigate:
    IR01 = 14
    IR02 = 15
    IR03 = 23
    IR01_sensor = LineSensor(IR01)
    IR02_sensor = LineSensor(IR02)
    IR03_sensor = LineSensor(IR03)

    def __init__(self):        
        pass

    