"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHP = function(ctx)
{
	use("Bayrell.Lang.CoreTranslator").apply(this, arguments);
};
Bayrell.Lang.LangPHP.TranslatorPHP.prototype = Object.create(use("Bayrell.Lang.CoreTranslator").prototype);
Bayrell.Lang.LangPHP.TranslatorPHP.prototype.constructor = Bayrell.Lang.LangPHP.TranslatorPHP;
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.is_pipe = false;
		this.pipe_var_name = "";
		this.html_var_name = "";
		this.is_html = false;
		this.expression = null;
		this.html = null;
		this.operator = null;
		this.program = null;
		use("Bayrell.Lang.CoreTranslator").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHP"))
		{
			this.is_pipe = o.is_pipe;
			this.pipe_var_name = o.pipe_var_name;
			this.html_var_name = o.html_var_name;
			this.is_html = o.is_html;
			this.expression = o.expression;
			this.html = o.html;
			this.operator = o.operator;
			this.program = o.program;
		}
		use("Bayrell.Lang.CoreTranslator").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "is_pipe")this.is_pipe = v;
		else if (k == "pipe_var_name")this.pipe_var_name = v;
		else if (k == "html_var_name")this.html_var_name = v;
		else if (k == "is_html")this.is_html = v;
		else if (k == "expression")this.expression = v;
		else if (k == "html")this.html = v;
		else if (k == "operator")this.operator = v;
		else if (k == "program")this.program = v;
		else use("Bayrell.Lang.CoreTranslator").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "is_pipe")return this.is_pipe;
		else if (k == "pipe_var_name")return this.pipe_var_name;
		else if (k == "html_var_name")return this.html_var_name;
		else if (k == "is_html")return this.is_html;
		else if (k == "expression")return this.expression;
		else if (k == "html")return this.html;
		else if (k == "operator")return this.operator;
		else if (k == "program")return this.program;
		return use("Bayrell.Lang.CoreTranslator").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHP";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP, use("Bayrell.Lang.CoreTranslator"));
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHP,
{
	/**
	 * Reset translator
	 */
	reset: function(ctx, t)
	{
		var __v0 = use("Runtime.Dict");
		var __v1 = use("Bayrell.Lang.LangPHP.TranslatorPHPExpression");
		var __v2 = use("Bayrell.Lang.LangPHP.TranslatorPHPHtml");
		var __v3 = use("Bayrell.Lang.LangPHP.TranslatorPHPOperator");
		var __v4 = use("Bayrell.Lang.LangPHP.TranslatorPHPProgram");
		var __v5 = use("Runtime.Collection");
		var __v6 = use("Runtime.Collection");
		return t.copy(ctx, use("Runtime.Dict").from({"value":"","current_namespace_name":"","modules":new __v0(ctx),"expression":new __v1(ctx),"html":new __v2(ctx),"operator":new __v3(ctx),"program":new __v4(ctx),"save_vars":new __v5(ctx),"save_op_codes":new __v6(ctx),"save_op_code_inc":0,"preprocessor_flags":use("Runtime.Dict").from({"BACKEND":true,"PHP":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		t = this.reset(ctx, t);
		return t.program.constructor.translateProgram(ctx, t, op_code);
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(ctx, t)
	{
		return "$__v" + use("Runtime.rtl").toStr(t.save_op_code_inc);
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(ctx, t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count(ctx);i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(ctx, i);
			var s = (save.content == "") ? (t.s(ctx, save.var_name + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(save.var_content) + use("Runtime.rtl").toStr(";"))) : (save.content);
			content += use("Runtime.rtl").toStr(s);
		}
		return content;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHP";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("is_pipe");
			a.push("pipe_var_name");
			a.push("html_var_name");
			a.push("is_html");
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "is_pipe") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pipe_var_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html_var_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "expression") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "html") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "operator") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "program") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHP",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangPHP.TranslatorPHP);
module.exports = Bayrell.Lang.LangPHP.TranslatorPHP;