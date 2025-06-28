/**
 * Notes: 后台管理模块 基类
 * Date: 2025-03-15 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseAdminService = require('../../../../framework/platform/service/base_admin_service.js');
;
const util = require('../../../../framework/utils/util.js');

class BaseProjectAdminService extends BaseAdminService {

	getProjectId() {
		return util.getProjectId();
	}
}

module.exports = BaseProjectAdminService;