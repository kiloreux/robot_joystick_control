HOST='localhost'

var ros = new ROSLIB.Ros({
    url : 'ws://'+HOST+':9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/RosAria/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

var move = function(linear,angular) {
    var twist = new ROSLIB.Message({
        linear: {
            x : linear,
            y : 0,
            z : 0
        } ,
        angular: {
            x : 0,
            y : 0,
            z : angular
        }
    });
    cmdVel.publish(twist);
};



var stop = function() {
    var twist = new ROSLIB.Message({
        linear: {
            x : 0,
            y : 0,
            z : 0
        } ,
        angular: {
            x : 0,
            y : 0,
            z : 0
        }
    });
    cmdVel.publish(twist);
};
