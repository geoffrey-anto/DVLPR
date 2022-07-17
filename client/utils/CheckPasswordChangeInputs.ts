export function checkPasswordChangeInputs(email: string, oldPassword: string, newPassword: string){
    if(!email || !oldPassword || !newPassword){
        return false;
    }
    if(email === "" || oldPassword === "" || newPassword === ""){
        return false;
    }
    if(email === " " || oldPassword === " " || newPassword === " "){
        return false;
    }
    if(newPassword.length < 6){
        return false;
    }
    return true;
}