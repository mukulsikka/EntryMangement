module.exports.is_blank = (data)=> {
    
    for (var member in data) {
        if(!data[member]) {
            return { 'is_blank':true , 'attribute': member };
        }
    }
    
    return { 'is_blank': false };
};
module.exports.check_length = (length , character) =>{
    for (var member in data) {
        if(character.length()<length) {
            return { 'check_length' : false , 'attribute': member };
        }
    }
    return { 'is_blank': true };
    
};
module.exports.match = (d1,d2) => {
    if(d1==d2){
        return true;
    }
    else{
        return false;
    }
};