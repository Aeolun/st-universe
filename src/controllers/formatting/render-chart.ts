import { Chart } from "src/controllers/schemas";
import { WaypointChart } from "src/universe/entities/Waypoint";

export function renderChart(chart?: WaypointChart): Chart {
  return chart
    ? {
        waypointSymbol: chart.waypointSymbol,
        submittedBy: chart.submittedBy,
        submittedOn: chart.submittedOn.toISOString(),
      }
    : {};
}
