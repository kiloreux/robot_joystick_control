HOST='10.3.65.166';
API_KEY='';


var config = {
    server: 'wss://api.api.ai:4435/api/ws/query',
    token: API_KEY,
    sessionId: 9291787, //Just a random number
    onInit: function () {
        console.log("> ON INIT use config");
    }
};

var ros = new ROSLIB.Ros({
    url : 'ws://'+HOST+':9090'
});

var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/RosAria/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

var apiAi = new ApiAi(config);


var command_it = function() {
    apiAi.init();
};

apiAi.onInit = function() {
    apiAi.open();
};

apiAi.onOpen = function () {
    apiAi.startListening();
    setTimeout(StopListen,4000);//Wait 4 seconds before stopping listening
};

var StopListen = function() {
    apiAi.stopListening();
};

apiAi.onResults = function (data) {
    voice_command(parseInt(data.result.parameters.steps), 0);
};

function voice_command (linear, angular) {
    move(linear,angular);
    setTimeout(stop,1000);// Wait 1 second before stopping
};

function move(linear,angular) {
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

function stop() {
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
