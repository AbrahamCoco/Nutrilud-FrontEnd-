export interface ResponseApi {
  success: boolean;
  message: string;
  data: [any] | any | null;
  total?: number;
  invalidParameters?: string[] | null;
  exception?: string | null;
}