import ImportProcess from "./importProcess";

export default interface InfoPaginator {
  count: number;
  next: string;
  previous: string;
  results: Array<ImportProcess>;
  total_vafodo: number;
}
