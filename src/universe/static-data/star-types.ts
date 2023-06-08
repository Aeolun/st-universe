export const starTypes: Record<string, { color: string }> = {
    YOUNG_STAR: {
        color: 'white'
    },
    BLUE_STAR: {
        color: 'blue'
    },
    ORANGE_STAR: {
        color: 'orange'
    },
    RED_STAR: {
        color: 'red'
    },
    BLACK_HOLE: {
        color: 'gray'
    },
    UNSTABLE: {
        color: 'pink'
    },
    WHITE_DWARF: {
        color: 'white'
    },
    HYPERGIANT: {
        color: 'darkred'
    },
    NEUTRON_STAR: {
        color: 'yellow'
    },
    NEBULA: {
        color: 'green'
    }
}

export const starTypeNames = Object.keys(starTypes)
