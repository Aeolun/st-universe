import { ShipMount } from "src/universe/entities/ShipMount";
import { ExtractsResources } from "src/universe/entities/capabilities/ExtractsResources";
import { ProvidesScanPower } from "src/universe/entities/capabilities/ProvidesScanPower";
import { SurveysForResources } from "src/universe/entities/capabilities/SurveysForResources";
import { RequiresCrew } from "src/universe/entities/capabilities/RequiresCrew";
import { RequiresMountingPoings } from "src/universe/entities/capabilities/RequiresMountingPoings";
import { RequiresPower } from "src/universe/entities/capabilities/RequiresPower";
import { ResourceGroup } from "src/universe/static-data/resource-groups";

export enum Mount {
  MOUNT_GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  MOUNT_GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  MOUNT_GAS_SIPHON_III = "MOUNT_GAS_SIPHON_III",
  MOUNT_SURVEYOR_I = "MOUNT_SURVEYOR_I",
  MOUNT_SURVEYOR_II = "MOUNT_SURVEYOR_II",
  MOUNT_SURVEYOR_III = "MOUNT_SURVEYOR_III",
  MOUNT_SENSOR_ARRAY_I = "MOUNT_SENSOR_ARRAY_I",
  MOUNT_SENSOR_ARRAY_II = "MOUNT_SENSOR_ARRAY_II",
  MOUNT_SENSOR_ARRAY_III = "MOUNT_SENSOR_ARRAY_III",
  MOUNT_MINING_LASER_I = "MOUNT_MINING_LASER_I",
  MOUNT_MINING_LASER_II = "MOUNT_MINING_LASER_II",
  MOUNT_MINING_LASER_III = "MOUNT_MINING_LASER_III",
  MOUNT_LASER_CANNON_I = "MOUNT_LASER_CANNON_I",
  MOUNT_MISSILE_LAUNCHER_I = "MOUNT_MISSILE_LAUNCHER_I",
  MOUNT_TURRET_I = "MOUNT_TURRET_I",
}

export const mountData: Record<Mount, ShipMount> = {
  [Mount.MOUNT_GAS_SIPHON_I]: new ShipMount(Mount.MOUNT_GAS_SIPHON_I, "", "", [
    new ExtractsResources([ResourceGroup.GASES], 10),
    new RequiresCrew(0),
    new RequiresPower(1),
    new RequiresMountingPoings(1),
  ]),
  [Mount.MOUNT_GAS_SIPHON_II]: new ShipMount(
    Mount.MOUNT_GAS_SIPHON_II,
    "",
    "",
    [
      new ExtractsResources([ResourceGroup.GASES], 25),
      new RequiresCrew(2),
      new RequiresPower(2),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_GAS_SIPHON_III]: new ShipMount(
    Mount.MOUNT_GAS_SIPHON_III,
    "",
    "",
    [
      new ExtractsResources([ResourceGroup.GASES], 60),
      new RequiresCrew(4),
      new RequiresPower(4),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_SURVEYOR_I]: new ShipMount(
    Mount.MOUNT_SURVEYOR_I,
    "Surveyor I",
    "A basic survey probe that can be used to gather information about a mineral deposit.",
    [
      new SurveysForResources(
        [
          ResourceGroup.MINERALS,
          ResourceGroup.METAL_ORE,
          ResourceGroup.PRECIOUS_METAL_ORE,
        ],
        1
      ),
      new RequiresCrew(2),
      new RequiresPower(1),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_SURVEYOR_II]: new ShipMount(Mount.MOUNT_SURVEYOR_II, "", "", [
    new SurveysForResources(
      [
        ResourceGroup.MINERALS,
        ResourceGroup.METAL_ORE,
        ResourceGroup.PRECIOUS_METAL_ORE,
        ResourceGroup.GASES,
      ],
      2
    ),
    new RequiresCrew(3),
    new RequiresPower(3),
    new RequiresMountingPoings(1),
  ]),
  [Mount.MOUNT_SURVEYOR_III]: new ShipMount(
    Mount.MOUNT_SURVEYOR_III,
    "Surveyor III",
    "An advanced survey probe that can be used to gather information about a mineral deposit with even greater accuracy.",
    [
      new SurveysForResources(
        [
          ResourceGroup.MINERALS,
          ResourceGroup.METAL_ORE,
          ResourceGroup.PRECIOUS_METAL_ORE,
          ResourceGroup.RARE_METAL_ORE,
        ],
        3
      ),
      new RequiresCrew(7),
      new RequiresPower(5),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_SENSOR_ARRAY_I]: new ShipMount(
    Mount.MOUNT_SENSOR_ARRAY_I,
    "",
    "",
    [
      new ProvidesScanPower(1),
      new RequiresCrew(0),
      new RequiresPower(1),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_SENSOR_ARRAY_II]: new ShipMount(
    Mount.MOUNT_SENSOR_ARRAY_II,
    "",
    "",
    [
      new ProvidesScanPower(2),
      new RequiresCrew(2),
      new RequiresPower(2),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_SENSOR_ARRAY_III]: new ShipMount(
    Mount.MOUNT_SENSOR_ARRAY_III,
    "",
    "",
    [
      new ProvidesScanPower(4),
      new RequiresCrew(4),
      new RequiresPower(4),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_MINING_LASER_I]: new ShipMount(
    Mount.MOUNT_MINING_LASER_I,
    "",
    "",
    [
      new ExtractsResources(
        [ResourceGroup.MINERALS, ResourceGroup.METAL_ORE],
        10
      ),
      new RequiresCrew(0),
      new RequiresPower(1),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_MINING_LASER_II]: new ShipMount(
    Mount.MOUNT_MINING_LASER_II,
    "Mining Laser II",
    "An advanced mining laser that is more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
    [
      new ExtractsResources(
        [
          ResourceGroup.MINERALS,
          ResourceGroup.METAL_ORE,
          ResourceGroup.PRECIOUS_METAL_ORE,
        ],
        25
      ),
      new RequiresCrew(2),
      new RequiresPower(2),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_MINING_LASER_III]: new ShipMount(
    Mount.MOUNT_MINING_LASER_III,
    "",
    "",
    [
      new ExtractsResources(
        [
          ResourceGroup.MINERALS,
          ResourceGroup.METAL_ORE,
          ResourceGroup.PRECIOUS_METAL_ORE,
        ],
        60
      ),
      new RequiresCrew(4),
      new RequiresPower(4),
      new RequiresMountingPoings(1),
    ]
  ),
  [Mount.MOUNT_LASER_CANNON_I]: new ShipMount(
    Mount.MOUNT_LASER_CANNON_I,
    "",
    "",
    [new RequiresCrew(1), new RequiresPower(2), new RequiresMountingPoings(1)]
  ),
  [Mount.MOUNT_MISSILE_LAUNCHER_I]: new ShipMount(
    Mount.MOUNT_MISSILE_LAUNCHER_I,
    "",
    "",
    [new RequiresCrew(2), new RequiresPower(1), new RequiresMountingPoings(1)]
  ),
  [Mount.MOUNT_TURRET_I]: new ShipMount(Mount.MOUNT_TURRET_I, "", "", [
    new RequiresCrew(1),
    new RequiresPower(1),
    new RequiresMountingPoings(1),
  ]),
};
