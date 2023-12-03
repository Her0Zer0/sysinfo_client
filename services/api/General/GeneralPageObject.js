const {textUtil} = require("../Utility/index");
class GeneralPageObject{
    constructor(dataObject) {
        this.basic= {
            time: `${dataObject.time.current || ''}`,
                upTime: `${dataObject.time.uptime || ''}`,
                os: `${dataObject.osInfo.codename || ''} ${dataObject.osInfo.distro || ''} ${dataObject.osInfo.release || ''}`,
                platform: `${textUtil.capitalize(dataObject.osInfo.platform) || ''}`,
                system: `${dataObject.system.manufacturer || ''} ${dataObject.system.model || ''} ${dataObject.system.version}`
        }
        this.hardware= {
            cpu: {
                section: 'CPU',
                model:{
                    manufacturer: dataObject.cpu.manufacturer,
                    brand: dataObject.cpu.brand,
                    vendor: dataObject.cpu.vendor,
                    family: dataObject.cpu.family,
                    model: dataObject.cpu.model,
                    socket: dataObject.cpu.socket,
                    flags: dataObject.cpu.flags
                },
                core: {
                    logical: dataObject.cpu.cores,
                    physical: dataObject.cpu.physicalCores,
                    performanceCores: dataObject.cpu.performanceCores,
                    efficiencyCores: dataObject.cpu.efficiencyCores
                },
                speed: {
                    current: dataObject.cpu.speed,
                    max:  dataObject.cpu.speedMax,
                    min: dataObject.cpu.speedMin,
                    governor: dataObject.cpu.governor
                },
                cache: dataObject.cpuCache,
                virtualization: dataObject.cpu.virtualization
            },
            memory:{
                section: 'Memory',
                mem:{
                    total: `${dataObject.memory.total.value} ${dataObject.memory.total.size}`,
                    free:`${dataObject.memory.free.value} ${dataObject.memory.free.size}`,
                    used:`${dataObject.memory.used.value} ${dataObject.memory.used.size}`,
                    active:`${dataObject.memory.active.value} ${dataObject.memory.active.size}`,
                    available:`${dataObject.memory.available.value} ${dataObject.memory.available.size}`,
                    buffers:`${dataObject.memory.buffers.value} ${dataObject.memory.buffers.size}`,
                    cached:`${dataObject.memory.cached.value} ${dataObject.memory.cached.size}`,
                    slab:`${dataObject.memory.slab.value} ${dataObject.memory.slab.size}`
                }
            },
            mobo:{
                section: 'Motherboard',
                stats: {
                    bios: `${dataObject.bios.vendor || ''} ${dataObject.bios.version || ''} ${dataObject.bios.releaseDate || ''}`,
                    baseboard: `${dataObject.baseboard.manufacturer || ''} ${dataObject.baseboard.model || ''}`,
                    chassis: `${dataObject.chassis.type || ''}`
                }
            },
            battery: {
                section: 'Battery',
                hasBattery: dataObject.battery.hasBattery || false,
                stats: {
                    type: `${dataObject.battery.manufacturer || ''} ${dataObject.battery.type || ''}`,
                    serial: dataObject.battery.serial || '',
                    model: dataObject.battery.model || '',
                    capacity: `${dataObject.battery.designedCapacity} ${dataObject.battery.capacityUnit}`,
                    voltage: dataObject.battery.voltage
                }
            },
            network: {
                section: 'Network',
                nic: dataObject.networkInterfaces.filter(x => x.default === true)
            }
        }

        this.disk={
            layout: {
                section: 'Disk Layout',
                stats: dataObject.diskLayout
            },
            block: {
                section: 'Block Devices',
                stats: dataObject.blockDevices
            },
            fsSystem: {
                section: 'File System',
                stats: dataObject.fsSize
            }
        }

        this.software = {
            section: 'Software',
            versions: dataObject.versions
        }
    }
}

module.exports = GeneralPageObject