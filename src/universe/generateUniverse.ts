import { createCanvas } from 'canvas'
import {System} from "src/universe/entities/System";
import * as fs from "fs";
import {pickRandom} from "src/universe/utilities";
import {getDistance} from "src/universe/getDistance";
import {generateSystem} from "./generateSystem";
import {starTypes} from "./static-data/star-types";

const MAX_SYSTEMS = 12000
const MAX_FACTIONS = 12
const MAX_SYSTEM_DISTANCE = 40000
const MAX_MAP_SIZE = MAX_SYSTEM_DISTANCE + 10000
const STELLAR_ARMS = 5
const STEPS_PER_ARM = 16
const STEP_SIZE_DECREASE = 120
const SPREAD_SIZE_DECREASE = 300
const STEP_SYSTEM_DECREASE = 3
const SPREAD_MULTIPLIER = 3.7
const STEP_MULTIPLIER = 1.75
const UNIVERSE_ROTATION_SPEED = Math.PI / 15
const CANVAS_SIZE = 2500
const MINIMUM_DISTANCE_APART = 250
const MAXIMUM_DISTANCE_APART = 1500
const UNIVERSE_SYMBOL = 'X1'

export function generateUniverse() {
    const startPos = {x: 0, y: 0}
    let failedPositionAttempts = 0;

    const systems: System[] = []
    for(let i = 0; i < STELLAR_ARMS; i++) {
        console.log(`Arm ${i}/${STELLAR_ARMS}`)
        const systemsInArm = Math.round(MAX_SYSTEMS / STELLAR_ARMS)
        let spreadSize = Math.round(MAX_SYSTEM_DISTANCE / STEPS_PER_ARM) * SPREAD_MULTIPLIER
        let rotation = (Math.PI * 2 / STELLAR_ARMS) * i;
        let systemsInStep = Math.round(systemsInArm / STEPS_PER_ARM)
        let stepSize = Math.round(MAX_SYSTEM_DISTANCE / STEPS_PER_ARM) * STEP_MULTIPLIER
        for(let step = 1; step < STEPS_PER_ARM; step++) {
            console.log(`Step ${step}/${STEPS_PER_ARM}`)
            rotation += UNIVERSE_ROTATION_SPEED
            systemsInStep -= STEP_SYSTEM_DECREASE
            spreadSize -= SPREAD_SIZE_DECREASE
            stepSize -= STEP_SIZE_DECREASE
            const rotationVectorX = Math.sin(rotation)
            const rotationVectorY = Math.cos(rotation)

            for(let j = 0; j < systemsInStep; j++) {
                console.log(`System ${j}/${systemsInStep}`)

                let potentialX: number, potentialY: number, attempts = 0
                do {
                    const rotation = Math.random() * Math.PI * 2
                    potentialX = startPos.x + (step * stepSize * rotationVectorX) + Math.round(Math.sin(rotation) * Math.random() * spreadSize - spreadSize / 2)
                    potentialY = startPos.y + (step * stepSize * rotationVectorY) + Math.round(Math.cos(rotation) * Math.random() * spreadSize - spreadSize / 2)
                    attempts++
                } while(
                    (
                        systems.some(system => getDistance(system, {x: potentialX, y: potentialY}) < MINIMUM_DISTANCE_APART) ||
                        systems.every(system => getDistance(system, {x: potentialX, y: potentialY}) > MAXIMUM_DISTANCE_APART)
                    )
                    && attempts < 30)
                if (attempts >= 30) {
                    failedPositionAttempts++
                }

                const system = generateSystem({
                    x: potentialX,
                    y: potentialY,
                    universeSymbol: UNIVERSE_SYMBOL
                })
                systems.push(system)
            }
        }
    }

    let shortestDistance = 1000
    let longestDistance = 0
    let totalMin = 0
    systems.forEach(system => {
        let minDist = 10000
        systems.forEach(otherSystem => {
            if (system === otherSystem) return;
            const dist = getDistance(system, otherSystem)
            if (dist < minDist) minDist = dist
        })

        totalMin += minDist / systems.length
        if (minDist > longestDistance) {
            longestDistance = minDist
        }
        if (minDist < shortestDistance) {
            shortestDistance = minDist
        }
    })

    console.log(`Failed to position with gap after 10 attempts for ${failedPositionAttempts} systems`)
    console.log(`Furthest distance between systems: ${longestDistance}, shortest ${shortestDistance}, average ${totalMin}`)
    console.log(`Universe with ${systems.length} systems generated, output image.`)
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    const context = canvas.getContext('2d')
    const scale = CANVAS_SIZE / MAX_MAP_SIZE / 2
    context.fillStyle = 'black';
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    for(const system of systems) {
        context.beginPath()
        context.arc(CANVAS_SIZE / 2 + Math.round(system.x * scale), CANVAS_SIZE / 2 + Math.round(system.y * scale), 2, 0, 2 * Math.PI, false);
        context.fillStyle = starTypes[system.type].color
        context.closePath()
        context.fill()
    }

    const imgBuffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./systems.png', imgBuffer)
}

generateUniverse();