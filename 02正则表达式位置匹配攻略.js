// 2.1 什么是位置？
// 位置（锚）是相邻字符之间的位置。

// 2.2 如何匹配位置？
// 在ES5中，共有6个锚：^  $  \b   \B   (?=p)  (?!p)

// 2.2.1 ^ 和 $
// ^（脱字符）匹配开头，在多行匹配中匹配行开头。 $（美元符号）匹配结尾，在多行匹配中匹配行结尾。
var result = "hello".replace(/^|$/g, '#');
var res = "hello".match(/^|$/g);
console.log(result); // => "#hello#"
console.log(res); // => [ '', '' ]

var result = "I\nlove\njavascript".replace(/^|$/g, '#');
console.log(result);
/*
#I
love
javascript#
*/
// 多行匹配模式（即有修饰符 m）时，二者是行的概念，这一点需要我们注意：
var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
console.log(result);
/*
#I#
#love#
#javascript#
*/

// 2.2.2  \b 和 \B
// \b 是单词边界，具体就是 \w 与 \W 之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 $ 之间的位置。
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result); // => "[#JS#] #Lesson_01#.#mp4#"

// \B 就是 \b 的反面的意思，非单词边界。例如在字符串中所有位置中，扣掉 \b，剩下的都是 \B 的。
// 具体说来就是 \w 与 \w、 \W 与 \W、^ 与 \W，\W 与 $ 之间的位置。
var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
console.log(result); // => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"

// 2.2.3  (?=p) 和 (?!p)
// (?=p)，其中 p 是一个子模式，即 p 前面的位置，或者说，该位置后面的字符要匹配 p。
var result = "hello".replace(/(?=l)/g, '#');
console.log(result); // => "he#l#lo"

// 而 (?!p) 就是 (?=p) 的反面意思，比如：
var result = "hello".replace(/(?!l)/g, '#');
console.log(result); // => "#h#ell#o#"

// 2.3. 位置的特性
// 对于位置的理解，我们可以理解成空字符 ""。
// 比如 "hello" 字符串等价于如下的形式："hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + "";
// 也等价于："hello" == "" + "" + "hello"
// 因此，把 /^hello$/ 写成 /^^hello$$$/，是没有任何问题的：
var result = /^^hello$$$/.test("hello");
console.log(result); // => true
// 甚至可以写成更复杂的:
var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result); // => true

// 2.4 相关案例
// 2.4.1 不匹配任何东西的正则
var regex = /.^/; // 此正则要求只有一个字符，但该字符后面是开头，而这样的字符串是不存在的。
var result = regex.test("1");
console.log(result); // => false

// 2.4.2 数字的千位分隔符表示法
// 2.4.2.1. 弄出最后一个逗号
var result = "12345678".replace(/(?=\d{3}$)/g, ',')
console.log(result); // => "12345,678"
// 2.4.2.2. 弄出所有的逗号
var result = "12345678".replace(/(?=(\d{3})+$)/g, ',')
console.log(result); // => "12,345,678"
// 2.4.2.3. 匹配其余案例
// 写完正则后，要多验证几个案例，此时我们会发现问题：
var result = "123456789".replace(/(?=(\d{3})+$)/g, ',')
console.log(result); // => ",123,456,789"
// 因为上面的正则，仅仅表示把从结尾向前数，一但是 3 的倍数，就把其前面的位置替换成逗号。
// 因此才会出现这个问题。怎么解决呢？我们要求匹配的到这个位置不能是开头。
var regex = /(?!^)(?=(\d{3})+$)/g;
var result = "12345678".replace(regex, ',')
console.log(result); // => "12,345,678"
result = "123456789".replace(regex, ',');
console.log(result); // => "123,456,789"

// 2.4.2.4. 支持其他形式
// 如果要把 "12345678 123456789" 替换成 "12,345,678 123,456,789"。
// 此时我们需要修改正则，把里面的开头 ^ 和结尾 $，修改成 \b：
var string = "12345678 123456789",
    regex = /(?!\b)(?=(\d{3})+\b)/g;
var result = string.replace(regex, ',')
console.log(result); // => "12,345,678 123,456,789"
// 其实 (?!\b) 说的就是 \B。var string = "12345678 123456789",
var regex = /\B(?=(\d{3})+\b)/g;
var result = string.replace(regex, ',')
console.log(result); // => "12,345,678 123,456,789"

// 2.4.2.5. 格式化
// 千分符表示法一个常见的应用就是货币格式化。
function format(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, "$ ");
};
console.log(format(1888)); // => "$ 1,888.00"

// 2.4.3 验证密码问题
// 同时包含数字和小写字母，可以用 (?=.*[0-9])(?=.*[a-z]) 来做。
var regex = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/;
// 同时包含数字和小写字母 
// 同时包含数字和大写字母 
// 同时包含小写字母和大写字母 
// 同时包含数字、小写字母和大写字母
var regex = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[AZ]))^[0-9A-Za-z]{6,12}$/;
console.log(regex.test("1234567")); // false 全是数字
console.log(regex.test("abcdef")); // false 全是小写字母
console.log(regex.test("ABCDEFGH")); // false 全是大写字母
console.log(regex.test("ab23C")); // false 不足6位
console.log(regex.test("ABCDEF234")); // true 大写字母和数字
console.log(regex.test("abcdEF234")); // true 三者都有

// 另一种解法：
// “至少包含两种字符”的意思就是说，不能全部都是数字，也不能全部都是小写字母，也不能全部都是大写字母。
var regex = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;
console.log(regex.test("1234567")); // false 全是数字
console.log(regex.test("abcdef")); // false 全是小写字母
console.log(regex.test("ABCDEFGH")); // false 全是大写字母
console.log(regex.test("ab23C")); // false 不足6位
console.log(regex.test("ABCDEF234")); // true 大写字母和数字
console.log(regex.test("abcdEF234")); // true 三者都有