export interface userPresentersI {
    _id : string
    passwordHash? : string 
    email: string,
    role: string,
    org: string,
    name: string,
    introduction: string,
    companiesPositions: string[],
    techExpertise: string[],
    projects: string[],
    metaData : any
}
