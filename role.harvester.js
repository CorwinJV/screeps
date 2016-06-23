/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester =
{

    run:function(creep)
    {
        if(creep.carry.energy < creep.carryCapacity)
        {
            var sources = creep.room.find(FIND_SOURCES);

            if(sources[0] && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        else
        {
            var target = this.findEmptyStorage(creep);
            //console.log("target: " + target)

            if(target)
            {
                var err = creep.transfer(target, RESOURCE_ENERGY);
                if(err == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(target);
                }
            }
        }
    },

    findEmptyStorage:function(creep)
    {
        var target = null;

        // If the spawner is full up on energy, dump it into the extension
        if(Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity)
        {
            //console.log("room: " + JSON.stringify(Game.spawns.Spawn1.room));
            var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES)

			//console.log("extensions count: " + JSON.stringify(extensions))
            for(var i = 0; i < extensions.length; i++)
            {
                //console.log(JSON.stringify(extensions[i]))

                var extension = extensions[i];
                if(extension.structureType == "extension"
                    && extension.energy < extension.energyCapacity)
                {
                    target = extension;
                    break;
                }
            }
        }
        else
        {
            target = Game.spawns.Spawn1;
        }

        return target;
    }

}

module.exports = roleHarvester;
