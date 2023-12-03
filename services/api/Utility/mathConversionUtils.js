
const convertBytesToKB = (_bytes = 0) => {
    if(_bytes > 1028) return Math.ceil(_bytes / 1028)
    return _bytes
}
const convertKBToMB = (_kb = 0) => {
    if(_kb > 1028) return Math.ceil(_kb / 1000)
    return _kb
}

const convertMBToGB = (_mb = 0) => {
    if(_mb > 1028) return Math.ceil(_mb / 1028)
    return _mb
}

module.exports = {
    // converts utc milliseconds to a datetime string with ms and timezone name as parameters
    convertMsToLocalDateTimeString: (_ms = new Date().getMilliseconds(), _tmz = "Europe/London")=> {
        return new Date(_ms).toLocaleString('en-US', {timeZone: `${_tmz}`}) || _ms
    },

    convertBytesToMaxByte: (_bytes) =>{
        if(_bytes < 1028) return {value: _bytes, size: 'B'}
        let kb = convertBytesToKB(_bytes)
        if(kb < 1028) return {value: kb, size: 'KB'}
        let mb = convertKBToMB(kb)
        if(mb > 1028) return {value: convertMBToGB(mb), size: 'GB'}
        return {value: mb, size: 'MB'}
    }

}