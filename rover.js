const Message = require("./message.js");
const Command = require("./command.js");

class Rover {
  constructor(position, mode, generatorWatts) {
    this.position = position;
    this.mode = "NORMAL"; //dont change this here, change it in spec
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
      let results = [];
    
      for (let i = 0; i < message.commands.length; i++) {
        let command = message.commands[i];
        let result = {};
    
        switch (command.commandType) {
          case "STATUS_CHECK":
            result.completed = true;
            result.roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            };
            break;
    
          case "MODE_CHANGE":
            this.mode = command.value;
            result.completed = true;
            result.roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            };
            break;
    
          case "MOVE":
            if (this.mode === "LOW_POWER") {
              result.completed = false;
            } else {
              this.position = command.value;
              result.completed = true;
            }
            result.roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            };
            break;
        }
    
        results.push(result);
      }
    

    let response = {
      message: message.name,
      results: results,
    };
    // console.log(response.message);
    return response;
  }
}

module.exports = Rover;

let rover = new Rover(12212, "NORMAL");
let commands = [
  new Command('MODE_CHANGE', "LOW_POWER"),
  new Command("STATUS_CHECK"),
  new Command("MOVE", 25),
];
let message = new Message("Test message with two commands", commands);

let response = rover.receiveMessage(message);

console.log("ROVER:xxxxxxxxxx", rover);
console.log("MESSAGE.COMMANDS:xxxxxxxxxx", message.commands);
console.log("MESSAGExxxxxxxxxxxx",message);
console.log("RESPONSE(ROVER.RECIEVEMESSAGE):xxxxxxxx", response);
console.log("RESOONES.RESULTS:xxxxxxxxxxxxxx", response.results);

// console.log(message.commands.length);

// let rover = new Rover(100);
// let commands = [
//    new Command('MOVE', 4321),
//    new Command('STATUS_CHECK'),
//    new Command('MODE_CHANGE', 'LOW_POWER'),
//    new Command('MOVE', 3579),
//    new Command('STATUS_CHECK')
// ];
// let message = new Message('TA power', commands);
// let response = rover.receiveMessage(message);
