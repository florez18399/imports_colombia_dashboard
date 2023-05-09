import ImportProcess from "./importProcess";

export default interface PaginationModel {
  count?: number;
  next?: string;
  previous?: string;
  results?: Array<ImportProcess>;
  total_vafodo?: number;
}
