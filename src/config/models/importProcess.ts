import AduanaInfo from "./aduanaInfo";
import CountryInfo from "./countryInfo";

export default interface ImportProcess {
  id: number;
  fech: number;
  adua: AduanaInfo;
  paisgen: number;
  paispro: CountryInfo;
  vafodo: string;
}
