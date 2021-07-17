// TTN Formater V3 (new TTN or The Things Stack)
function bytesToFloat(by) {
    var bits = by[3]<<24 | by[2]<<16 | by[1]<<8 | by[0];
    var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
    var e = bits>>>23 & 0xff;
    var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
}

function decodeUplink(input) {
  var bytes = input.bytes;
  var port = input.fPort;
  var decoded = {};

  if (port === 2) {
    var i = 0;
    decoded.temperature = Number(bytesToFloat(bytes.slice(i,i+=4)).toFixed(2));
    decoded.humidity = Number(bytesToFloat(bytes.slice(i,i+=4)).toFixed(2));
    decoded.pressure = Number(bytesToFloat(bytes.slice(i,i+=4)).toFixed(2));
    decoded.battery = Number(((bytes[12] << 8) | bytes[13]).toFixed(0))/1000;
  }
  return { data: decoded };
}