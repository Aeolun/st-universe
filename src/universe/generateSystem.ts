import {numberBetween, percentageChance, pickRandom, uniqueId} from "./utilities";
import {System} from "./entities/System";
import {starTypeNames} from "./static-data/star-types";
import {generateWaypoint} from "./generateWaypoint";
import {Waypoint} from "./entities/Waypoint";

const WAYPOINT_MIN = 2
const WAYPOINT_MAX = 7
const JUMP_GATE_CHANCE = 10
const SYSTEM_SIZE = 100
const JUMP_GATE_RANGE = 2000

export const generateSystem = (data: {
    x: number,
    y: number,
    universeSymbol: string
}) => {
    const systemSymbol = `${data.universeSymbol}_${uniqueId(data.x.toString()+data.y.toString()).substring(0, 4)}`

    const waypointCount = numberBetween(WAYPOINT_MIN, WAYPOINT_MAX)
    const hasJumpgate = percentageChance(JUMP_GATE_CHANCE)

    const system = new System({
        x: data.x,
        y: data.y,
        type: pickRandom(starTypeNames),
        symbol: systemSymbol
    })

    const potentialX = Math.random() * SYSTEM_SIZE*2 - SYSTEM_SIZE
    const potentialY = Math.random() * SYSTEM_SIZE*2 - SYSTEM_SIZE

    const waypoints: Waypoint[] = []
    for(let i = 0; i < waypointCount; i++) {
        const wp = generateWaypoint({
            x: potentialX,
            y: potentialY,
            systemSymbol
        })
        waypoints.push(wp)
        system.waypoints.push(wp)
    }


    return system
}