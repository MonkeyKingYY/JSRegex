/**
js中的match()方法：

返回值
存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。

说明
match() 方法将检索字符串 stringObject，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。

如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， 
match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。
除了这些常规的数组元素之外，返回的数组还含有两个对象属性。
index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。

如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。
若没有找到任何匹配的子串，则返回 null。
如果找到了一个或多个匹配子串，则返回一个数组。
不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。*/

// 精准匹配，没有多大意义
var regex = /hello/;
console.log(regex.test("hello"));
// => true

// 1.1 两种模糊匹配
// 横向模糊匹配
// 一个正则可匹配的字符串的长度不是固定
// { m, n } 表示连续出现最少m次，最多n次
var regex = /ab{2,5}c/g; // 正则表达式中间不要有空格，/g表示全局匹配
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
console.log(string.match(regex));
// => ["abbc", "abbbc", "abbbbc", "abbbbbc"]

// 纵向模糊匹配
// 一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能
var regex = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
console.log(string.match(regex));
// => ["a1b", "a2b", "a3b"]

// 1.2 字符组
// 范围表示法    用字符-来省略和简写
// [a-z]，表示小写字符中的任何一个字符。
// 匹配 "a"、"-"、"z" 这三者中任意一个字符，可以写成如下的方式：[-az] 或 [az-] 或 [a\-z]。

// 排除字符组    排除字符组（反义字符组）的概念。例如 [^abc]，表示是一个除 "a"、"b"、"c"之外的任意一个字 符。字符组的第一位放 ^（脱字符），表示求反的概念

// 常见的简写形式：
//  \d: 表示 [0-9]。表示是一位数字,范围0到9。记忆方式：其英文是 digit（数字）。
//  \D: 表示 [^0-9]。表示除数字外的任意字符
//  \w: 表示 [0-9a-zA-Z_]。表示数字、大小写字母、和下划线。 记忆方式：w 是 word 的简写，也称单词字符。
//  \W: 表示 [^0-9a-zA-Z_]。表示非单词字符
//  \s: 表示 [ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s 是 space 的首字母，空白符的单词是 white space。
//  \S: 表示 [^ \t\v\n\r\f]。 非空白符。
//  · : 表示 [^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。 记忆方式：想想省略号 … 中的每个点，都可以理解成占位符，表示任何类似的东西。
var regex = /a.b/g;
var string = "a0b a1b acb aZb a%b";
console.log(string.match(regex));

// 1.3 量词
// {m,} 表示至少出现m次
// {m} 等价于{m,m}，表示出现m次
// ?   等价于{0,1}，表示出现或者不出现
// +   等价于{1, }，表示出现至少一次
// *   等价于{0, }，表现出现任意次，有可能不出现

// 1.3.2 贪婪匹配与惰性匹配
// 贪婪匹配：它会尽可能多的匹配。你能给我 6 个，我就要 5 个。你能给我 3 个，我就要 3 个。反正只要在能力范围内，越多越好。
var regex = /\d{2,5}/g // 表示数字连续出现 2 到 5 次。会匹配 2 位、3 位、4 位、5 位连续数字。
var string = "1 12 123 1234 12345 123456";
console.log(string.match(regex));
// => [ '12', '123', '1234', '12345', '12345' ]

var regex = /\d+/g;
var string = "1plus2equal3";
console.log(string.match(regex));
// => [ '1', '2', '3' ]

// 惰性匹配：就是尽可能少的匹配。
var regex = /\d{2,5}?/g; //表示，虽然 2 到 5 次都行，当 2 个就够的时候，就不再往下尝试了。
var string = "123 1234 12345 123456";
console.log(string.match(regex));
// => ["12", "12", "34", "12", "34", "12", "34", "56"]

// 对惰性匹配的记忆方式是：量词后面加个问号，问一问你知足了吗，你很贪婪吗？
// 惰性量词：{m,n}?   {m,}?   ??   +?   *?
// 贪婪量词：{m,n}    {m,}    ?    +    *

// 1.4 多选分支
// 多选分支可以支持多个子模式任选其一
var regex = /good|nice/g;
var string = "good idea, nice try.";
console.log(string.match(regex));
// => ["good", "nice"]
// 但有个事实我们应该注意，比如我用 /good|goodbye/，去匹配 "goodbye" 字符串时，结果是 "good"
var regex = /good|goodbye/g;
var string = "goodbye";
console.log(string.match(regex));
// => ["good"]
// 而把正则改成 /goodbye|good/，结果是：
var regex = /goodbye|good/g;
var string = "goodbye";
console.log(string.match(regex));
// => ["goodbye"]
// 也就是说，分支结构也是惰性的，即当前面的匹配上了，后面的就不再尝试了。

// 案例：匹配16进制颜色值   #ffbbad #Fc01DF #FFF #ffE
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log(string.match(regex));
// => ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]

// 案例：匹配时间   23:59 01:07   共 4 位数字，第一位数字可以为 [0-2]。当第 1 位为 "2" 时，第 2 位可以为 [0-3]，其他情况时，第 2 位为 [0-9]。第 3 位数字为 [0-5]，第4位为 [0-9]。
var regex = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;
console.log(regex.test("23:59")); // => true
console.log(regex.test("02:07")); // => true
// 如果也要求匹配 "7:9"，也就是说时分前面的 "0" 可以省略。此时正则变成：
var regex = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;
console.log(regex.test("23:59")); // => true
console.log(regex.test("02:07")); // => true
console.log(regex.test("7:9")); // => true

// 案例：匹配日期   以yyyy-mm-dd为例  2017-06-10
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
console.log(regex.test('2017-06-10')); // => true
console.log(regex.test('2017-06-09')); // => true

// 案列：window操作系统文件路径
var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
console.log(regex.test("F:\\study\\javascript\\regex\\regular expression.pdf")); // => true
console.log(regex.test("F:\\study\\javascript\\regex\\")); // => true
console.log(regex.test("F:\\study\\javascript")); // => true
console.log(regex.test("F:\\")); // => true

// 案列：匹配id 从<div id="container" class="main"></div>中提取到id="container"
var regex = /id=".*"/
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]); // => id="container" class="main"
// 因为 . 是通配符，本身就匹配双引号的，而量词 * 又是贪婪的，当遇到 container 后面双引号时，是不会停下来，会继续匹配，直到遇到最后一个双引号为止。
// 解决之道，可以使用惰性匹配：
var regex = /id=".*?"/
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]); // => id="container"
// 当然，这样也会有个问题。效率比较低，因为其匹配原理会涉及到“回溯”这个概念
var regex = /id="[^"]*"/
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]); // => id="container"