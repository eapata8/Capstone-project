""" 
Lecture simple de l'UID d'un tag MIFARE Classic 1K via SPI 

""" 

import time 
import board 
import busio 
from digitalio import DigitalInOut 
import adafruit_pn532 

# SPI pins (GPIO 8/9/10/11) 
spi = busio.SPI(clock=board.SCK, MOSI=board.MOSI, MISO=board.MISO) 
cs = DigitalInOut(board.D8)  # CE0 
pn532 = adafruit_pn532.PN532_SPI(spi, cs, debug=False) 

pn532.SAM_configuration()  # mode normal 

print("En attente d'un tag RFID/NFC via SPI... (Ctrl+C pour quitter)") 

try: 
    while True: 
        uid = pn532.read_passive_target(timeout=0.5) 
        if uid is not None: 
            print("Tag détecté ! UID :", [hex(b) for b in uid]) 
            print("UID concaténé :", ''.join("{:02X}".format(b) for b in uid))      
        time.sleep(0.1) 
        
except KeyboardInterrupt: 
    print("\nArrêt du programme.")