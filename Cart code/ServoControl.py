from gpiozero import Servo
import time

class ServoControl:
    def __init__(self, pin):
        self.servo = Servo(pin, min_pulse_width=0.5/1000, max_pulse_width=2.5/1000)

    def set_position(self, direction):
        if direction == "left":
            self.servo.min()
        elif direction == "center":
            self.servo.mid()
        elif direction == "right":
            self.servo.max()
        else:
            return
        time.sleep(0.4)  # laisser le temps au servo de se stabiliser
