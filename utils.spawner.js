/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils.spawner');
 * mod.thing == 'a thing'; // true
 */

const MAX_HARVESTER_COUNT = 4;
const MAX_UPGRADER_COUNT = 2;
const MAX_BUILDER_COUNT = 6;

var spawner =
{
    autospawn(aRoom)
    {
        var harvesterCount = _(aRoom.find(FIND_MY_CREEPS)).filter({ memory: { role: 'harvester' }}).value().length;
        var upgraderCount = _(aRoom.find(FIND_MY_CREEPS)).filter({ memory: { role: 'upgrader' }}).value().length;
        var builderCount = _(aRoom.find(FIND_MY_CREEPS)).filter({ memory: { role: 'builder' }}).value().length;

        console.log("harvester count: " + harvesterCount + " upgraderCount: " + upgraderCount + " builderCount: " + builderCount);

        if(harvesterCount < MAX_HARVESTER_COUNT)
        {
            Game.spawns.Spawn1.createCreep([WORK, MOVE, MOVE, CARRY], null, {role:'harvester'});
        }

        if(upgraderCount < MAX_UPGRADER_COUNT)
        {
            Game.spawns.Spawn1.createCreep([WORK, MOVE, MOVE, CARRY], null, {role:'upgrader'});
        }

        if(builderCount < MAX_BUILDER_COUNT)
        {
            Game.spawns.Spawn1.createCreep([WORK, WORK, MOVE, CARRY], null, {role:'builder'});
        }
    }
}

module.exports = spawner;
