export type WaypointType = 'ASTEROID_FIELD' | 'GAS_GIANT' | 'PLANET' | 'MOON' | 'ORBITAL_STATION' | 'JUMP_GATE'
export const waypointTypes: Record<WaypointType, { text?: string, isOrbital: boolean, maxTraits: number, orbitalOptions?: { type: WaypointType; orbitalCount: Record<number, number> }[] }> = {
    ASTEROID_FIELD: {
        isOrbital: false,
        maxTraits: 2,
        orbitalOptions: [{
            type: 'ORBITAL_STATION',
            orbitalCount: {
                0: 95,
                1: 5
            }
        }]
    },
    PLANET: {
        isOrbital: false,
        maxTraits: 4,
        orbitalOptions: [{
            type: 'MOON',
            orbitalCount: {
                0: 50,
                1: 25,
                2: 15,
                3: 10
            }
        },{
            type: 'ORBITAL_STATION',
            orbitalCount: {
                0: 90,
                1: 9,
                2: 1
            }
        }],
    },
    MOON: {
        isOrbital: true,
        maxTraits: 2,
        orbitalOptions: []
    },
    ORBITAL_STATION: {
        isOrbital: true,
        maxTraits: 3,
        orbitalOptions: []
    },
    GAS_GIANT: {
        isOrbital: false,
        maxTraits: 2,
        orbitalOptions: [{
            type: 'MOON',
            orbitalCount: {
                0: 80,
                1: 15,
                2: 5
            }
        }
        ,{
            type: 'ORBITAL_STATION',
            orbitalCount: {
                0: 90,
                1: 10
            }
        }],
    },
    JUMP_GATE: {
        isOrbital: false,
        maxTraits: 0,
        orbitalOptions: []
    }
}

export const waypointTypeNames = Object.keys(waypointTypes) as WaypointType[]
export const generatableWaypointTypeNames = waypointTypeNames.filter(type => !waypointTypes[type].isOrbital && type !== 'JUMP_GATE') as WaypointType[]
