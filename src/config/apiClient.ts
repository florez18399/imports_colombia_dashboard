import AduanaInfo from "./models/aduanaInfo";
import CountByCity from "./models/countByCity";
import CountByCountry from "./models/countByCountry";
import CountryInfo from "./models/countryInfo";
import PaginationModel from "./models/paginationModel";

const url: string = "http://localhost:8000";

export function getImportProcessList(
  params: any,
  urlFromBack?: string
): Promise<PaginationModel> {
  let urlParams;
  urlParams = new URLSearchParams();

  if (params.adua) {
    urlParams.append("adua", params.adua);
  }

  if (params.paispro && params.paispro !== "") {
    urlParams.append("paispro", params.paispro);
  }

  if (params.vafodo_min && params.vafodo_min !== "") {
    urlParams.append("vafodo_min", params.vafodo_min.toString());
  }

  if (params.vafodo_max && params.vafodo_max !== "") {
    urlParams.append("vafodo_max", params.vafodo_max.toString());
  }

  const urlWithParams = url + "/imports/?" + urlParams?.toString();

  return fetch(urlFromBack ? urlFromBack : urlWithParams).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getCountriesList(): Promise<Array<CountryInfo>> {
  return fetch(url + "/countries/").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getAduanasList(): Promise<Array<AduanaInfo>> {
  return fetch(url + "/aduanas/").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getCountByCountry(): Promise<Array<CountByCountry>> {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "/by_pro_country/", requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getCountByCity(): Promise<Array<CountByCity>> {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "/by_pro_city/", requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
