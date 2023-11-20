const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {
  test("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(5555)
    expect(rover.position).toBe(5555)
    expect(rover.mode).toBe('Normal')
    expect(rover.generatorWatts).toBe(110)
  })

 test("response returned by receiveMessage contains the name of the message", function(){
  let rover = new Rover(5555)
  let message = new Message("name of message", "command")
  let response = rover.receiveMessage(message)
  expect(response.message).toBe("name of message")
 })

test("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
  let rover = new Rover(5555)
  let commands = [new Command ("MOVE", 12345), new Command ("STATUS_CHECK")]
  let message = new Message ("do these two commands", commands)
  response = rover.receiveMessage(message)
  expect(response.results.length).toBe(2)
})

test('responds correctly to the status check command', function(){
  let rover = new Rover(5555)
  let commands = [new Command ("STATUS_CHECK")]
  let message = new Message ("do a status check", commands)
  let response = rover.receiveMessage(message)
  expect(response.results[0].completed).toBe(true)
  expect(response.results[0].roverStatus.mode).toBe("Normal")
  expect(response.results[0].roverStatus.generatorWatts).toBe(110)
  expect(response.results[0].roverStatus.position).toBe(5555)
})

test('responds correctly to the mode change command', function(){
  let rover = new Rover(5555)
  let commands = [new Command ("MODE_CHANGE", "LOW_POWER")]
  let message = new Message("change mode", commands)
  let response = rover.receiveMessage(message)
  expect(response.results[0].completed).toBe(true)
  expect(rover.mode).toBe("LOW_POWER")
})

test('responds with a false completed value when attempting to move in LOW_POWER mode',function(){
  let rover = new Rover(5555)
  let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command ("MOVE", 98765)]
  let message = new Message("move in low power", commands)
  let response = rover.receiveMessage(message)
  expect(response.results[1].completed).toBe(false)
  expect(rover.position).toBe(5555)
})

test('responds with the position for the move command', function(){
  let rover = new Rover(5555)
  let commands = [new Command ("MOVE", 98765)]
  let message = new Message("move in normal mode", commands)
  let response = rover.receiveMessage(message)
  expect(response.results[0].completed).toBe(true)
  expect(rover.position).toBe(98765)
})
});
