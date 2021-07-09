# CubeCell HTCC-AB01 mit BME280

Dies ist eine Kopie deieses Beispieles: https://github.com/Securethingsuk/Heltec_CubeCell/tree/master/LoRaWan_BME280_THP

writen by S Collins  https://www.securethings.uk (c) for the HELTEC CubeCell Products

Funktioniert recht gut! Geändert wurde eigentlich nur **IsTxConfirmed = false** um den "The Things Network’s (TTN) Fair Access Policy" nachzukommen. 

Zudem wurde der Decoder auf Volt geändert (vorher Millivolt) sowie die Ausgabe der Werte als Number und nicht als String formatiert. So können die Daten besser ausgewertet werden.

DevEui, AppEui und AppKey werden via AT Befehle gesendet. Siehe https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/lorawan/config_parameter.html#deveui

AT+DevEui=004A89B076F2109B  
AT+AppEui=70B3D58ED001C90C  
AT+AppKey=(siehe TTN https://console.ttn.opennetworkinfrastructure.org/)
## Versuchsaufbau ohne Solarpanel
- Board: CubeCell – Dev-Board - HTCC-AB01  
- Sensor: BME/BMP 280  
- Akku: Li Ion 18650 (es steht 8'800mAh drauf, hat aber sicher nur max 3'400 mAh)  
- Antenne: super Antenne! (keine Ahnung welches Fabrikat)  
- LoRaWAN Gateway: RAK7258 WisGate Edge Lite  

Der Gateway ist ca. 20m vom Device entfernt und durch eine Ziegelsteinmauer getrennt.  
![Versuchsaufbau V1: ohne Solarpanel](https://github.com/dmoibm/LoRaWan_BME280_THP/blob/master/img/AufbauV1.jpeg?raw=true)
## Stromverbrauch
Heltec verspricht 3.5uA im deep sleep mode. Das Device sendet alle 10min. Temperatur, Luftfeuchtigkeit, Luftdruck und Bateriespannung. Die LED blinkt beim senden.  
- Erstes senden: 14.02.2020  
- Letztes Senden: 23.06.2021  
- Tage: 495
- ca. 71'280 mal senden
- Spannung bei Start: 4.1V
- Spannung am Ende: 3.12V  
- Hat jemand eine Ahnung wie ich nun die Leistungsaufnahme berechnen könnte?

![Spannungsverlauf über 16 Monate](https://github.com/dmoibm/LoRaWan_BME280_THP/blob/master/img/Spannungsverlauf.png?raw=true)
