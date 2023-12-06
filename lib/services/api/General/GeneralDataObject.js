const si = require("systeminformation");
const {mathUtil} = require("../Utility/index");

class GeneralDataObject{
    constructor() {
        this.valueObject = {
            time: 'current,uptime,timezoneName',
            cpu: '*',
            mem: '*',
            osInfo: 'platform,distro,codename,release',
            system: 'model,manufacturer,version,serial',
            bios: 'vendor,version,releaseDate',
            baseboard: 'manufacturer,model',
            chassis: 'type',
            battery: '*',
            diskLayout: 'device,type,name,vendor,size,serialNum,interfaceType,temperature',
            blockDevices: 'name,type,size,mount,physical,model,serial,removable,device,fsType',
            versions: '*',
            networkInterfaces: 'iface,ip4,ip6,mac,operstate,type,mtu,default'
        }
    }

    async build(){
        let data = await si.get(this.valueObject)
        // turn uptime into duration
        data.time.uptime = data.time.uptime? Math.floor(data.time.uptime/60): 0
        // turn current time to datetime format
        data.time.current = mathUtil.convertMsToLocalDateTimeString(data.time.current, data.time.timezoneName)
        // turn memory into readable mem besides bytes
        data.memory = {
            total: mathUtil.convertBytesToMaxByte(data.mem.total),
            free: mathUtil.convertBytesToMaxByte(data.mem.free),
            used: mathUtil.convertBytesToMaxByte(data.mem.used),
            active: mathUtil.convertBytesToMaxByte(data.mem.active),
            available: mathUtil.convertBytesToMaxByte(data.mem.available),
            buffers: mathUtil.convertBytesToMaxByte(data.mem.buffers),
            cached: mathUtil.convertBytesToMaxByte(data.mem.cached),
            slab: mathUtil.convertBytesToMaxByte(data.mem.slab),
            buffcache: mathUtil.convertBytesToMaxByte(data.mem.buffcache),
            swaptotal: mathUtil.convertBytesToMaxByte(data.mem.swaptotal),
            swapused: mathUtil.convertBytesToMaxByte(data.mem.swapused),
            swapfree: mathUtil.convertBytesToMaxByte(data.mem.swapfree),
        }
        data.cpuCache = {}
        Object.keys(data.cpu.cache).forEach((key)=>{
            data.cpuCache[key] = mathUtil.convertBytesToMaxByte(data.cpu.cache[key])
        })
        let blockDevices = [];
        data.blockDevices.forEach((device)=> {
           let size = mathUtil.convertBytesToMaxByte(parseInt(device.size));
           device.size = `${size.value} ${size.size}`
           blockDevices.push(device)
        });
        data.blockDevices = blockDevices;
        let diskLayouts = [];
        data.diskLayout.forEach((layout)=>{
            let size = mathUtil.convertBytesToMaxByte(parseInt(layout.size))
            layout.size = `${size.value} ${size.size}`
            diskLayouts.push(layout)
        });

        data.diskLayout = diskLayouts;
        // TODO: CONVERT DISK AND FS SIZES TO APPROPRIATE READABLE SIZES FOR UX
        
        return data
    }

}

module.exports = GeneralDataObject