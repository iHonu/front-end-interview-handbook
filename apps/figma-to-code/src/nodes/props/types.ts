export type GFENodePropertiesList = Array<{
  label: string;
  value: number | string;
}>;

export type GFENodeMetadata = {
  type: 'BLOCK' | 'IMAGE' | 'INLINE' | null;
};

export type GFECSSProperties = Record<string, number | string>;

export type GFETailwindClasses = Set<string>;
