/**
 * Notes: 通用业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-05-22 07:48:00 
 */

const BaseBiz = require('./base_biz.js');
const setting = require('../../setting/setting.js');
const cacheHelper = require('../../helper/cache_helper.js');
const dataHelper = require('../../helper/data_helper.js');
const cloudHelper = require('../../helper/cloud_helper.js');
const pageHelper = require('../../helper/page_helper.js');
const helper = require('../../helper/helper.js');

class PublicBiz extends BaseBiz {
	/**
	 * 页面初始化   
	 * @param {*} skin   
	 * @param {*} that  
	 */
	static initPageBase(that, { skin, isLoadSkin = false }) {
		if (skin) {
			skin.IS_SUB = setting.IS_SUB;

			if ((setting.IS_SUB)) {

				wx.hideHomeButton();

				// 顶部
				wx.setNavigationBarColor({
					backgroundColor: skin.NAV_BG,
					frontColor: skin.NAV_COLOR,
				});
			}

			if (isLoadSkin) {
				that.setData({
					skin
				})
			}
		}

	}

	// 从富文本提取简介
	static getRichEditorDesc(desc, content) {
		if (desc) return dataHelper.fmtText(desc, 100);
		if (!Array.isArray(content)) return desc;

		for (let k in content) {
			if (content[k].type == 'text') return dataHelper.fmtText(content[k].val, 100);
		}
		return desc;
	}

	static isCacheList(key) {
		key = key.toUpperCase();
		if (setting.CACHE_IS_LIST)
			return cacheHelper.get(key + '_LIST');
		else
			return false;
	}

	static removeCacheList(key) {
		key = key.toUpperCase();
		if (setting.CACHE_IS_LIST)
			cacheHelper.remove(key + '_LIST');
	}

	static setCacheList(key, time = setting.CACHE_LIST_TIME) {
		key = key.toUpperCase();
		if (setting.CACHE_IS_LIST)
			cacheHelper.set(key + '_LIST', 'TRUE', time);
	}

	static async  getUserProfileDemo(that) {
		wx.getUserProfile({
			desc: '用于更好的使用本系统',
			success: async (res) => {
				let userInfo = res.userInfo;
				if (!helper.isDefined(userInfo) || !userInfo)
					wx.showToast({
						title: '授权失败，请重新授权',
						icon: 'none',
						duration: 4000
					});
				else {
					let opts = {
						title: '授权中'
					}
					await cloudHelper.callCloudSumbit('test/profile', {
						info: userInfo
					}, opts).then(res => {
						// 存储 用户信息
						cacheHelper.set('profile', userInfo, 86400);
						that.setData({
							isProfile: true
						});
					})

				};
			},
			fail: (err) => {
				wx.showToast({
					title: '授权失败，请重新授权',
					icon: 'none'
				});
			}
		})
	} 

	static async noticeDemo() {
		let info = cacheHelper.get('profile');
		if (!info) info = {};
		let callback = async () => {
			await cloudHelper.callCloudSumbit('test/notice', {
				info
			}, {
				title: '订阅中'
			}).then(res => {
				pageHelper.showSuccToast('订阅成功');
			})
		}
		// 消息订阅
		wx.requestSubscribeMessage({
			tmplIds: ['l8KvyU3BpitqUDb6hCqj-ix37kgGDAExqxQffaiWKoQ'],
			async complete() {
				callback && await callback();
			}
		});
	}

}

module.exports = PublicBiz;