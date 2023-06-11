import {numberBetween, percentageChance, pickRandom, uniqueId} from "./utilities";
import {System} from "./entities/System";
import {starTypeNames, starTypes} from "./static-data/star-types";
import {generateWaypoint} from "./generateWaypoint";
import {Waypoint} from "./entities/Waypoint";
import {JumpGate} from "src/universe/entities/JumpGate";
import {getDistance} from "src/universe/getDistance";

const JUMP_GATE_CHANCE = 10
const SYSTEM_SIZE = 100
const JUMP_GATE_RANGE = 2000
const SUPERDUTY_JUMP_GATE_RANGE = 5000

export const generateSystem = (data: {
    x: number,
    y: number,
    universeSymbol: string
}) => {
    const systemSymbol = `${data.universeSymbol}_${uniqueId(data.x.toString()+data.y.toString()).substring(0, 4)}`

    const hasJumpgate = percentageChance(JUMP_GATE_CHANCE)

    const systemType = pickRandom(starTypeNames)

    const system = new System({
        x: data.x,
        y: data.y,
        type: systemType,
        sectorSymbol: data.universeSymbol,
        symbol: systemSymbol
    })

    const systemData = starTypes[systemType]

    const waypointCount = numberBetween(systemData.minWaypoints, systemData.maxWaypoints);

    const waypoints: Waypoint[] = []
    for(let i = 0; i < waypointCount; i++) {
        let potentialX = 0, potentialY = 0, attempts = 0
        do {
            const distance = SYSTEM_SIZE * Math.random()
            potentialX = Math.sin(Math.random() * Math.PI * 2) * distance
            potentialY = Math.cos(Math.random() * Math.PI * 2) * distance
        } while((waypoints.some(wp => getDistance(wp, {x: potentialX, y: potentialY}) < 25) || getDistance({x: 0, y: 0}, {x: potentialX, y: potentialY}) < 25) && attempts < 4)

        const wp = generateWaypoint({
            x: potentialX,
            y: potentialY,
            systemSymbol
        })
        waypoints.push(wp)
        system.waypoints.push(wp)
        wp.orbitals.forEach(o => {
            system.waypoints.push(o)
        })
    }

    if (hasJumpgate) {
        console.log("hasjumpgate")
        const jumpGate =  generateWaypoint({
            x: Math.sin(Math.random() * Math.PI * 2) * SYSTEM_SIZE,
            y: Math.cos(Math.random() * Math.PI * 2) * SYSTEM_SIZE,
            systemSymbol,
            type: 'JUMP_GATE'
        })
        jumpGate.jumpGate = new JumpGate({
            range: percentageChance(10) ? SUPERDUTY_JUMP_GATE_RANGE : JUMP_GATE_RANGE
        })
        system.waypoints.push(jumpGate)
        jumpGate.orbitals.forEach(o => {
            system.waypoints.push(o)
        })
    }


    return system
}