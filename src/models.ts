

export interface IOption {
  id: string;
  label: string;
  input: boolean;
}

export interface IQuestion {
  id: number;
  label: string;
  type: string;
  required: Boolean;
  options: IOption[];
  subQuestions:  any[];
}
