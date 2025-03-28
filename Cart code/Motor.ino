#include <Arduino.h>

// Définition des broches
// Front Left Motor
#define F_in1 22
#define F_in2 23
#define F_en_a 12
// Front Right Motor
#define F_in3 24
#define F_in4 25
#define F_en_b 18

// Back Left Motor
#define B_in1 17
#define B_in2 27
#define B_en_a 19
// Back Right Motor
#define B_in3 5
#define B_in4 6
#define B_en_b 13

// Fréquence PWM
#define PWM_FREQ 1000
#define PWM_RES 8

// Canaux PWM (ESP32 a 16 canaux)
#define F_EN_A_CH 0
#define F_EN_B_CH 1
#define B_EN_A_CH 2
#define B_EN_B_CH 3


void setup() {
    // Configuration des broches
    pinMode(F_in1, OUTPUT);
    pinMode(F_in2, OUTPUT);
    pinMode(F_en_a, OUTPUT);
    pinMode(B_in1, OUTPUT);
    pinMode(B_in2, OUTPUT);
    pinMode(B_en_a, OUTPUT);

    pinMode(F_in3, OUTPUT);
    pinMode(F_in4, OUTPUT);
    pinMode(F_en_b, OUTPUT);
    pinMode(B_in3, OUTPUT);
    pinMode(B_in4, OUTPUT);
    pinMode(B_en_b, OUTPUT);

    // Configuration PWM
    ledcSetup(F_EN_A_CH, PWM_FREQ, PWM_RES);
    ledcAttachPin(F_en_a, F_EN_A_CH);
    ledcSetup(F_EN_B_CH, PWM_FREQ, PWM_RES);
    ledcAttachPin(F_en_b, F_EN_B_CH);
    ledcSetup(B_EN_A_CH, PWM_FREQ, PWM_RES);
    ledcAttachPin(B_en_a, B_EN_A_CH);
    ledcSetup(B_EN_B_CH, PWM_FREQ, PWM_RES);
    ledcAttachPin(B_en_b, B_EN_B_CH);

    // Démarrage PWM à 100% (255 pour 8 bits)
    ledcWrite(F_EN_A_CH, 255);
    ledcWrite(F_EN_B_CH, 255);
    ledcWrite(B_EN_A_CH, 255);
    ledcWrite(B_EN_B_CH, 255);

    // Initialisation à LOW
    digitalWrite(F_in1, LOW);
    digitalWrite(F_in2, LOW);
    digitalWrite(F_in4, LOW);
    digitalWrite(F_in3, LOW);
    digitalWrite(B_in1, LOW);
    digitalWrite(B_in2, LOW);
    digitalWrite(B_in4, LOW);
    digitalWrite(B_in3, LOW);
}

void forward(int sec) {
    digitalWrite(F_in1, LOW);
    digitalWrite(F_in2, HIGH);
    digitalWrite(B_in1, LOW);
    digitalWrite(B_in2, HIGH);

    digitalWrite(F_in4, HIGH);
    digitalWrite(F_in3, LOW);
    digitalWrite(B_in4, HIGH);
    digitalWrite(B_in3, LOW);
    delay(sec * 1000);  // Convertir secondes en millisecondes
}

void reverse(int sec) {
    digitalWrite(F_in1, HIGH);
    digitalWrite(F_in2, LOW);
    digitalWrite(B_in1, HIGH);
    digitalWrite(B_in2, LOW);

    digitalWrite(F_in4, LOW);
    digitalWrite(F_in3, HIGH);
    digitalWrite(B_in4, LOW);
    digitalWrite(B_in3, HIGH);
    delay(sec * 1000);
}

void turn_left(int sec) {
    digitalWrite(F_in1, LOW);
    digitalWrite(F_in2, LOW);
    digitalWrite(B_in1, HIGH);
    digitalWrite(B_in2, LOW);

    digitalWrite(F_in4, LOW);
    digitalWrite(F_in3, HIGH);
    digitalWrite(B_in4, LOW);
    digitalWrite(B_in3, HIGH);
    delay(sec * 1000);
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
    delay(sec * 1000);
}

void setup() {
    Serial.begin(115200);
    Serial.println("GPIO Clean up");
    motor.setup();
}

void loop() {
    Serial.println("forward");
    motor.forward(7);
    Serial.println("Back");
    motor.reverse(3);
    Serial.println("Stop");
    motor.stop(3);
    
    // Pour éviter de répéter indéfiniment, on met une pause longue après un cycle
    delay(10000);
}