export type RelationsType<Enum> = {
  [key in keyof Enum]?: boolean | false;
};
