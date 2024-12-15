import { techExpertiesListI, userRoleListI } from "./userInterface"

export const userRoleList: userRoleListI[] = [{
    label: 'Student',
    id: 'STUDENT'
},
{
    label: 'Admin',
    id: 'ADMIN'
},
{
    label: 'Sub admin',
    id: 'SUBADMIN'
},
{
    label: 'Professor',
    id: 'PROFESSOR'
}
]

export const techExpertiesList: techExpertiesListI[] = [
    {
        id: 'AI/ML',
        label: 'AI/ML'
    },
    {
        id: 'Big Data',
        label: 'Big Data'
    }
]