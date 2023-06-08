import {Waypoint} from "./entities/Waypoint";
import {pickRandom, uniqueId} from "./utilities";
import {WaypointType, waypointTypeNames} from "./static-data/waypoint-types";

export const generateWaypoint = (data: {
    x: number,
    y: number,
    type?: WaypointType
    systemSymbol: string
}) => {
    const { systemSymbol, ...rest } = data

    const waypointSymbol = `${systemSymbol}_${uniqueId(data.x.toString()+data.y.toString())}`

    const waypoint = new Waypoint({
        type: pickRandom(waypointTypeNames),
        symbol: waypointSymbol,
        ...rest,
    })

    return waypoint
}