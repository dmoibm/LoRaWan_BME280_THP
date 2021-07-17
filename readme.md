# CubeCell HTCC-AB01 mit BME280

Dies ist eine Kopie dieses Beispieles: https://github.com/Securethingsuk/Heltec_CubeCell/tree/master/LoRaWan_BME280_THP

writen by S Collins  https://www.securethings.uk (c) for the HELTEC CubeCell Products

Funktioniert recht gut! Geändert wurde eigentlich nur **IsTxConfirmed = false** um den "The Things Network’s (TTN) Fair Access Policy" nachzukommen. 

Zudem wurde der Decoder auf Volt geändert (vorher Millivolt) sowie die Ausgabe der Werte als Number und nicht als String formatiert. So können die Daten besser ausgewertet werden.

DevEui, AppEui und AppKey werden via AT Befehle gesendet. Siehe https://heltec-automation-docs.readthedocs.io/en/latest/cubecell/lorawan/config_parameter.html#deveui

AT+DevEui=004A89B076F2109B  
AT+AppEui=70B3D58ED001C90C  
AT+AppKey=(siehe TTN https://console.ttn.opennetworkinfrastructure.org/ oder neu https://eu1.cloud.thethings.network/console)
## Versuchsaufbau ohne Solarpanel
- Board: CubeCell – Dev-Board - HTCC-AB01  
- Sensor: BME/BMP 280  
- Akku: Li Ion 18650 (es steht 8'800mAh drauf, hat aber sicher nur max 3'400 mAh, mehr geht nicht. Mein Batterietester meldet sogar nur 980mAh)  
- Antenne: super Antenne! (keine Ahnung welches Fabrikat)  
- LoRaWAN Gateway: RAK7258 WisGate Edge Lite  

Der Gateway ist ca. 20m vom Device entfernt und durch eine Ziegelsteinmauer getrennt.  
![Versuchsaufbau V1: ohne Solarpanel](https://github.com/dmoibm/LoRaWan_BME280_THP/blob/master/img/AufbauV1.jpeg?raw=true)
## Stromverbrauch
Heltec verspricht 3.5uA im deep sleep mode. Das Device sendet alle 10min. Temperatur, Luftfeuchtigkeit, Luftdruck und Batteriespannung. Die LED blinkt beim senden.  
- Erstes senden: 14.02.2020  
- Letztes Senden: 23.06.2021  
- Tage: 495
- ca. 71'280 mal senden
- Spannung bei Start: 4.1V
- Spannung am Ende: 3.12V  
- Hat jemand eine Ahnung wie ich nun die Leistungsaufnahme berechnen könnte?

![Spannungsverlauf über 16 Monate](https://github.com/dmoibm/LoRaWan_BME280_THP/blob/master/img/Spannungsverlauf.png?raw=true)    
Leider misst das Board nicht die effektive Spannung des Akkus. Irgendwie scheint es bei unterschreiten der Regelespannung die geregelte Spannung anzuzeigen? Mit Multimeter gemessen: 3.12V.
## Versuchsaufbau mit Solar
Da nun die Akkuspannung unter 3.1V gesunken ist habe ich ein Solarpanel ca. 5x6cm angeschlossen und das Panel ans Fenster geklebt. Und nun nach ca. 20 Tagen zeigt sich wie gut dies funktioniert:    
![Spannungsverlauf über 16 Monate](https://github.com/dmoibm/LoRaWan_BME280_THP/blob/master/img/NachSolarpanel.png?raw=true)    

## Auswertungssystem
```CubeCell -> RAK7258 -> TTN -> FHEM -> InfluxDB -> Grafana```    
Diese Grafik wurde in Grafana erzeugt. Die Daten holt sich Grafana über InfluxDB, In InfluxDB werden sie von FHEM gespeichert. FHEM holt sie über den MQTT2_CLIENT direkt vom TTN Netzwerk. Ins TTN Netzwerk gelangen die Daten meistens über meinen LoRaWAN Gateway RAK7258 WisGate Edge Lite. Meistens, da ab und an ein anderes Gateway in der Nähe des Sensors die Übertragung erledigt.    
InfluxDB und Grafana sind auf einem und FHEM auf einem anderen Raspberry PI installiert. Das Netzwerkkabel des FHEM Raspi hat einen Wackel. Und so passiert es, dass nach dem Putzen dieser nicht ordnungsgemäss läuft. Darum hat das Diagramm einige Lücken;-)
## FHEM
Der grösste Aufwand war es die Daten ins FHEM zu kriegen. Darum hier meine FHEM Definitionen für Gate und Device:    
```
define TTNGate MQTT2_CLIENT eu1.cloud.thethings.network:8883
attr TTNGate SSL 1
attr TTNGate rawEvents .*
attr TTNGate room TTN
attr TTNGate username 0074711@ttn

define TTNDevice_008 MQTT2_DEVICE TTNGate
attr TTNDevice_008 IODev TTNGate
attr TTNDevice_008 jsonMap correlation_ids_1:0 correlation_ids_2:0 correlation_ids_3:0 correlation_ids_4:0 correlation_ids_5:0 correlation_ids_6:0 correlation_ids_7:0 end_device_ids_application_ids_application_id:0 end_device_ids_dev_addr:0 end_device_ids_dev_eui:0 end_device_ids_device_id:DeviceID end_device_ids_join_eui:0 received_at:ReceivedAt uplink_message_consumed_airtime:Airtime uplink_message_decoded_payload_battery:Battery uplink_message_decoded_payload_humidity:Humidity uplink_message_decoded_payload_pressure:Pressure uplink_message_decoded_payload_temperature:Temperature uplink_message_f_cnt:Count uplink_message_f_port:Port uplink_message_frm_payload:0 uplink_message_locations_user_altitude:Altitude uplink_message_locations_user_latitude:Latitude uplink_message_locations_user_longitude:Longitude uplink_message_locations_user_source:0 uplink_message_received_at:0 uplink_message_rx_metadata_1_channel_index:0 uplink_message_rx_metadata_1_channel_rssi:rssi uplink_message_rx_metadata_1_gateway_ids_eui:0 uplink_message_rx_metadata_1_gateway_ids_gateway_id:GatewayID uplink_message_rx_metadata_1_rssi:0 uplink_message_rx_metadata_1_snr:0 uplink_message_rx_metadata_1_timestamp:0 uplink_message_rx_metadata_1_uplink_token:0 uplink_message_session_key_id:0 uplink_message_settings_coding_rate:0 uplink_message_settings_data_rate_index:0 uplink_message_settings_data_rate_lora_bandwidth:0 uplink_message_settings_data_rate_lora_spreading_factor:0 uplink_message_settings_frequency:0 uplink_message_settings_timestamp:0
attr TTNDevice_008 readingList TTNGate:v3/0074711\x40ttn/devices/008/up:.* { json2nameValue($EVENT, '', $JSONMAP) }
attr TTNDevice_008 room TTN
attr TTNDevice_008 stateFormat Temperature°C Humidity% Pressure p Battery V
```   


