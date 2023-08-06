const isStaff = () => {
    const user = localStorage.getItem('user')
    if (user) {
        return !!user && JSON.parse(user).role.includes('company_staff');
    } else {
        return false
    }
}

const isAdmin = () => {
    const user = localStorage.getItem('user')
    if (user) {
        return !!user && JSON.parse(user).role.includes('admin');
    } else {
        return false
    }
}

export {isAdmin, isStaff};