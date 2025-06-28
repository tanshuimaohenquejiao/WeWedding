/**
 * Notes: 套系模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-11-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
const projectSetting = require('../public/project_setting.js');

class ProductBiz extends BaseBiz {

	static getCateName(cateId) {
		let cateList = projectSetting.PRODUCT_CATE;

		for (let k in cateList) {
			if (cateList[k].id == cateId) {
				return cateList[k].title;
			}
		}
		return '';
	}

	static getCateList() {

		let cateList = projectSetting.PRODUCT_CATE;

		let arr = [];
		for (let k in cateList) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',
				val: cateList[k].id, //for options form
				value: cateList[k].id, //for list menu
			})
		}

		return arr;
	}

	static setCateTitle() {

		let curPage = pageHelper.getPrevPage(1);
		if (!curPage) return;

		let cateId = null;
		if (curPage.options && curPage.options.id) {
			cateId = curPage.options.id;
		}
		let cateList = projectSetting.PRODUCT_CATE;
		for (let k in cateList) {
			if (cateList[k].id == cateId) {
				wx.setNavigationBarTitle({
					title: cateList[k].title
				});
				return;
			}
		}

	}

	/** 搜索菜单设置 */
	static async getSearchMenu() {
		let sortMenus = [{
			label: '全部',
			type: '',
			value: ''
		}];
		let sortMenusAfter = [{
			label: '最新',
			type: 'sort',
			value: 'new'
		},];
		let sortItems = [];

		sortMenus = sortMenus.concat(sortMenusAfter);

		return {
			sortItems,
			sortMenus
		}
	}
}

module.exports = ProductBiz;