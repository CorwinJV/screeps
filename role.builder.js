var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        if(creep.memory.building == null)
        {
            creep.memory.building = false
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(target) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target);
            }
	    }
	    else {
	        var source = this.findExtensionWithEnergy(creep);
	        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
	    }
	},

	findExtensionWithEnergy:function(creep)
	{
        var target = null;

        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES)

        for(var i = 0; i < extensions.length; i++)
        {
            var extension = extensions[i];
            if(extension.structureType == "extension"
                && extension.energy > 0)
            {
                target = extension;
                break;
            }
        }

        if(target == null)
        {
            target = creep.pos.findClosestByPath(FIND_SOURCES);
        }

        return target;
	}
};

module.exports = roleBuilder;
