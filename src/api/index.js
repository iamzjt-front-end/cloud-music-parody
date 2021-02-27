/**
 * api接口的统一出口
 */
// 登录模块接口
import login from '@/api/login';
import found from '@/api/found';
// 其他模块的接口……

// 导出接口
export default {
    login,
    found
    // ……
}