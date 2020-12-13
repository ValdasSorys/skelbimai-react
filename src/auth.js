export let loginContext = {user: "", id: 0};
export function isLoggedIn()
{
    if (window.sessionStorage.getItem("token"))
    {
        loginContext = {user: window.sessionStorage.getItem("username"), id: window.sessionStorage.getItem("id")};
        return true;
    }
    else
    {
        return false;
    }
}
export function login(username, id)
{
    window.sessionStorage.setItem("token", "1");
    window.sessionStorage.setItem("username", username);
    window.sessionStorage.setItem("id", id);
    loginContext = {user: username, id: id};
}

export function logout()
{
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("id");
    loginContext = {user: "", id: 0};
}
