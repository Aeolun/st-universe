import {ShipMount} from "src/universe/entities/ShipMount";
import {ExtractsResources} from "src/universe/entities/capabilities/ExtractsResources";
import {ProvidesScanPower} from "src/universe/entities/capabilities/ProvidesScanPower";
import {SurveysForResources} from "src/universe/entities/capabilities/SurveysForResources";
import {RequiresCrew} from "src/universe/entities/capabilities/RequiresCrew";
import {RequiresMountingPoings} from "src/universe/entities/capabilities/RequiresMountingPoings";
import {RequiresPower} from "src/universe/entities/capabilities/RequiresPower";
import {ResourceGroup} from "src/universe/static-data/resource-groups";

export enum Mount {
  MOUNT_GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  MOUNT_GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  MOUNT_GAS_SIPHON_III  = "MOUNT_GAS_SIPHON_III",
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
  [Mount.MOUNT_GAS_SIPHON_I]: new ShipMount(Mount.MOUNT_GAS_SIPHON_I, [
    new ExtractsResources([ResourceGroup.GASES], 10),
    new RequiresCrew(0),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_GAS_SIPHON_II]: new ShipMount(Mount.MOUNT_GAS_SIPHON_II, [
    new ExtractsResources([ResourceGroup.GASES], 25),
    new RequiresCrew(2),
    new RequiresPower(2),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_GAS_SIPHON_III]: new ShipMount(Mount.MOUNT_GAS_SIPHON_III, [
    new ExtractsResources([ResourceGroup.GASES], 60),
    new RequiresCrew(4),
    new RequiresPower(4),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SURVEYOR_I]: new ShipMount(Mount.MOUNT_SURVEYOR_I, [
    new SurveysForResources([ResourceGroup.METALS, ResourceGroup.GASES], 1),
    new RequiresCrew(2),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SURVEYOR_II]: new ShipMount(Mount.MOUNT_SURVEYOR_II, [
    new SurveysForResources([ResourceGroup.METALS, ResourceGroup.PRECIOUS_METALS, ResourceGroup.GASES], 2),
    new RequiresCrew(3),
    new RequiresPower(3),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SURVEYOR_III]: new ShipMount(Mount.MOUNT_SURVEYOR_III, [
    new SurveysForResources([ResourceGroup.METALS, ResourceGroup.PRECIOUS_METALS, ResourceGroup.MINERALS, ResourceGroup.GASES], 4),
    new RequiresCrew(4),
    new RequiresPower(4),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SENSOR_ARRAY_I]: new ShipMount(Mount.MOUNT_SENSOR_ARRAY_I, [
    new ProvidesScanPower(1),
    new RequiresCrew(0),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SENSOR_ARRAY_II]: new ShipMount(Mount.MOUNT_SENSOR_ARRAY_II, [
    new ProvidesScanPower(2),
    new RequiresCrew(2),
    new RequiresPower(2),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_SENSOR_ARRAY_III]: new ShipMount(Mount.MOUNT_SENSOR_ARRAY_III, [
    new ProvidesScanPower(4),
    new RequiresCrew(4),
    new RequiresPower(4),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_MINING_LASER_I]: new ShipMount(Mount.MOUNT_MINING_LASER_I, [
    new ExtractsResources([ResourceGroup.METALS], 10),
    new RequiresCrew(0),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_MINING_LASER_II]: new ShipMount(Mount.MOUNT_MINING_LASER_II, [
    new ExtractsResources([ResourceGroup.METALS, ResourceGroup.PRECIOUS_METALS], 25),
    new RequiresCrew(2),
    new RequiresPower(2),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_MINING_LASER_III]: new ShipMount(Mount.MOUNT_MINING_LASER_III, [
    new ExtractsResources([ResourceGroup.METALS, ResourceGroup.PRECIOUS_METALS], 60),
    new RequiresCrew(4),
    new RequiresPower(4),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_LASER_CANNON_I]: new ShipMount(Mount.MOUNT_LASER_CANNON_I, [
    new RequiresCrew(1),
    new RequiresPower(2),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_MISSILE_LAUNCHER_I]: new ShipMount(Mount.MOUNT_MISSILE_LAUNCHER_I, [
    new RequiresCrew(2),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ]),
  [Mount.MOUNT_TURRET_I]: new ShipMount(Mount.MOUNT_TURRET_I, [
    new RequiresCrew(1),
    new RequiresPower(1),
    new RequiresMountingPoings(1)
  ])
}