#include <Arduino.h>

// Définition des broches
// Front Left Motor
#define F_in1 19
#define F_in2 21
// Front Right Motor
#define F_in3 22
#define F_in4 23

// Back Left Motor
#define B_in1 18
#define B_in2 17
// Back Right Motor
#define B_in3 16
#define B_in4 4

void execCommand(String cmdLine) {
    cmdLine.trim();  // Supprime espaces ou \r\n
    int sep = cmdLine.indexOf(':');
  
    String cmd = cmdLine;
    int duration = 2; // durée par défaut au cas où
  
    if (sep > 0) {
      cmd = cmdLine.substring(0, sep);
      duration = cmdLine.substring(sep + 1).toInt();  // convertit la partie après ':' en entier
    }
  
    if(cmd == "F") {
      Serial.println("Commande: Avancer");
      forward(duration);
    } 
    else if(cmd == "B") {
      Serial.println("Commande: Reculer");
      reverse(duration);
    }
    else if(cmd == "L") {
      Serial.println("Commande: Gauche");
      turn_left(duration);
    }
    else if(cmd == "S") {
      Serial.println("Commande: Stop");
      stop(duration);
    }
    else {
      Serial.print("Commande inconnue : ");
      Serial.println(cmdLine);
    }
  }
  
void forward(int sec) {
  digitalWrite(F_in1, LOW);
  digitalWrite(F_in2, HIGH);
  digitalWrite(B_in1, LOW);
  digitalWrite(B_in2, HIGH);

  digitalWrite(F_in3, LOW);
  digitalWrite(F_in4, HIGH);
  digitalWrite(B_in3, LOW);
  digitalWrite(B_in4, HIGH);
  if(sec > 0) delay(sec * 1000);
}

void reverse(int sec) {
  digitalWrite(F_in1, HIGH);
  digitalWrite(F_in2, LOW);
  digitalWrite(B_in1, HIGH);
  digitalWrite(B_in2, LOW);

  digitalWrite(F_in3, HIGH);
  digitalWrite(F_in4, LOW);
  digitalWrite(B_in3, HIGH);
  digitalWrite(B_in4, LOW);
  if(sec > 0) delay(sec * 1000);
}

void turn_left(int sec) {
  digitalWrite(F_in1, LOW);
  digitalWrite(F_in2, LOW);
  digitalWrite(B_in1, HIGH);
  digitalWrite(B_in2, LOW);

  digitalWrite(F_in3, HIGH);
  digitalWrite(F_in4, LOW);
  digitalWrite(B_in3, HIGH);
  digitalWrite(B_in4, LOW);
  if(sec > 0) delay(sec * 1000);
}

void stop(int sec) {
  digitalWrite(F_in1, LOW);
  digitalWrite(F_in2, LOW);
  digitalWrite(B_in1, LOW);
  digitalWrite(B_in2, LOW);

  digitalWrite(F_in4, LOW);
  digitalWrite(F_in3, LOW);
  digitalWrite(B_in4, LOW);
  digitalWrite(B_in3, LOW);
  if(sec > 0) delay(sec * 1000);
}

void setup() {
  Serial.begin(115200);
  Serial.println("GPIO setup");

  // Configurer les broches en sortie
  pinMode(F_in1, OUTPUT);
  pinMode(F_in2, OUTPUT);
  pinMode(F_in3, OUTPUT);
  pinMode(F_in4, OUTPUT);
  pinMode(B_in1, OUTPUT);
  pinMode(B_in2, OUTPUT);
  pinMode(B_in3, OUTPUT);
  pinMode(B_in4, OUTPUT);

  // Initialiser à LOW
  stop(0);
}

void loop() {
    if(Serial.available()) {
      String cmd = Serial.readStringUntil('\n');
      execCommand(cmd);
    }
  }
  