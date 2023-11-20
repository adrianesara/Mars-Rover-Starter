const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position,mode = "Normal",generatorWatts= 110){
      this.position = position
      this.mode = mode
      this.generatorWatts = generatorWatts

   }

   receiveMessage(message){
      let command_results = []
      for(let i=0; i < message.commands.length; i++){
         if(message.commands[i].commandType == "MOVE" && this.mode != "LOW_POWER"){
            this.position = message.commands[i].value
            command_results.push({completed: true})
         } else if(message.commands[i].commandType == "STATUS_CHECK"){
            command_results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            })
         } else if(message.commands[i].commandType == "MODE_CHANGE"){
            this.mode = message.commands[i].value
            command_results.push({
               completed: true
            })
         } else {
            command_results.push({
               completed: false
            })
         }
      }

      let response = {
         message: message.name,
         results: command_results
      }


      return response
   }     
}

module.exports = Rover;