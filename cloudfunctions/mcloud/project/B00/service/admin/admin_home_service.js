/**
 * Notes: 后台HOME/登录模块 
 * Date: 2025-06-15 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');  
const UserModel = require('../../model/user_model.js');
const MeetModel = require('../../model/meet_model.js');
const NewsModel = require('../../model/news_model.js');
const ProductModel = require('../../model/product_model.js');
const AlbumModel = require('../../model/album_model.js');

class AdminHomeService extends BaseProjectAdminService {

	/**
	 * 首页数据归集
	 */
	async adminHome() {
		let where = {};

		let userCnt = await UserModel.count(where);
		let newsCnt = await NewsModel.count(where);
		let meetCnt = await MeetModel.count(where);
		let productCnt = await ProductModel.count(where);
		let albumCnt = await AlbumModel.count(where);
		return [
			{ title: '用户数', cnt: userCnt },
			{ title: '内容数', cnt: newsCnt },
			{ title: '预约项目', cnt: meetCnt },
			{ title: '套系数', cnt: productCnt },
			{ title: '样片数', cnt: albumCnt },
		]
	} 

	// 用户数据清理  
	async clearUserData(userId) {

	}

}

module.exports = AdminHomeService;