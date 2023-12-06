
const x = 1024;
const convertBytes = (_bytes = 0, _exponent = 1024) => {
    return Math.ceil(_bytes / _exponent);
}

module.exports = {
    // converts utc milliseconds to a datetime string with ms and timezone name as parameters
    convertMsToLocalDateTimeString: (_ms = new Date().getMilliseconds(), _tmz = "Europe/London")=> {
        return new Date(_ms).toLocaleString('en-US', {timeZone: `${_tmz}`}) || _ms
    },

    convertBytesToMaxByte: (_bytes) =>{
        if(_bytes < x) return {value: _bytes, size: 'B'}
        let kb = convertBytes(_bytes, 1024)
        if(kb < x) return {value: kb, size: 'KB'}
        let mb = convertBytes(_bytes, 1024**2)
        if(mb < x) return {value: mb, size: 'MB'}
        let gb = convertBytes(_bytes, 1024**3);
        if(gb < x) return {value: gb, size: 'GB'}
        return {value: convertBytes(_bytes, 1024**4), size: 'TB'}
    }

}