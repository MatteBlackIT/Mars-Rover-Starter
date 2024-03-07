const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(12212);
    expect(rover.position).toBe(12212012);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover(12212012);
    let message = new Message("Test message with two commands");
    let response = rover.receiveMessage(message);
    expect(message.name).toBe("Test message with two commands");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(12212012);
    let commands = [
      new Command("STATUS_CHECK"),
      new Command("MODE_CHANGE", "LOW_POWER"),
    ];
    let results = [];
    let message = new Message("Test message with two commands", commands);
    let response = rover.receiveMessage(results);
    expect(message.response).toBe(Message.commands);
  });

  it("responds correctly to the status check command", function () {
    let rover = new Rover(12212012, "NORMAL");
    let message = new Message("Test status check command");
    let command = new Command([new Command("STATUS_CHECK")]);
    let response = rover.receiveMessage(message);

    expect(response.message).toBe("Test status check command");
    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(12212012);
  });

  it("responds correctly to the mode change command", function () {
    let rover = new Rover(12212012, "LOW_POWER");
    let message = new Message("Test mode change command");
    let command = new Command([new Command("MODE_CHANGE")]);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe("true");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12325)];
    let rover = new Rover(12212012);
    let message = new Message("Test LOW_POWER", commands);
      new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12212012);
    let response = rover.receiveMessage(message);

    expect(response.results[1].roverStatus.mode).toBe("LOW_POWER");
    expect(response.results[1].completed).toBe("false");
  });

  it("responds with position for move command", () => {
    let commands = [new Command('MOVE', 25)];
    let rover = new Rover(12212012);
    let message = new Message("Test MOVE", commands);
      new Command('MOVE', 25);
      new Command('STATUS_CHECK')
    let response = rover.receiveMessage(message);

    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].completed).toBe("true");
    expect(response.results[1].roverStatus.position).toBe(25);


  });
});


