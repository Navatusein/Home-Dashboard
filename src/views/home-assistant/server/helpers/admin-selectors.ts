type Entities = Record<string, {
  state: string;
  attributes: Record<string, unknown>;
}>

export const LOW_BATTERY_LEVEL = 20;
export const MEDIUM_BATTERY_LEVEL = 50;

const EXCLUDED_BATTERY_PREFIXES = ["sensor.gx_device_"];
const UPDATE_FEATURE_INSTALL = 1;

function getName(entities: Entities, entityId: string, suffix: RegExp) {
  return String(entities[entityId].attributes.friendly_name ?? entityId).replace(suffix, "");
}

export function selectBatteries(entities: Entities) {
  return Object.keys(entities)
    .filter((entityId) => entityId.startsWith("sensor."))
    .filter((entityId) => entities[entityId].attributes.device_class == "battery")
    .filter((entityId) => !EXCLUDED_BATTERY_PREFIXES.some((prefix) => entityId.startsWith(prefix)))
    .sort((a, b) => (Number(entities[a].state) || Infinity) - (Number(entities[b].state) || Infinity))
    .map((entityId) => `${entityId}\t${getName(entities, entityId, / battery( level)?$/i)}\t${entities[entityId].state}`)
    .join("\n");
}

export function selectUpdates(entities: Entities) {
  return Object.keys(entities)
    .filter((entityId) => entityId.startsWith("update."))
    .filter((entityId) => entities[entityId].state == "on")
    .filter((entityId) => (Number(entities[entityId].attributes.supported_features) & UPDATE_FEATURE_INSTALL) != 0)
    .sort()
    .map((entityId) => [
      entityId,
      getName(entities, entityId, / (software update|update|version)$/i),
      entities[entityId].attributes.installed_version ?? "--",
      entities[entityId].attributes.latest_version ?? "--",
    ].join("\t"))
    .join("\n");
}

export function parseRows(rows: string) {
  return rows ? rows.split("\n").map((row) => row.split("\t")) : [];
}
