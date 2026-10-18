import {faker} from "@faker-js/faker";
import {FakerConfig, FakerFieldSpec, FakerProfile, FakerRecord} from "../types/types";
import formatDate, {toIsoDate} from "./format-date";

type Generator = {
  generate: (spec: FakerFieldSpec, record: FakerRecord, profile: FakerProfile, config: FakerConfig) => unknown;
  format?: (value: unknown, variant: string | undefined, spec: FakerFieldSpec, config: FakerConfig) => unknown;
}

type EmailValue = {
  local: string;
  domain: string;
}

type ObjectNode = Record<string, unknown>;

const PLACEHOLDER = /@([A-Za-z_]\w*)(?::([^@]*))?@/g;
const WHOLE_PLACEHOLDER = /^@([A-Za-z_]\w*)(?::([^@]*))?@$/;

const GENERATORS: Record<string, Generator> = {
  gender: {
    generate: () => faker.person.sexType(),
    format: (value, variant, spec) => variant == "raw" ? value : (spec[value as string] ?? value),
  },
  firstName: {
    generate: (spec, record) => faker.person.firstName(
      spec.gender ? record[spec.gender as string] as "male" | "female" : undefined
    ),
  },
  lastName: {
    generate: () => faker.person.lastName(),
  },
  email: {
    generate: (spec, record, profile, config) => {
      const {firstName = "firstName", lastName = "lastName", suffix = false} = spec as {
        firstName?: string,
        lastName?: string,
        suffix?: boolean,
      };

      const local = `${toLocalPart(record[firstName])}.${toLocalPart(record[lastName])}`;

      return {
        local: suffix ? `${local}.${faker.number.int({min: 1000, max: 9999})}` : local,
        domain: faker.helpers.arrayElement(config.fakeEmailDomains ?? ["example.com"]),
      } satisfies EmailValue;
    },
    format: (value, variant, spec, config) => {
      const {local, domain} = value as EmailValue;

      if (variant == "tag")
        return `+${local}`;

      if (variant == "fake" || !config.emailBase)
        return `${local}@${domain}`;

      const [baseLocal, baseDomain] = config.emailBase.split("@");
      return `${baseLocal}+${local}@${baseDomain}`;
    },
  },
  date: {
    generate: (spec, record) => {
      const {minAge, maxAge, from, to, after, minDays = 0, maxDays = 30} = spec as {
        minAge?: number,
        maxAge?: number,
        from?: string,
        to?: string,
        after?: string,
        minDays?: number,
        maxDays?: number,
      };

      if (minAge != undefined || maxAge != undefined)
        return toIsoDate(faker.date.birthdate({mode: "age", min: minAge ?? 18, max: maxAge ?? 60}));

      if (after != undefined) {
        const date = new Date(`${record[after]}T00:00:00`);
        date.setDate(date.getDate() + faker.number.int({min: minDays, max: maxDays}));
        return toIsoDate(date);
      }

      return toIsoDate(faker.date.between({from: from ?? new Date(), to: to ?? faker.date.future()}));
    },
    format: (value, variant) => formatDate(value as string, variant ?? "YYYY-MM-DD"),
  },
  code: {
    generate: spec => faker.helpers.replaceSymbols((spec.pattern as string | undefined) ?? "???##"),
  },
  number: {
    generate: spec => faker.number.int({min: spec.min as number | undefined, max: spec.max as number | undefined}),
  },
  uuid: {
    generate: () => faker.string.uuid(),
  },
  pick: {
    generate: spec => faker.helpers.arrayElement(spec.values as unknown[]),
  },
  template: {
    generate: (spec, record, profile, config) => interpolate(spec.value as string, record, profile, config),
  },
  faker: {
    generate: spec => {
      const path = (spec.method as string).split(".");
      const args = (spec.args as unknown[] | undefined) ?? [];

      const owner = path.slice(0, -1).reduce<ObjectNode>(
        (node, key) => node[key] as ObjectNode,
        faker as unknown as ObjectNode
      );

      return (owner[path[path.length - 1]] as (...args: unknown[]) => unknown).apply(owner, args);
    },
  },
};

function toLocalPart(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/-/g, ".")
    .replace(/[^a-z0-9.]/g, "");
}

function formatDefault(value: unknown, variant: string | undefined) {
  if (variant == undefined)
    return value;

  if (typeof value == "object" && value != null)
    return variant.split(".").reduce<unknown>((node, key) => (node as ObjectNode | undefined)?.[key], value);

  if (variant == "upper")
    return String(value).toUpperCase();

  if (variant == "lower")
    return String(value).toLowerCase();

  return value;
}

function resolve(key: string, variant: string | undefined, record: FakerRecord, profile: FakerProfile, config: FakerConfig) {
  const spec = profile.fields[key];
  const value = record[key];

  if (spec == undefined || value == undefined)
    return undefined;

  const format = GENERATORS[spec.type]?.format;
  return format ? format(value, variant, spec, config) : formatDefault(value, variant);
}

function interpolate(text: string, record: FakerRecord, profile: FakerProfile, config: FakerConfig): unknown {
  const whole = text.match(WHOLE_PLACEHOLDER);

  if (whole)
    return resolve(whole[1], whole[2], record, profile, config) ?? text;

  return text.replace(PLACEHOLDER, (match, key: string, variant?: string) => {
    const value = resolve(key, variant, record, profile, config);
    return value == undefined ? match : stringify(value);
  });
}

function fill(node: unknown, record: FakerRecord, profile: FakerProfile, config: FakerConfig): unknown {
  if (typeof node == "string")
    return interpolate(node, record, profile, config);

  if (Array.isArray(node))
    return node.map(item => fill(item, record, profile, config));

  if (typeof node == "object" && node != null)
    return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, fill(value, record, profile, config)]));

  return node;
}

export function stringify(value: unknown) {
  return typeof value == "string" ? value : JSON.stringify(value);
}

export function generateRecord(profile: FakerProfile, config: FakerConfig) {
  return Object.entries(profile.fields).reduce<FakerRecord>(
    (record, [key, spec]) => ({...record, [key]: GENERATORS[spec.type]?.generate(spec, record, profile, config)}),
    {}
  );
}

export function resolveRef(ref: string, record: FakerRecord, profile: FakerProfile, config: FakerConfig) {
  const [key, ...variant] = ref.split(":");
  return resolve(key, variant.length ? variant.join(":") : undefined, record, profile, config);
}

export function renderText(text: string, record: FakerRecord, profile: FakerProfile, config: FakerConfig) {
  return stringify(interpolate(text, record, profile, config));
}

export function renderTemplate(template: unknown, record: FakerRecord, profile: FakerProfile, config: FakerConfig) {
  return JSON.stringify(fill(template, record, profile, config), null, 2);
}
