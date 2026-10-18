export type FakerFieldSpec = {
  type: string;
  [option: string]: unknown;
}

export type FakerButtonSpec = string | {
  ref: string;
  display?: string;
  label?: string;
  span?: number;
  rows?: number;
}

export type FakerGroupSpec = FakerButtonSpec | {
  span?: number;
  items: FakerButtonSpec[];
}

export type FakerProfile = {
  title: string;
  fields: Record<string, FakerFieldSpec>;
  buttons: FakerGroupSpec[];
  templates?: Record<string, unknown>;
  historyTitle?: string;
}

export type FakerConfig = {
  emailBase?: string;
  fakeEmailDomains?: string[];
  profiles: Record<string, FakerProfile>;
}

export type FakerRecord = Record<string, unknown>;

export type FakerHistory = {
  items: FakerRecord[];
  index: number;
}
