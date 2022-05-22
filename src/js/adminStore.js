let isAdmin = null
export const getAdmin = async () => {
    if(isAdmin === null) {
        await fetch("/api/auth").then(resp => {
            if(resp.ok) {
                isAdmin = true
            } else {
                isAdmin = false
            }
        })
    }
    return isAdmin
}
