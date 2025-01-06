export interface createPresenterDetailsI {
    presenterName: string,
    presenterEmail: string,
    presenterOrg: string,
    presenterIntroduction: string,
    presenterRole: userRoleListI | string | any,
    presenterTechExperties: techExpertiesListI[]
}

export interface techExpertiesListI {
    id: string,
    label: string
}

export interface userRoleListI {
    label: string,
    id: string
}

