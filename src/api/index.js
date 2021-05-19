/**
 * api接口的统一出口
 */
// 登录模块接口
import login from '@/api/login';
import found from '@/api/found';
import player from '@/api/player';
import mine from '@/api/mine';
import cloudVillage from '@/api/cloudVillage';
// 其他模块的接口……

// 导出接口
export default {
    login,
    found,
    player,
    mine,
    cloudVillage
    // ……
}