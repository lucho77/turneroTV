import { FinderGenericDTO } from "./finderGenericDTO";

export interface FinderParamsDTO {
username: string;
dataSource: string;
idUsuarioUra: number;
webServicesAddress: string;
modelPackage: string;
entityClass: string;
viewName: string;
nameParam: string;
firstRow: number;
maxRows: number;
globalParam: string;
vista: string;
entity: string;
finderGenericDTO: FinderGenericDTO;
typeMethodFinder: boolean;
methodName: string;

}
