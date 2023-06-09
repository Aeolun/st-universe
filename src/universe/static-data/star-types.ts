export const starTypes: Record<string, { color: string, minWaypoints: number, maxWaypoints: number }> = {
    YOUNG_STAR: {
        minWaypoints: 1,
        maxWaypoints: 4,
        color: 'white'
    },
    BLUE_STAR: {
        minWaypoints: 2,
        maxWaypoints: 5,
        color: 'blue'
    },
    ORANGE_STAR: {
        minWaypoints: 3,
        maxWaypoints: 7,
        color: 'orange'
    },
    RED_STAR: {
        minWaypoints: 3,
        maxWaypoints: 8,
        color: 'red'
    },
    BLACK_HOLE: {
        minWaypoints: 0,
        maxWaypoints: 1,
        color: 'gray'
    },
    UNSTABLE: {
        minWaypoints: 0,
        maxWaypoints: 1,
        color: 'pink'
    },
    WHITE_DWARF: {
        minWaypoints: 1,
        maxWaypoints: 2,
        color: 'white'
    },
    HYPERGIANT: {
        minWaypoints: 1,
        maxWaypoints: 2,
        color: 'darkred'
    },
    NEUTRON_STAR: {
        minWaypoints: 0,
        maxWaypoints: 1,
        color: 'yellow'
    },
    NEBULA: {
        minWaypoints: 1,
        maxWaypoints: 3,
        color: 'green'
    }
}

export const starTypeNames = Object.keys(starTypes)
