const batteryLevel = require('battery-level');
const mqtt = require('mqtt');

const MQTT_IP = "mqtt://127.0.0.1";
const MQTT_USER = "";
const MQTT_PASS = "";

const PUBLISH_INTERVAL_SECONDS  = 10;
const SENSOR_BATTERY_TOPIC = "hass/device1/battery";

var interval_token;
var is_connected = false;


// Create a client connection to CloudMQTT for live data
var client = mqtt.connect(MQTT_IP, {
  username: MQTT_USER,
  password: MQTT_PASS 
});

client.on('connect', function() { // When connected
	console.log("Connected to MQTT server.");
	
	interval_token = setInterval(function(){
		batteryLevel().then(function(data){
			data = (data * 100).toFixed(2).toString();
			console.log("Battery: " + data);
			client.publish(SENSOR_BATTERY_TOPIC, data);
		});
	}, PUBLISH_INTERVAL_SECONDS * 1000);
});


