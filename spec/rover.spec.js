const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(12212);
      expect(rover.position).toBe(12212);
      expect(rover.mode).toBe('NORMAL');
      expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(12212);
    let message = new Message('Test message with two commands');
    let response = rover.receiveMessage(message);
    expect(message.name).toBe('Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(12212);
    let response = rover.receiveMessage(results);
    expect(result).toBe()

  })

});
