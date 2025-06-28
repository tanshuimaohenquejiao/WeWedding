/**
 * Notes: 预约模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-10 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
const dataHelper = require('../../../helper/data_helper.js');
const projectSetting = require('../public/project_setting.js');

class MeetBiz extends BaseBiz {

	static async subscribeMessageMeet(callback) {
		callback && await callback();
	}

	static setTypeTitle(that, typeId = null) { 
	 
		let typeList =   projectSetting.MEET_TYPE ;
		for (let k in typeList) {
			if (typeList[k].id == typeId) {
				wx.setNavigationBarTitle({
					title: typeList[k].title
				});

				if (typeList[k].style) { //样式
					that.setData({
						listMode: typeList[k].style
					});
				} else {
					that.setData({
						listMode: 'leftpic'
					});
				}
			}
		}
		return '';

	}

	static addMeetPhoneCalendar(title, startTime, endTime, alarmOffset = 3600) {
		wx.addPhoneCalendar({
			title,
			startTime,
			endTime,
			//	description: "这是日程内容", 
			alarm: 'true',
			alarmOffset, //提前时间，秒
			success: () => {
				pageHelper.showSuccToast('添加成功');
			},
			fail: (res) => {
				if (res && res.errMsg && res.errMsg.includes('refuesed')) {
					pageHelper.showModal('请在手机的"设置›微信" 选项中，允许微信访问你的日历', '日历权限未开启')
				}
			},
			complete: (res) => {
				console.log(res)
			}

		})
	}

}

module.exports = MeetBiz;