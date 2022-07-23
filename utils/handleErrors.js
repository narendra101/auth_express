export default (error) => {
    try {
        let TraceBack = {ErrorType: error.name}
        let errors = {}
        let errorFields = Object.keys(error.errors)
        for(let field in errorFields){        
            if(error.errors[errorFields[field]].properties.type === 'unique')
            errors[errorFields[field]] = `${errorFields[field]} is already taken`
            else errors[errorFields[field]] = error.errors[errorFields[field]].properties.type
        }
        TraceBack.errors = errors
        return TraceBack        
    } catch (error) {
        return {
            error: 'Unknown Error '
        }
    }
    
    
}