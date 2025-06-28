let behavior = require('../../../../../comm/behavior/news_index_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');


Page({
	behaviors: [behavior],

	onLoad: function (options) {
		ProjectBiz.initPage(this, { isLoadSkin: true }); 
		this._setCate(projectSetting.NEWS_CATE, options, 3);

	},
})