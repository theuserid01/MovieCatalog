module.exports = {
    optionalPropLength: (minLength, maxLength) => {
        minLength = minLength || 0
        maxLength = maxLength || Infinity
        return {
            validator: (value) => {
                if (value === undefined) {
                    return true
                }

                return value.length >= minLength && value.length <= maxLength
            },
            message: `Field should be between ${minLength} and ${maxLength} symbols long.`
        }
    }
}
