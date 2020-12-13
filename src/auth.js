export default function isLoggedIn()
{
    if (window.sessionStorage.getItem("token"))
        return true;
    else
        return false;
}