export interface createPresenterDetailsI {
    presenterName: string,
    presenterEmail: string,
    presenterContactNo: string,
    presenterOrg: string,
    presenterIntroduction: string,
    presenterIndustry?: string,
    presenterSegment?: string,
    presenterRole?: userRoleListI | string | any,
    presenterTechExperties: []
}

// export interface techExpertiesListI {
//     id: string,
//     label: string
// }

export interface userRoleListI {
    label: string,
    id: string
}

