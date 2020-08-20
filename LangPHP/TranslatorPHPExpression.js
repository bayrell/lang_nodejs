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
Bayrell.Lang.LangPHP.TranslatorPHPExpression = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHPExpression"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression,
{
	/**
	 * Returns string
	 */
	toString: function(ctx, s)
	{
		var __v0 = use("Runtime.re");
		s = __v0.replace(ctx, "\\\\", "\\\\", s);
		var __v1 = use("Runtime.re");
		s = __v1.replace(ctx, "\"", "\\\"", s);
		var __v2 = use("Runtime.re");
		s = __v2.replace(ctx, "\n", "\\n", s);
		var __v3 = use("Runtime.re");
		s = __v3.replace(ctx, "\r", "\\r", s);
		var __v4 = use("Runtime.re");
		s = __v4.replace(ctx, "\t", "\\t", s);
		return "\"" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(ctx, t, pattern)
	{
		var names = this.findModuleNames(ctx, t, pattern.entity_name.names);
		var __v0 = use("Runtime.rs");
		var e = __v0.join(ctx, ".", names);
		var a = (pattern.template != null) ? (pattern.template.map(ctx, (ctx, pattern) => 
		{
			return this.toPattern(ctx, t, pattern);
		})) : (null);
		var __v1 = use("Runtime.rs");
		var b = (a != null) ? (",\"t\":[" + use("Runtime.rtl").toStr(__v1.join(ctx, ",", a)) + use("Runtime.rtl").toStr("]")) : ("");
		return "[\"e\"=>" + use("Runtime.rtl").toStr(this.toString(ctx, e)) + use("Runtime.rtl").toStr(b) + use("Runtime.rtl").toStr("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(ctx, t, s)
	{
		var module_name = this.getModuleName(ctx, t, "rtl");
		return module_name + use("Runtime.rtl").toStr("::toStr(") + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(ctx, t, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "ArrayAccess";
		}
		else if (t.modules.has(ctx, module_name))
		{
			return t.modules.item(ctx, module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(ctx, t, names)
	{
		if (names.count(ctx) > 0)
		{
			var module_name = names.first(ctx);
			module_name = this.findModuleName(ctx, t, module_name);
			if (module_name != "")
			{
				var __v0 = use("Runtime.rs");
				names = names.removeFirstIm(ctx).prependCollectionIm(ctx, __v0.split(ctx, "\\.", module_name));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(ctx, t, module_name)
	{
		module_name = this.findModuleName(ctx, t, module_name);
		var __v0 = use("Runtime.rs");
		module_name = __v0.replace(ctx, "\\.", "\\", module_name);
		return "\\" + use("Runtime.rtl").toStr(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(ctx, t, names)
	{
		var __v0 = use("Runtime.rs");
		return "\\" + use("Runtime.rtl").toStr(__v0.join(ctx, "\\", this.findModuleNames(ctx, t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(ctx, t, op_code)
	{
		var names = this.findModuleNames(ctx, t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = "\\" + use("Runtime.rtl").toStr(__v0.join(ctx, "\\", names));
		return use("Runtime.Collection").from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(ctx, t, op_code)
	{
		if (op_code.value == "@")
		{
			return use("Runtime.Collection").from([t,"$ctx"]);
		}
		if (op_code.value == "_")
		{
			return use("Runtime.Collection").from([t,"$ctx::translate"]);
		}
		if (op_code.value == "log")
		{
			return use("Runtime.Collection").from([t,"var_dump"]);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (t.modules.has(ctx, op_code.value) || op_code.kind == __v0.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(ctx, t, module_name);
			return use("Runtime.Collection").from([t,new_module_name]);
		}
		else if (op_code.kind == __v1.KIND_VARIABLE)
		{
			var content = op_code.value;
			return use("Runtime.Collection").from([t,"$" + use("Runtime.rtl").toStr(content)]);
		}
		else if (op_code.kind == __v2.KIND_CLASSREF)
		{
			var content = op_code.value;
			if (content == "this")
			{
				content = "$this";
			}
			return use("Runtime.Collection").from([t,content]);
		}
		var content = op_code.value;
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(ctx, t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + use("Runtime.rtl").toStr(content);
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 15);
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(ctx, t, op_code)
	{
		return use("Runtime.Collection").from([t,this.toString(ctx, op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.map(ctx, (ctx, op_code) => 
		{
			var res = this.Expression(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			var s = Runtime.rtl.get(ctx, res, 1);
			return s;
		});
		values = values.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(ctx, t, "Collection");
		var __v0 = use("Runtime.rs");
		content = module_name + use("Runtime.rtl").toStr("::from([") + use("Runtime.rtl").toStr(__v0.join(ctx, ",", values)) + use("Runtime.rtl").toStr("])");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(ctx, t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.map(ctx, (ctx, pair, key) => 
		{
			if (pair.condition != null && !t.preprocessor_flags.has(ctx, pair.condition.value))
			{
				return "";
			}
			var res = this.Expression(ctx, t, pair.value);
			t = Runtime.rtl.get(ctx, res, 0);
			var s = Runtime.rtl.get(ctx, res, 1);
			return this.toString(ctx, pair.key) + use("Runtime.rtl").toStr("=>") + use("Runtime.rtl").toStr(s);
		});
		values = values.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		var module_name = this.getModuleName(ctx, t, "Dict");
		if (!flag_array)
		{
			var __v0 = use("Runtime.rs");
			content = module_name + use("Runtime.rtl").toStr("::from([") + use("Runtime.rtl").toStr(__v0.join(ctx, ",", values)) + use("Runtime.rtl").toStr("])");
		}
		else
		{
			var __v1 = use("Runtime.rs");
			content = "[" + use("Runtime.rtl").toStr(__v1.join(ctx, ",", values)) + use("Runtime.rtl").toStr("]");
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(ctx, t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
		var __v3 = use("Bayrell.Lang.OpCodes.OpCurry");
		var __v4 = use("Bayrell.Lang.OpCodes.OpCall");
		if (op_code instanceof __v0)
		{
			return this.OpIdentifier(ctx, t, op_code);
		}
		else if (op_code instanceof __v1)
		{
			var __v2 = use("Runtime.Vector");
			var attrs = new __v2(ctx);
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			var first_item_complex = false;
			var __v3 = use("Bayrell.Lang.OpCodes.OpAttr");
			while (op_code_next instanceof __v3)
			{
				attrs.push(ctx, op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverseIm(ctx);
			var __v3 = use("Bayrell.Lang.OpCodes.OpCall");
			var __v4 = use("Bayrell.Lang.OpCodes.OpNew");
			var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			if (op_code_next instanceof __v3)
			{
				prev_kind = "var";
				var res = this.OpCall(ctx, t, op_code_next);
				t = Runtime.rtl.get(ctx, res, 0);
				s = Runtime.rtl.get(ctx, res, 1);
				first_item_complex = true;
			}
			else if (op_code_next instanceof __v4)
			{
				prev_kind = "var";
				var res = this.OpNew(ctx, t, op_code_next);
				t = Runtime.rtl.get(ctx, res, 0);
				s = "(" + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
				first_item_complex = true;
			}
			else if (op_code_next instanceof __v5)
			{
				var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v7 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (op_code_next.kind == __v6.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "parent")
					{
						s = "parent";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(ctx, t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else if (op_code_next.kind == __v7.KIND_PIPE)
				{
					prev_kind = "var";
					var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"var_content":t.pipe_var_name + use("Runtime.rtl").toStr("->val")}));
					t = Runtime.rtl.get(ctx, res, 0);
					s = Runtime.rtl.get(ctx, res, 1);
				}
				else
				{
					var res = this.OpIdentifier(ctx, t, op_code_next);
					t = Runtime.rtl.get(ctx, res, 0);
					s = Runtime.rtl.get(ctx, res, 1);
					prev_kind = "var";
					var __v8 = use("Bayrell.Lang.OpCodes.OpIdentifier");
					if (t.modules.has(ctx, op_code_next.value) || op_code_next.kind == __v8.KIND_SYS_TYPE)
					{
						prev_kind = "static";
					}
				}
			}
			if (first_item_complex && t.is_pipe)
			{
				var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"var_content":s}));
				t = Runtime.rtl.get(ctx, res, 0);
				s = Runtime.rtl.get(ctx, res, 1);
			}
			var attrs_sz = attrs.count(ctx);
			for (var i = 0;i < attrs.count(ctx);i++)
			{
				var attr = attrs.item(ctx, i);
				var next_attr = attrs.get(ctx, i + 1, null);
				var __v3 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v4 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v5 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v6 = use("Bayrell.Lang.OpCodes.OpAttr");
				if (attr.kind == __v3.KIND_ATTR)
				{
					s += use("Runtime.rtl").toStr("->" + use("Runtime.rtl").toStr(attr.value.value));
				}
				else if (attr.kind == __v4.KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						var attr_val = attr.value.value;
						var __v5 = use("Bayrell.Lang.OpCodes.OpCall");
						var __v6 = use("Runtime.rs");
						if (i == attrs_sz - 1 && next_op_code instanceof __v5)
						{
							s += use("Runtime.rtl").toStr("::" + use("Runtime.rtl").toStr(attr_val));
						}
						else if (__v6.strtoupper(ctx, attr_val) == attr_val)
						{
							s += use("Runtime.rtl").toStr("::" + use("Runtime.rtl").toStr(attr_val));
						}
						else
						{
							var val1;
							if (s == "static")
							{
								val1 = "static::class";
							}
							else
							{
								val1 = s + use("Runtime.rtl").toStr("::class");
							}
							var val2 = this.toString(ctx, attr_val);
							s = "new \\Runtime\\Callback(" + use("Runtime.rtl").toStr(val1) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(val2) + use("Runtime.rtl").toStr(")");
						}
					}
					else
					{
						s = s + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(attr.value.value);
					}
					prev_kind = "static";
				}
				else if (attr.kind == __v5.KIND_DYNAMIC)
				{
					var res = this.Expression(ctx, t, attr.value);
					t = Runtime.rtl.get(ctx, res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					s = "\\Runtime\\rtl::get($ctx, " + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1)) + use("Runtime.rtl").toStr(")");
				}
				else if (attr.kind == __v6.KIND_DYNAMIC_ATTRS)
				{
					var __v7 = use("Runtime.Vector");
					var items = new __v7(ctx);
					if (attr.attrs != null)
					{
						for (var j = 0;j < attr.attrs.count(ctx);j++)
						{
							var res = this.Expression(ctx, t, Runtime.rtl.get(ctx, attr.attrs, j));
							t = Runtime.rtl.get(ctx, res, 0);
							items.push(ctx, Runtime.rtl.get(ctx, res, 1));
						}
					}
					var __v8 = use("Runtime.rs");
					s = "\\Runtime\\rtl::attr($ctx, " + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(", [") + use("Runtime.rtl").toStr(__v8.join(ctx, ", ", items)) + use("Runtime.rtl").toStr("])");
				}
			}
			return use("Runtime.Collection").from([t,s]);
		}
		else if (op_code instanceof __v3)
		{
			var res = this.OpCurry(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			var content = Runtime.rtl.get(ctx, res, 1);
			var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"var_content":content}));
			t = Runtime.rtl.get(ctx, res, 0);
			var var_name = Runtime.rtl.get(ctx, res, 1);
			return use("Runtime.Collection").from([t,var_name]);
		}
		else if (op_code instanceof __v4)
		{
			return this.OpCall(ctx, t, op_code);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(ctx, t, op_code.value);
		t = Runtime.rtl.get(ctx, res, 0);
		var s = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v1 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v2 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v3 = use("Bayrell.Lang.OpCodes.OpInc");
		if (op_code.kind == __v0.KIND_PRE_INC)
		{
			content = "++$" + use("Runtime.rtl").toStr(s);
		}
		else if (op_code.kind == __v1.KIND_PRE_DEC)
		{
			content = "--$" + use("Runtime.rtl").toStr(s);
		}
		else if (op_code.kind == __v2.KIND_POST_INC)
		{
			content = "$" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr("++");
		}
		else if (op_code.kind == __v3.KIND_POST_DEC)
		{
			content = "$" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr("--");
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(ctx, t, op_code)
	{
		var res = this.Expression(ctx, t, op_code.value1);
		t = Runtime.rtl.get(ctx, res, 0);
		var opcode_level1 = Runtime.rtl.get(ctx, res, 0).opcode_level;
		var s1 = Runtime.rtl.get(ctx, res, 1);
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + use("Runtime.rtl").toStr(t.o(ctx, s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(ctx, t, op_code.value2);
			t = Runtime.rtl.get(ctx, res, 0);
			var opcode_level2 = Runtime.rtl.get(ctx, res, 0).opcode_level;
			var s2 = Runtime.rtl.get(ctx, res, 1);
			var op1 = t.o(ctx, s1, opcode_level1, opcode_level);
			var op2 = t.o(ctx, s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + use("Runtime.rtl").toStr(" . ") + use("Runtime.rtl").toStr(this.rtlToStr(ctx, t, op2));
			}
			else if (op_math == "implements")
			{
				content = op1 + use("Runtime.rtl").toStr(" instanceof ") + use("Runtime.rtl").toStr(op2);
			}
			else
			{
				content = op1 + use("Runtime.rtl").toStr(" ") + use("Runtime.rtl").toStr(op) + use("Runtime.rtl").toStr(" ") + use("Runtime.rtl").toStr(op2);
			}
		}
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), opcode_level);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpMethod
	 */
	OpMethod: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.OpIdentifier(ctx, t, op_code.value1);
		t = Runtime.rtl.get(ctx, res, 0);
		var val1 = Runtime.rtl.get(ctx, res, 1);
		var val2 = op_code.value2;
		var __v0 = use("Bayrell.Lang.OpCodes.OpMethod");
		var __v1 = use("Bayrell.Lang.OpCodes.OpMethod");
		if (op_code.kind == __v0.KIND_STATIC)
		{
			val1 = val1 + use("Runtime.rtl").toStr("->getClassName()");
		}
		else if (op_code.kind == __v1.KIND_CLASS)
		{
			val1 = val1 + use("Runtime.rtl").toStr("::class");
		}
		var content = "new \\Runtime\\Callback(" + use("Runtime.rtl").toStr(val1) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(this.toString(ctx, val2)) + use("Runtime.rtl").toStr(")");
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 0);
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(ctx, t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(ctx, t, op_code.value);
		t = Runtime.rtl.get(ctx, res, 0);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		var flag = false;
		content += use("Runtime.rtl").toStr("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += use("Runtime.rtl").toStr("$ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = t.expression.constructor.Expression(ctx, t, item);
			t = Runtime.rtl.get(ctx, res, 0);
			var s = Runtime.rtl.get(ctx, res, 1);
			content += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr(s));
			flag = true;
		}
		content += use("Runtime.rtl").toStr(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpCurry
	 */
	OpCurry: function(ctx, t, op_code)
	{
		var content = "";
		var s = "";
		var args = op_code.args.filter(ctx, (ctx, arg) => 
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpCurryArg");
			return arg instanceof __v0;
		}).sortIm(ctx, (ctx, arg1, arg2) => 
		{
			return (arg1.pos > arg2.pos) ? (1) : ((arg1.pos < arg2.pos) ? (-1) : (0));
		});
		var use_obj_item = "";
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (op_code.obj instanceof __v0)
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			if (op_code.obj.kind == __v1.KIND_VARIABLE)
			{
				use_obj_item = "$" + use("Runtime.rtl").toStr(op_code.obj.value);
			}
		}
		var args_sz = args.count(ctx);
		for (var i = 0;i < args_sz;i++)
		{
			var arg = args.item(ctx, i);
			var s_use = "";
			var __v0 = use("Runtime.Vector");
			var arr_use = new __v0(ctx);
			for (var j = 0;j < i;j++)
			{
				var arg_use = args.item(ctx, j);
				arr_use.push(ctx, "$__varg" + use("Runtime.rtl").toStr(arg_use.pos));
			}
			if (use_obj_item != "")
			{
				arr_use.push(ctx, use_obj_item);
			}
			if (arr_use.count(ctx) > 0)
			{
				var __v1 = use("Runtime.rs");
				s_use = " use (" + use("Runtime.rtl").toStr(__v1.join(ctx, ", ", arr_use)) + use("Runtime.rtl").toStr(")");
			}
			if (args_sz - 1 == i)
			{
				content += use("Runtime.rtl").toStr("function ($ctx, $__varg" + use("Runtime.rtl").toStr(arg.pos) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr(s_use) + use("Runtime.rtl").toStr("{return "));
			}
			else
			{
				content += use("Runtime.rtl").toStr("function ($__ctx" + use("Runtime.rtl").toStr(arg.pos) + use("Runtime.rtl").toStr(", $__varg") + use("Runtime.rtl").toStr(arg.pos) + use("Runtime.rtl").toStr(")") + use("Runtime.rtl").toStr(s_use) + use("Runtime.rtl").toStr("{return "));
			}
		}
		var flag = false;
		var res = this.Dynamic(ctx, t, op_code.obj, op_code);
		t = Runtime.rtl.get(ctx, res, 0);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + use("Runtime.rtl").toStr(f_name) + use("Runtime.rtl").toStr("(");
			content += use("Runtime.rtl").toStr(s);
		}
		else
		{
			content += use("Runtime.rtl").toStr("(");
		}
		content += use("Runtime.rtl").toStr("$ctx");
		flag = true;
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			s = "";
			var item = op_code.args.item(ctx, i);
			var __v0 = use("Bayrell.Lang.OpCodes.OpCurryArg");
			if (item instanceof __v0)
			{
				s += use("Runtime.rtl").toStr("$__varg" + use("Runtime.rtl").toStr(item.pos));
			}
			else
			{
				var res = this.Expression(ctx, t, item);
				t = Runtime.rtl.get(ctx, res, 0);
				s = Runtime.rtl.get(ctx, res, 1);
			}
			content += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr(s));
			flag = true;
		}
		content += use("Runtime.rtl").toStr(")");
		for (var i = 0;i < args_sz;i++)
		{
			content += use("Runtime.rtl").toStr(";}");
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(ctx, t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(ctx, t, op_code.obj, op_code);
		t = Runtime.rtl.get(ctx, res, 0);
		s = Runtime.rtl.get(ctx, res, 1);
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + use("Runtime.rtl").toStr(f_name) + use("Runtime.rtl").toStr("(");
		}
		else
		{
			s += use("Runtime.rtl").toStr("(");
		}
		var content = s;
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (op_code.obj instanceof __v0 && op_code.obj.value == "_")
		{
			content += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr("$ctx, $ctx"));
			flag = true;
		}
		else if ((t.current_function == null || t.current_function.is_context) && op_code.is_context)
		{
			content += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr("$ctx"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(ctx);i++)
		{
			var item = op_code.args.item(ctx, i);
			var res = this.Expression(ctx, t, item);
			t = Runtime.rtl.get(ctx, res, 0);
			var s = Runtime.rtl.get(ctx, res, 1);
			content += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr(s));
			flag = true;
		}
		content += use("Runtime.rtl").toStr(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(ctx, t, op_code)
	{
		var names = this.findModuleNames(ctx, t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = __v0.join(ctx, ".", names);
		return use("Runtime.Collection").from([t,this.toString(ctx, s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(ctx, t, op_code)
	{
		var content = "";
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 100);
		var res = this.Expression(ctx, t, op_code.condition);
		t = Runtime.rtl.get(ctx, res, 0);
		var condition = Runtime.rtl.get(ctx, res, 1);
		var res = this.Expression(ctx, t, op_code.if_true);
		t = Runtime.rtl.get(ctx, res, 0);
		var if_true = Runtime.rtl.get(ctx, res, 1);
		var res = this.Expression(ctx, t, op_code.if_false);
		t = Runtime.rtl.get(ctx, res, 0);
		var if_false = Runtime.rtl.get(ctx, res, 1);
		content += use("Runtime.rtl").toStr("(" + use("Runtime.rtl").toStr(condition) + use("Runtime.rtl").toStr(") ? (") + use("Runtime.rtl").toStr(if_true) + use("Runtime.rtl").toStr(") : (") + use("Runtime.rtl").toStr(if_false) + use("Runtime.rtl").toStr(")"));
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 11);
		/* OpTernary */
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var value = "";
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = Runtime.rtl.get(ctx, res, 0);
		var_name = Runtime.rtl.get(ctx, res, 1);
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["pipe_var_name"]), var_name);
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var op_code_item = op_code;
		var __v1 = use("Bayrell.Lang.OpCodes.OpPipe");
		while (op_code_item instanceof __v1)
		{
			items.push(ctx, op_code_item);
			op_code_item = op_code_item.obj;
		}
		items = items.reverseIm(ctx);
		/* First item */
		var res = t.expression.constructor.Expression(ctx, t, op_code_item);
		t = Runtime.rtl.get(ctx, res, 0);
		value = Runtime.rtl.get(ctx, res, 1);
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"content":t.s(ctx, var_name + use("Runtime.rtl").toStr(" = new \\Runtime\\Monad($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(");"))}));
		t = Runtime.rtl.get(ctx, res, 0);
		/* Output items */
		for (var i = 0;i < items.count(ctx);i++)
		{
			var s1 = "";
			var s2 = "";
			var op_item = items.item(ctx, i);
			var __v1 = use("Bayrell.Lang.OpCodes.OpPipe");
			var __v2 = use("Bayrell.Lang.OpCodes.OpPipe");
			if (op_item.kind == __v1.KIND_ATTR)
			{
				var res = this.Expression(ctx, t, op_item.value);
				t = Runtime.rtl.get(ctx, res, 0);
				value = Runtime.rtl.get(ctx, res, 1);
				s1 = var_name + use("Runtime.rtl").toStr("->attr($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
			}
			else if (op_item.kind == __v2.KIND_CALL)
			{
				t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["is_pipe"]), true);
				var args = "";
				var is_instance_method = false;
				var __v3 = use("Bayrell.Lang.OpCodes.OpCall");
				var __v4 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v5 = use("Bayrell.Lang.OpCodes.OpAttr");
				if (op_item.value instanceof __v3 && op_item.value.obj instanceof __v4 && op_item.value.obj.kind == __v5.KIND_ATTR)
				{
					is_instance_method = true;
					value = t.pipe_var_name + use("Runtime.rtl").toStr(".val");
					value += use("Runtime.rtl").toStr("." + use("Runtime.rtl").toStr(op_item.value.obj.value.value));
					value += use("Runtime.rtl").toStr(".bind(" + use("Runtime.rtl").toStr(t.pipe_var_name) + use("Runtime.rtl").toStr(".val)"));
					var flag = false;
					for (var i = 0;i < op_item.value.args.count(ctx);i++)
					{
						var item = op_item.value.args.item(ctx, i);
						var res = t.expression.constructor.Expression(ctx, t, item);
						t = Runtime.rtl.get(ctx, res, 0);
						var s_arg = Runtime.rtl.get(ctx, res, 1);
						args += use("Runtime.rtl").toStr(((flag) ? (", ") : ("")) + use("Runtime.rtl").toStr(s_arg));
						flag = true;
					}
				}
				else
				{
					var res = this.Dynamic(ctx, t, op_item.value);
					t = Runtime.rtl.get(ctx, res, 0);
					value = Runtime.rtl.get(ctx, res, 1);
				}
				if (!op_item.is_async || !t.enable_async_await)
				{
					if (op_item.is_monad)
					{
						s1 = var_name + use("Runtime.rtl").toStr("->monad($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
					}
					else
					{
						if (is_instance_method)
						{
							s1 = var_name + use("Runtime.rtl").toStr("->callMethod(ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(", [") + use("Runtime.rtl").toStr(args) + use("Runtime.rtl").toStr("])");
						}
						else
						{
							s1 = var_name + use("Runtime.rtl").toStr("->call($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
						}
					}
				}
				else if (op_item.is_async && t.current_function.isFlag(ctx, "async"))
				{
					if (op_item.is_monad)
					{
						s1 = var_name + use("Runtime.rtl").toStr("->monadAsync($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
					}
					else
					{
						if (is_instance_method)
						{
							s1 = var_name + use("Runtime.rtl").toStr("->callMethodAsync(ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(", [") + use("Runtime.rtl").toStr(args) + use("Runtime.rtl").toStr("])");
						}
						else
						{
							s1 = var_name + use("Runtime.rtl").toStr("->callAsync($ctx, ") + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
						}
					}
				}
				t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["is_pipe"]), false);
			}
			if (s1 != "")
			{
				var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"content":t.s(ctx, var_name + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(s1) + use("Runtime.rtl").toStr(";"))}));
				t = Runtime.rtl.get(ctx, res, 0);
			}
		}
		return use("Runtime.Collection").from([t,var_name + use("Runtime.rtl").toStr("->value($ctx)")]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(ctx, t, op_code.value);
		t = Runtime.rtl.get(ctx, res, 0);
		var value = Runtime.rtl.get(ctx, res, 1);
		content = "\\Runtime\\rtl::to(" + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(", ") + use("Runtime.rtl").toStr(this.toPattern(ctx, t, op_code.pattern)) + use("Runtime.rtl").toStr(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpTernary
	 */
	OpDeclareFunction: function(ctx, t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["current_function"]), op_code);
		var res = t.operator.constructor.OpDeclareFunctionArgs(ctx, t, op_code);
		var args = Runtime.rtl.get(ctx, res, 1);
		content += use("Runtime.rtl").toStr("function (" + use("Runtime.rtl").toStr(args) + use("Runtime.rtl").toStr(")"));
		if (op_code.vars != null && op_code.vars.count(ctx) > 0)
		{
			var vars = op_code.vars.map(ctx, (ctx, s) => 
			{
				return "&$" + use("Runtime.rtl").toStr(s);
			});
			var __v0 = use("Runtime.rs");
			content += use("Runtime.rtl").toStr(" use (" + use("Runtime.rtl").toStr(__v0.join(ctx, ",", vars)) + use("Runtime.rtl").toStr(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(ctx, t, op_code);
		content += use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, res, 1));
		/* Restore function */
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["current_function"]), save_f);
		/* OpTernary */
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(ctx, t, op_code)
	{
		var content = "";
		t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 100);
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpNumber");
		var __v3 = use("Bayrell.Lang.OpCodes.OpString");
		var __v4 = use("Bayrell.Lang.OpCodes.OpCollection");
		var __v5 = use("Bayrell.Lang.OpCodes.OpDict");
		var __v6 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v7 = use("Bayrell.Lang.OpCodes.OpMath");
		var __v8 = use("Bayrell.Lang.OpCodes.OpMethod");
		var __v9 = use("Bayrell.Lang.OpCodes.OpNew");
		var __v10 = use("Bayrell.Lang.OpCodes.OpAttr");
		var __v11 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v12 = use("Bayrell.Lang.OpCodes.OpClassOf");
		var __v13 = use("Bayrell.Lang.OpCodes.OpCurry");
		var __v14 = use("Bayrell.Lang.OpCodes.OpPipe");
		var __v15 = use("Bayrell.Lang.OpCodes.OpTernary");
		var __v16 = use("Bayrell.Lang.OpCodes.OpTypeConvert");
		var __v17 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
		var __v18 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var __v19 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
		if (op_code instanceof __v0)
		{
			var res = this.OpIdentifier(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v1)
		{
			var res = this.OpTypeIdentifier(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v2)
		{
			var res = this.OpNumber(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v3)
		{
			var res = this.OpString(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v4)
		{
			var res = this.OpCollection(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v5)
		{
			var res = this.OpDict(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v6)
		{
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["opcode_level"]), 16);
			var res = this.OpInc(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v7)
		{
			var res = this.OpMath(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v8)
		{
			var res = this.OpMethod(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v9)
		{
			var res = this.OpNew(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v10)
		{
			var res = this.Dynamic(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v11)
		{
			var res = this.OpCall(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v12)
		{
			var res = this.OpClassOf(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v13)
		{
			var res = this.OpCurry(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v14)
		{
			return this.OpPipe(ctx, t, op_code);
		}
		else if (op_code instanceof __v15)
		{
			var res = this.OpTernary(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v16)
		{
			var res = this.OpTypeConvert(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v17)
		{
			var res = this.OpDeclareFunction(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		else if (op_code instanceof __v18)
		{
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["is_html"]), true);
			var res = t.html.constructor.OpHtmlItems(ctx, t, op_code);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
			t = Runtime.rtl.setAttr(ctx, t, Runtime.Collection.from(["is_html"]), false);
		}
		else if (op_code instanceof __v19)
		{
			var __v20 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
			var res = t.operator.constructor.OpPreprocessorIfDef(ctx, t, op_code, __v20.KIND_EXPRESSION);
			t = Runtime.rtl.get(ctx, res, 0);
			content = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPExpression);
module.exports = Bayrell.Lang.LangPHP.TranslatorPHPExpression;