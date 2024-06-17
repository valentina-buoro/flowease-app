// function to get the enum values of a field in a model
async function getEnumValues(schema, path) {
    const values = schema.path(path).enumValues
    return values
}

module.exports = {
    getEnumValues
}