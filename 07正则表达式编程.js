// 7.1 正则表达式的四种操作
// 正则表达式是匹配模式，不管如何使用正则表达式，万变不离其宗，都需要先“匹配”。
// 有了匹配这一基本操作后，才有其他的操作：验证、切分、提取、替换。

// 7.1.1 验证
// 验证是正则表达式最直接的应用，比如表单验证。
// 所谓匹配，就是看目标字符串里是否有满足匹配的子串。因此，“匹配”的本质就是“查找”。
// 有没有匹配，是不是匹配上，判断是否的操作，即称为“验证”。
// 比如，判断一个字符串中是否有数字。
var regex = /\d/;
var string = "abc123";
console.log(!!string.search(regex)); // => true

var regex = /\d/;
var string = "abc123";
console.log(regex.test(string)); // => true    最常用的是test

var regex = /\d/;
var string = "abc123";
console.log(!!string.match(regex)); // => true

var regex = /\d/;
var string = "abc123";
console.log(!!regex.exec(string)); // => true

// 7.1.2 切分
// 匹配上了，我们就可以进行一些操作，比如切分。
// 所谓“切分”，就是把目标字符串，切成一段一段的。在 JavaScript 中使用的是 split。
// 比如，目标字符串是 "html,css,javascript"，按逗号来切分：
var regex = /,/;
var string = "html,css,javascript";
console.log(string.split(regex));
// => ["html", "css", "javascript"]

// 又比如，如下的日期格式：
/*
2017/06/26
2017.06.26
2017-06-26
*/
// 可以使用 split “切出”年月日：
var regex = /\D/;
console.log("2017/06/26".split(regex));
console.log("2017.06.26".split(regex));
console.log("2017-06-26".split(regex));
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]
// => ["2017", "06", "26"]

// 7.1.3. 提取
// 虽然整体匹配上了，但有时需要提取部分匹配的数据。
// 此时正则通常要使用分组引用（分组捕获）功能，还需要配合使用相关 API。
// 这里，还是以日期为例，提取出年月日。注意下面正则中的括号：
// 使用 match：
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(string.match(regex));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]     其中最常用的是match

// 使用 exec：
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log(regex.exec(string));
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

// 使用test
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
regex.test(string);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"

// 使用search
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
string.search(regex);
console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// => "2017" "06" "26"

// 使用replace
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
var date = [];
string.replace(regex, function(match, year, month, day) {
    date.push(year, month, day);
});
console.log(date);
// => ["2017", "06", "26"]

// 7.1.4. 替换
// 找，往往不是目的，通常下一步是为了替换。在 JavaScript 中，使用 replace 进行替换。
// 比如把日期格式，从 yyyy-mm-dd 替换成 yyyy/mm/dd：
var string = "2017-06-26";
var today = new Date(string.replace(/-/g, "/"));
console.log(today);
// => Mon Jun 26 2017 00:00:00 GMT+0800 (中国标准时间)


// 7.2. 相关 API 注意要点
// 从上面可以看出用于正则操作的方法，共有 6 个，字符串实例 4 个，正则实例 2 个：
/**
 *   String#search
 *   String#split
 *   String#match
 *   String#replace
 *   RegExp#test
 *   RegExp#exec
 */
// 7.2.1. search 和 match 的参数问题
var string = "2017.06.27";
console.log(string.search(".")); // => 0

//需要修改成下列形式之一
console.log(string.search("\\."));
console.log(string.search(/\./));
// => 4
// => 4
console.log(string.match("."));
// => ["2", index: 0, input: "2017.06.27"]
//需要修改成下列形式之一
console.log(string.match("\\."));
console.log(string.match(/\./));
// => [".", index: 4, input: "2017.06.27"]
// => [".", index: 4, input: "2017.06.27"]
console.log(string.split("."));
// => ["2017", "06", "27"]
console.log(string.replace(".", "/"));
// => "2017/06.27"

// 7.2.2. match 返回结果的格式问题
// match 返回结果的格式，与正则对象是否有修饰符 g 有关。
var string = "2017.06.27";
var regex1 = /\b(\d+)\b/;
var regex2 = /\b(\d+)\b/g;
console.log(string.match(regex1));
console.log(string.match(regex2));
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => ["2017", "06", "27"]

// 7.2.3. exec 比 match 更强大
// 当正则没有 g 时，使用 match 返回的信息比较多。但是有 g 后，就没有关键的信息 index 了。
// 而 exec 方法就能解决这个问题，它能接着上一次匹配后继续匹配：
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
console.log(regex2.exec(string));
console.log(regex2.lastIndex);
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => 4
// => ["06", "06", index: 5, input: "2017.06.27"]
// => 7
// => ["27", "27", index: 8, input: "2017.06.27"]
// => 10
// => null
// => 0

// 从上述代码看出，在使用 exec 时，经常需要配合使用 while 循环：
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while (result = regex2.exec(string)) {
    console.log(result, regex2.lastIndex);
}
// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
// => ["06", "06", index: 5, input: "2017.06.27"] 7
// => ["27", "27", index: 8, input: "2017.06.27"] 10

// 7.2.4. 修饰符 g，对 exex 和 test 的影响
var regex = /a/g;
console.log(regex.test("a"), regex.lastIndex);
console.log(regex.test("aba"), regex.lastIndex);
console.log(regex.test("ababc"), regex.lastIndex);
// => true 1
// => true 3
// => false 0

var regex = /a/;
console.log(regex.test("a"), regex.lastIndex);
console.log(regex.test("aba"), regex.lastIndex);
console.log(regex.test("ababc"), regex.lastIndex);
// => true 0
// => true 0
// => true 0

// 7.2.5. test 整体匹配时需要使用 ^ 和 $
console.log(/123/.test("a123b"));
// => true
console.log(/^123$/.test("a123b"));
// => false
console.log(/^123$/.test("123"));
// => true

// 7.2.6. split 相关注意事项
// split 方法看起来不起眼，但要注意的地方有两个的。
// 第一，它可以有第二个参数，表示结果数组的最大长度：
var string = "html,css,javascript";
console.log(string.split(/,/, 2));
// =>["html", "css"]

// 第二，正则使用分组时，结果数组中是包含分隔符的：
var string = "html,css,javascript";
console.log(string.split(/(,)/));
// =>["html", ",", "css", ",", "javascript"]

// 7.2.7. replace 是很强大的
// 总体来说 replace 有两种使用形式，这是因为它的第二个参数，可以是字符串，也可以是函数。
// 当第二个参数是字符串时，如下的字符有特殊的含义：
/*
属性                  描述
$1,   $2,…,$99 匹配第 1-99 个 分组里捕获的文本
$&    匹配到的子串文本
$`    匹配到的子串的左边文本
$'    匹配到的子串的右边文本
$$    美元符号
*/
// 例如，把 "2,3,5"，变成 "5=2+3"：
var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
console.log(result); // => "5=2+3"

// 又例如，把 "2,3,5"，变成 "222,333,555":
var result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
console.log(result); // => "222,333,555"

// 再例如，把 "2+3=5"，变成 "2+3=2+3=5=5":
var result = "2+3=5".replace(/=/, "$&$`$&$'$&");
console.log(result); // => "2+3=2+3=5=5"

// 当第二个参数是函数时，我们需要注意该回调函数的参数具体是什么：
"1234 2345 3456".replace(/(\d)\d{2}(\d)/g, function(match, $1, $2, index, input) {
    console.log([match, $1, $2, index, input]);
});
// => ["1234", "1", "4", 0, "1234 2345 3456"]
// => ["2345", "2", "5", 5, "1234 2345 3456"]
// => ["3456", "3", "6", 10, "1234 2345 3456"]

// 7.2.8. 使用构造函数需要注意的问题
// 一般不推荐使用构造函数生成正则，而应该优先使用字面量。因为用构造函数会多写很多 \。
var string = "2017-06-27 2017.06.27 2017/06/27";
var regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
console.log(string.match(regex));
// => ["2017-06-27", "2017.06.27", "2017/06/27"]
regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
console.log(string.match(regex));
// => ["2017-06-27", "2017.06.27", "2017/06/27"]

// 7.2.9. 修饰符
// ES5 中修饰符，共 3 个：
/*
修饰符                  描述
 g      全局匹配，即找到所有匹配的，单词是 global。 
 i      忽略字母大小写，单词是 ingoreCase。 
 m      多行匹配，只影响 ^ 和 $，二者变成行的概念，即行开头和行结尾。单词是 multiline。
*/
var regex = /\w/img;
console.log(regex.global);
console.log(regex.ignoreCase);
console.log(regex.multiline);
// => true
// => true
// => true

// 7.2.10. source 属性
var className = "high";
var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
console.log(regex.source)
// => (^|\s)high(\s|$) 即字符串"(^|\\s)high(\\s|$)"