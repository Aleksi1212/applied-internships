import validator from "validator";

const whitelist = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
]

function validateInput(input1, input2) {
    try {
        const validate_Input1 = validator.isWhitelisted(input1, whitelist)
        const validate_Input2 = validator.isWhitelisted(input2, whitelist)

        return { valid1: validate_Input1, valid2: validate_Input2 }

    } catch(err) {
        return { valid1: false, valid2: false }
    }
}

export default validateInput