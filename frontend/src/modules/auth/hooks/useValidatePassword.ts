type validatePass = {
    isValid: boolean;
    message: string;
}
function useValidatePassword(password: string): validatePass {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    if(password === "") {
        return {
            isValid: false,
            message: "La contraseña no puede estar vacía"
        }
    }
    if(password.length < 6) {
        return {
            isValid: false,
            message: "La contraseña debe tener al menos 6 caracteres"
        }
    }

    if(!regex.test(password)) {
        return {
            isValid: false,
            message: "La contraseña debe tener al menos un número y un carácter especial"
        }
    }


    return {
        isValid: true,
        message: ""
    }
}

export default useValidatePassword