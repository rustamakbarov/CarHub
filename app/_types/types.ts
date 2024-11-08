export interface CustomFilterTitle {
  title: string;
}

export interface Searchcar {
  inputCar: string;
  getCar(car: string): void;
}

export interface Params {
  searchParams: {
    model?: string;
    make?: string;
    year?: number;
    fuel_type?: string;
  };
}

export interface Filter {
  filter?: string | FilterOptions;
}

export interface FilterOptions {
  model?: string;
  car?: string;
  fuel?: string;
  year?: string | number;
  limit?: string;
}

export interface Car {
  model: string;
  make: string;
}

export interface CarCard {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: 4;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface OptionFilter {
  title: string;
  options: (string | number)[];
}

export interface Error {
  error: string;
}
