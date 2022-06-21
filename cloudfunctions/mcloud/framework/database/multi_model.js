/**
 * Notes: 实体基类 
 * Date: 2021-03-15 19:20:00 
 * Ver : CCMiniCloud Framework 2.12.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */


const Model = require('./model.js');
const util = require('../utils/util.js');
const dataUtil = require('../utils/data_util.js');

class MultiModel extends Model {

	static _getWhere(where, mustPID = true) {
		if (mustPID) {
			if (typeof (where) == 'string' || typeof (where) == 'number') {
				where = {
					_id: where,
					_pid: util.getProjectId()
				};
			} else
				where._pid = util.getProjectId();
		}
		return where;
	}

	/**
	 * 获取单个object的字段
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @returns val or null
	 */
	static async getOneField(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		let one = await super.getOne(where, field);
		if (!one)
			return null;
		else {
			let ret = one[field];
			if (ret === undefined)
				return '';
			else
				return one[field];
		}

	}

	/**
	 * 获取单个object
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @returns object or null
	 */
	static async getOne(where, fields = '*', orderBy = {}, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getOne(where, fields, orderBy);
	}

	/**
	 * 修改
	 * @param {*} where 
	 * @param {*} data 
	 */
	static async edit(where, data, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.edit(where, data);
	}

	/**
	 * 修改特定form
	 * @param {*} where 
	 * @param {*} data 
	 */
	static async editForms(where, formName, objName, hasImageForms, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);

		let forms = await this.getOneField(where, formName, mustPID);
		if (!forms) return;


		// 赋值
		for (let k in hasImageForms) {
			for (let j in forms) {
				if ((forms[j].type == 'image' || forms[j].type == 'content')
					&& forms[j].mark == hasImageForms[k].mark
					&& forms[j].type == hasImageForms[k].type) {
					forms[j].val = hasImageForms[k].val;
					break;
				}
			}
		}

		//更新数据库
		let data = {
			[formName]: forms,
			[objName]: dataUtil.dbForms2Obj(forms)
		};

		return await super.edit(where, data);
	}

	/**
	 * 计算总数
	 * @param {*} where 
	 */
	static async count(where, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.count(where);
	}

	/**
	 * 插入数据
	 * @param {*} data 
	 */
	static async insert(data, mustPID = true) {
		if (mustPID) data._pid = util.getProjectId();
		return await super.insert(data);
	}

	/**
	 * 批量插入数据
	 * @param {*} data 
	 */
	static async insertBatch(data = [], size = 1000, mustPID = true) {
		if (mustPID) {
			for (let k in data)
				data[k]._pid = util.getProjectId();
		}

		return await super.insertBatch(data, size);
	}

	/**
	 * 插入或者更新数据
	 * @param {*} data 
	 */
	static async insertOrUpdate(where, data, mustPID = true) {
		if (mustPID) {
			where._pid = util.getProjectId();
		}
		return await super.insertOrUpdate(where, data);
	}


	/**
	 * 删除记录
	 * @param {*} where 
	 */
	static async del(where, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.del(where);
	}

	/**
	 * 清空表
	 * @param {*}   
	 */
	static async clear() {
		return await super.clear();
	}

	/**
	 * 自增处理
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async inc(where, field, val = 1, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.inc(where, field, val);
	}

	/**
	 * 自乘处理
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async mul(where, field, val = 1, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.mul(where, field, val);
	}

	/**
	 * 分组求和
	 * @param {*} where 
	 * @param {*} groupField 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async groupSum(where, groupField, field, mustPID = true) {
		if (mustPID) where._pid = util.getProjectId();
		return await super.groupSum(where, groupField, field);
	}

	/**
	 * 分组求COUNT
	 * @param {*} where 
	 * @param {*} groupField  
	 * @param {*} val 
	 */
	static async groupCount(where, groupField, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.groupCount(where, groupField);
	}

	/**
	 * 求和
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async sum(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.sum(where, field);
	}

	/**
	 * 求不重复
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async distinct(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.distinct(where, field);
	}

	/**
	 * 求不重复
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async distinctCnt(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.distinctCnt(where, field);
	}

	/**
	 * 最大
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async max(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.max(where, field);
	}

	/**
	 * 最小
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} val 
	 */
	static async min(where, field, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.min(where, field);
	}

	/**
	 * 随机数据
	 * @param {*} where 
	 * @param {*} field 
	 * @param {*} size 
	 */
	static async rand(where, field, size = 1, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.rand(where, field, size);
	}

	/**
	 * 所有记录
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @param {*} size  
	 */
	static async getAll(where, fields, orderBy, size = 100, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getAll(where, fields, orderBy, size);
	}


	/**
	 * 大数据情况下取得所有记录
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @param {*} size  
	 */
	static async getAllBig(where, fields, orderBy, size = 1000, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getAllBig(where, fields, orderBy, size);
	}

	/**
	 * 所有记录 数组字段拆分查询
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @param {*} size  
	 */
	static async getAllByArray(arrField, where, fields, orderBy, size = 100, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getAllByArray(arrField, where, fields, orderBy, size);
	}

	/**
	 * 分页记录
	 * @param {*} where 
	 * @param {*} fields 
	 * @param {*} orderBy 
	 * @param {*} page 
	 * @param {*} size 
	 * @param {*} isTotal 
	 * @param {*} oldTotal  // 上次分页的记录总数 
	 */
	static async getList(where, fields, orderBy, page, size, isTotal, oldTotal, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	// 联表获取分页（2张表)
	static async getListJoin(joinParams, where, fields, orderBy, page = 1, size, isTotal = true, oldTotal = 0, is2Many = false, mustPID = true) {
		where = MultiModel._getWhere(where, mustPID);
		return await super.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal, is2Many);
	}

}

module.exports = MultiModel;