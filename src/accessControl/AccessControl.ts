
// Type Role = 'ADMIN' 

export interface AccessControlType {
    PROFESSOR: {
        routes: string[],
        navLinks: [
            {
                navName: string,
                navLink: string
            },
            {
                navName: string
                navLink: string
            },
        ]
    },
}

export const AccessControl = {
    'PROFESSOR': {
        routes: ['/add-event', '/edit-profile', '/change-password'],
        navLinks: [
            {
                navName: 'Add Event',
                navLink: '/add-event'
            },
            {
                navName: 'Edit Profile',
                navLink: '/edit-profile'
            },
            {
                navName: 'Change Password',
                navLink: '/change-password'
            }
        ]
    },
    'ADMIN': {
        routes: ['/add-new-presenter', '/presenters-table', '/upcoming-events', '/change-password', '/add-sub-admin', '/sub-admin-table'],
        navLinks: [
            {
                navName: 'Add Presenter',
                navLink: '/add-new-presenter'
            },
            {
                navName: 'Presenter List',
                navLink: '/presenters-table'
            },
            {
                navName: 'Add Sub Admin',
                navLink: '/add-sub-admin'
            },
            {
                navName: 'Sub Admin List',
                navLink: '/sub-admin-table'
            },
            {
                navName: 'Upcoming Events',
                navLink: '/upcoming-events'
            },
            {
                navName: 'Change Password',
                navLink: '/change-password'
            }
        ]
    },
    'STUDENT': {
        routes: ['/change-password'],
        navLinks: [
            {
                navName: 'Change Password',
                navLink: '/change-password'
            }
        ]
    },
    'SUBADMIN': {
        routes: ['/add-student', '/change-password'],
        navLinks: [
            {
                navName: 'Add Student',
                navLink: '/add-student'
            },
            {
                navName: 'Change Password',
                navLink: '/change-password'
            }
        ]
    }
}