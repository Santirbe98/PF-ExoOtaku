export function validate(input){
    let errors = {}
    if(!input.name || input.name.length === 0){
        errors.name = 'Name is required'
    }
    else if( (input.name.length > 0 ) && ((/[0-9]/.test(input.name)) || !/[a-zA-Z ]/.test(input.name)) ){
        errors.name = 'A string is required'
    }

    if(!input.descriptions || input.descriptions.length === 0){
        errors.descriptions = 'Descriptions are required'
    }

    if(!/[0-9]/.test(input.price) || /[a-zA-Z ]/.test(input.price) || input.price < 0){
        errors.price = 'A non-negative number is required'
    }

    else if(input.price.length === 0){
        errors.price = 'An entry is required'
    } 
    
    if(!/[0-9]/.test(input.stock) || /[a-zA-Z ]/.test(input.stock) || input.stock < 0){
        errors.stock = 'A non-negative number is required'
    }

   

    if(input.size.length === 0){
        errors.size = 'Please choose at least one option'
    }
    
    if(!input.category || input.category.length === 0){
        errors.category = 'Category is required'
    }
    
    if(input.images.length === 0 ){
        errors.images = 'Image is required'
    }


    


    return errors 
}