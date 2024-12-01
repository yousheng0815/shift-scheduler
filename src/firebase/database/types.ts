export type Staff = {
  id: string;
  name: string;
  regular_shifts: { unit: string; day: number; shift: number }[];
};

export type Shift = {
  id: string;
  day: string;
  unitId: string;
  shift: number;
  staffId: string | null;
};
