/**
 * Notes: 项目通用业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-05-22 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js'); 
const projectSetting = require('../public/project_setting.js');
const PubilcBiz = require('../../../comm/biz/public_biz.js');

class ProjectBiz extends BaseBiz {

	/**
	 * 页面初始化    
	 * @param {*} that  
	 */
	static initPage(that, { isLoadSkin = false } = {}) { 
		let skin = {};
		skin.NAV_BG = projectSetting.NAV_BG;
		skin.NAV_COLOR = projectSetting.NAV_COLOR;
		PubilcBiz.initPageBase(that, { skin, isLoadSkin });
	}

}

module.exports = ProjectBiz;