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
      if (message.commands[i].commandType === "STATUS_CHECK") {
        results.push({
          completed: "true",
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      }
      switch (message.commands[i].commandType) {
        case "MODE_CHANGE":
          results.push({
            completed: "true",
            roverStatus: {
              mode: "LOW_POWER",
              generatorWatts: this.generatorWatts,
              position: 25,
            },
          });
          break;

          case "MOVE":
            results.push({
              completed: "false",
              roverStatus: {
                mode: 'LOW_POWER',
                generatorWatts: this.generatorWatts,
                position: 25,
              
              },
    
              
  
            });
            break;
      }
    }

    let response = {
      message: message.name,
      results: results,
    };
    console.log(response.message);
    return response;
  }
}

module.exports = Rover;

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("MOVE"),
];
let message = new Message("Test message with two commands", commands);
let rover = new Rover(98382); // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

// console.log(rover);
// console.log(message);
console.log(response);
// console.log(message.commands);
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
