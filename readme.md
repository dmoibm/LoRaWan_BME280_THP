# CubeCell mit BME280

Dies ist eine Kopie deieses Beispieles: https://github.com/Securethingsuk/Heltec_CubeCell/tree/master/LoRaWan_BME280_THP

writen by S Collins  https://www.securethings.uk (c) for the HELTEC CubeCell Products

Funktioniert recht gut! Geändert wurde eigentlich nur **IsTxConfirmed = false** um den "The Things Network’s (TTN) Fair Access Policy" nachzukommen. 

Zudem wurde der Decoder auf Volt geändert (vorher Millivolt) sowie die Ausgabe der Werte als Number und nicht als String formatiert.