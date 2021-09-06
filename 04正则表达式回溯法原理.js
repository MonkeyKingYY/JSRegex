// 4.1. 没有回溯的匹配
var regex = /ab{1,3}c/;
// 而当目标字符串是 "abbbc" 时，就没有所谓的“回溯”。
var string = 'abbbc';
console.log(string.match(regex));
// => [ 'abbbc', index: 0, input: 'abbbc', groups: undefined ]

// 4.2 有回溯的匹配
var regex = /ab{1,3}c/;
var string = 'abbc';
console.log(string.match(regex));
// => [ 'abbc', index: 0, input: 'abbc', groups: undefined ]

var regex = /ab{1,3}bbc/;
var string = 'abbbc';
console.log(string.match(regex));

var regex = /".*"/; //  .* 是非常影响效率的。
var string = "'abc'de";
console.log(regex.test(string));

var regex = /"[^"]*"/;
var string = "abcde";
console.log(regex.test(string));

// 4.3 常见的回溯形式
// 正则表达式匹配字符串的这种方式，有个学名，叫回溯法
/*
回溯法也称试探法，它的基本思想是：从问题的某一种状态（初始状态）出发，搜索从这种状态出发
所能达到的所有“状态”，当一条路走到“尽头”的时候（不能再前进），再后退一步或若干步，从
另一种可能“状态”出发，继续搜索，直到所有的“路径”（状态）都试探过。这种不断“前进”、 不断“回溯”寻找解的方法，就称作“回溯法”。

本质上就是深度优先搜索算法。其中退到之前的某一步这一过程，我们称为“回溯”。从上面的描述过程中
，可以看出，路走不通时，就会发生“回溯”。即，尝试匹配失败时，接下来的一步通常就是回溯。
*/

// 4.3.1 贪婪量词
var string = "12345";
var regex = /(\d{1,3})(\d{1,3})/;
console.log(string.match(regex));
// => ["12345", "123", "45", index: 0, input: "12345"]
// 其中，前面的 \d{1,3} 匹配的是 "123"，后面的 \d{1,3} 匹配的是 "45"。

// 4.3.2 惰性量词
var string = "12345";
var regex = /(\d{1,3}?)(\d{1,3})/;
console.log(string.match(regex));
// => ["1234", "1", "234", index: 0, input: "12345"]
// 其中 \d{1,3}? 只匹配到一个字符 "1"，而后面的 \d{1,3} 匹配了 "234"。
// 虽然惰性量词不贪，但也会有回溯的现象。比如正则是：
var string = "12345";
var regex = /^\d{1,3}?\d{1,3}$/;
console.log(string.match(regex));
// => [ '12345', index: 0, input: '12345', groups: undefined ]
// 知道你不贪、很知足，但是为了整体匹配成，没办法，也只能给你多塞点了。因此最后 \d{1,3}? 匹配的字 符是 "12"，是两个数字，而不是一个。

// 4.3.3 分支结构
// 我们知道分支也是惰性的，比如 /can|candy/，去匹配字符串 "candy"，得到的结果是 "can"，因为分支会一个一个尝试，如果前面的满足了，后面就不会再试验了。
// 分支结构，可能前面的子模式会形成了局部匹配，如果接下来表达式整体不匹配时，仍会继续尝试剩下的分支。这种尝试也可以看成一种回溯。