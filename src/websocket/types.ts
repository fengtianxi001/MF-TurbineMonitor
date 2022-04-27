export interface sendMessagePropsType {
  id: number;
  type: string;
  data?: any;
}

export interface mapValue {
  [key: number]: (data: any) => void;
}
