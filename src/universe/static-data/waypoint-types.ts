export type WaypointType = 'ASTEROID_FIELD' | 'GAS_GIANT' | 'PLANET' | 'MOON' | 'ORBITAL_STATION'
export const waypointTypes: Record<WaypointType, { text?: string, orbitalOptions?: { type: WaypointType; orbitalCount: number[] }[] }> = {
    ASTEROID_FIELD: {
        orbitalOptions: [{
            type: 'ORBITAL_STATION',
            orbitalCount: [0, 0, 1]
        }]
    },
    PLANET: {
        orbitalOptions: [{
            type: 'MOON',
            orbitalCount: [0, 0, 1, 1, 2, 2, 3]
        },{
            type: 'ORBITAL_STATION',
            orbitalCount: [0, 0, 0, 0, 1]
        }],
    },
    MOON: {

    },
    ORBITAL_STATION: {

    },
    GAS_GIANT: {

    }
}

export const waypointTypeNames = Object.keys(waypointTypes) as WaypointType[]
