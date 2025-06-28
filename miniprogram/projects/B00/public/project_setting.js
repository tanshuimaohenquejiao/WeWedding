module.exports = {
	PID: 'A00',
	NAV_COLOR: '#000000',
	NAV_BG: '#ffffff',

	// 用户
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'area', title: '所在地区', type: 'text' },
		{ mark: 'work', title: '行业领域', type: 'text' },
	],

	// 资讯 
	NEWS_CATE: [
		{ id: 1, title: '本店动态', style: 'leftbig3' },
		{ id: 2, title: '拍摄小贴士', style: 'leftbig' },
	],

	// ### 预约相关
	MEET_JOIN_MUST_LOGIN: false,
	MEET_TYPE: [
		{ id: 1, title: '预约拍摄', style: 'leftbig2' }
	],
	MEET_CAN_NULL_TIME: false, // 是否允许有无时段的日期保存和展示   

	MEET_JOIN_FIELDS: [
		{ type: 'text', title: '姓名', must: true, max: 30 },
		{ type: 'mobile', title: '手机', must: true }
	],

	// 样片
	ALBUM_CATE: [
		{ id: 1, title: '婚纱' },
		{ id: 2, title: '旅拍' },
		{ id: 3, title: '儿童' },
		{ id: 4, title: '写真' },
		{ id: 5, title: '萌宠' },
	],
	ALBUM_FIELDS: [
		{ mark: 'cover', title: '封面照片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'detail', title: '详细介绍', type: 'content', must: true },
	],

	// 套系
	PRODUCT_CATE: [
		{ id: 1, title: '套系' }
	],
	PRODUCT_FIELDS: [
		{ mark: 'price', title: '套系价格', type: 'digit', must: true },
		{ mark: 'origPrice', title: '原价', type: 'digit', must: true },
		{ mark: 'adv', title: '亮点介绍', type: 'text', max: 30, must: true, desc: '一句话介绍产品亮点' },
		{ mark: 'service', title: '摄影服务', type: 'textarea', must: true },
		{ mark: 'item', title: '行程安排', type: 'textarea', must: true },
		{ mark: 'product', title: '影像产品', type: 'textarea', must: true },
		{ mark: 'desc', title: '套系简介', type: 'textarea', must: false },
		{ mark: 'cover', title: '封面图', type: 'image', len: 1, must: true },
		{ mark: 'album', title: '套系图册', type: 'image', must: true },
	],

}