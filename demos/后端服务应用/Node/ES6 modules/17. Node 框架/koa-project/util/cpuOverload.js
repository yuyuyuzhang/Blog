import process from 'process';
import child_process from 'child_process';
import util from 'util';
import os from 'os';

const platform = process.platform;
const exec = util.promisify(child_process.exec);

let overloadTimes = 0;
let isOverload = false;
let currentCpuPercentage = 0;
let currentProbability = 0;

let removeCount = 0;

const maxValue = (10 * Math.exp(10)).toFixed(4);
const maxUser = 5000;
const canAccessList = [];

class CpuOverload {
    /**
     * @description
     * @param {int} maxOverloadNum 
     * @param {int} maxCpuPercentage 
     * @param {float} baseProbability 
     */
    constructor(maxOverloadNum =30, maxCpuPercentage=90, baseProbability=0.9, whiteList=[]) {
        this.maxOverloadNum = maxOverloadNum;
        this.maxCpuPercentage = maxCpuPercentage;
        this.baseProbability = baseProbability;
        this.whiteList = whiteList;
    }

    /**
     * @description 定时校验服务器是否过载
     */
    async check() {
         // 定时处理逻辑
         setInterval(async () => {
            try {
                // 获取当前进程绑定 CPU 利用率
                const cpuInfo = await this._getProcessInfo();
                if(!cpuInfo) {
                    return;
                }
                currentCpuPercentage = cpuInfo;

                if(cpuInfo > this.maxCpuPercentage) { // 当 cpu 持续过载时，将当前的 overloadTimes 计数 +1
                    overloadTimes++;
                } else { // 当 cpu 低于设定值时，认为服务负载恢复，将 overloadTimes 设置为 0
                    overloadTimes = 0;
                    return isOverload = false;
                }

                // 当持续出现 cpu 过载并且达到了我们设置上限时，需要进行请求丢弃
                if(overloadTimes > this.maxOverloadNum){ 
                    isOverload = true;
                }

                // 设置丢弃概率
                this._setProbability();
            } catch(err){
                console.log(err);
                return;
            }
        }, 2000);
    }

    /**
     * @description 获取当前进程绑定 CPU 的利用率
     */
     async _getProcessInfo() {
        // 获取当前进程信息
        let pidInfo
        if (platform === 'win32') {  
            pidInfo = await this._getWmic() // windows
        } else { 
            pidInfo = await this._getPs() // linux & mac
        }

        // 获取当前进程绑定 CPU 的信息
        const cpuInfo = await this._parseInOs(pidInfo); 
        if(!cpuInfo || cpuInfo == '') { 
            return false
        }

        // 字段解析处理，获取当前进程绑定 CPU 的利用率
        return parseFloat(cpuInfo).toFixed(4)
    }

    /**
     * @description Linux & Mac 系统使用 ps 命令获取当前进程信息
     */
    async _getPs() {
        const cmd = `ps -p ${process.pid} -o pcpu`;
        const { stdout, stderr } = await exec(cmd);
        if(stderr) { 
            console.log(stderr);
            return false;
        }
        return stdout;
    }

    /**
     * @description Windows 系统使用 wmix 命令获取当前进程信息
     */
    async _getWmic() {
        const cols = 'IDProcess,Name,PercentProcessorTime,PrivateBytes,VirtualBytes';
        const cmd  = 'wmic path Win32_PerfFormattedData_PerfProc_Process get ' + cols + ' /format:csv';
        const { stdout, stderr } = await exec(cmd);
        if(stderr) {
            console.log(stderr);
            return false;
        }
        return stdout;
    }

    /**
     * @description 获取指定进程绑定 CPU 的信息
     */
    async _parseInOs(pidInfo) {
        let lines = String(pidInfo).trim().split(os.EOL);
        if(!lines || lines.length < 2){
            return false;
        }
        let cpuStr = lines[1];
        return cpuStr.trim();
    }

    async _parseInWin() {}

    /**
     * @description 设置丢弃概率
     */
     _setProbability() {
        let o = overloadTimes >= 100 ? 100 : overloadTimes;
        let c = currentCpuPercentage >= 100 ? 10 : currentCpuPercentage/10;
        currentProbability = ((0.1 * o) * Math.exp(c) / maxValue * this.baseProbability).toFixed(4);
    }

    /**
     * @description 判断服务器当前是否可用
     * @param {string} path 请求路径
     * @param {string} uuid 通用唯一识别码
     */
     isAvailable(path, uuid=false) {
        // 判断是否在白名单内 
        if(path && this.whiteList.includes(path)) { // 判断是否在白名单内
            return true;
        }

        // 判断是否已经放行过
        if(uuid && canAccessList.includes(uuid)){ // 判断是否已经放行过
            return true;
        }

        // 判断是否过载
        if(isOverload) {
            if(currentProbability >= Math.random().toFixed(4)) {
                removeCount++;
                return false;
            }
        }

        // 需要将 uuid 加入到放行数组
        if(uuid) { 
            if(canAccessList.length > maxUser){
                canAccessList.shift()
            }
            canAccessList.push(uuid);
        }
        return true;
    }
}

export default CpuOverload;