var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

var utilsSpawner = require('utils.spawner');

module.exports.loop = function () {

    // Clean dead screeps from memory
    for(var i in Memory.creeps)
    {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    // Run auto spawn rules
    utilsSpawner.autospawn(Game.spawns.Spawn1.room);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
