export interface createUserDetailsI {
    userName: string,
    userEmail: string,
    userOrg: string,
    userIntroduction: string,
    userRole: userRoleListI | string | any,
    userTechExperties: techExpertiesListI[]
}

export interface techExpertiesListI {
    id: string,
    label: string
}

export interface userRoleListI {
    label: string,
    id: string
}

