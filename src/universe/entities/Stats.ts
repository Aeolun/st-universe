import { ResourceGroup } from "src/universe/static-data/resource-groups";

export interface RefineStat {
  groups: ResourceGroup[];
  units: number;
}

export class Stats {
  public crewRequired: number = 0;
  public crewCapacity: number = 0;
  public mountingPoints: number = 0;
  public mountingPointsRequired: number = 0;
  public moduleCapacity: number = 0;
  public moduleCapacityRequired: number = 0;
  public fuelCapacity: number = 0;
  public powerGenerated: number = 0;
  public powerRequired: number = 0;
  public cargoSpace: number = 0;
  public extractionPower: number = 0;
  public warpRange: number = 0;
  public jumpRange: number = 0;
  public shieldCapacity: number = 0;
  public hullCapacity: number = 0;
  public thrust: number = 0;
  public scanPower: number = 0;
  public resourcesExtracted: ResourceGroup[] = [];
  public resourcesSurveyed: ResourceGroup[] = [];
  public resourcesRefined: RefineStat[] = [];
  public surveysGenerated: number = 0;
}
