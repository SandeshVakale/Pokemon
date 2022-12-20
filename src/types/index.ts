export interface result {
  name: string;
  url: string;
}

export interface errorType {
  isError: boolean;
  message: string;
  code: string;
}

export type RootStackParamList = {
  List: undefined;
  Details: {pokemon: result; color: string; describe: string};
};
