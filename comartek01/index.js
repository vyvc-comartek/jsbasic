//=====================================================================//
/**
 * Tại sao cần Floating point?
 * - Do bộ nhớ máy tính là có hạn, ta không thể lưu con số với độ chính xác tuyệt đối.
 * - Tùy từng trường hợp, chip sẽ được thiết kế để tính toán với độ chính xác khác nhau
 * - Có thể sử dụng các thư viện bigjs, decimaljs, numeraljs, ... để có được kết quả
 * chính xác, tuy nhiên sẽ làm giảm hiệu suất của ứng dụng
 */
console.log(1.2 + 2.2); //3.4000000000000004 (Kết quả mong đợi: 3.4)
console.log(3.6 * 1.3); //4.680000000000001 (Kết quả mong đợi: 4.68)
console.log(6.6 / 3); //2.1999999999999997 (Kết quả mong đợi: 2.2)
/**
 * Trường hợp phép giao hoán cho kết quả khác nhau do lỗi Floating point
 */
const a = 43.57;
const b = 5.33;
const c = 3.05;
console.log(a + b + c); //51.949999999999996 (Kết quả mong đợi: 51.95)
console.log(c + b + a); //51.95 (Kết quả mong đợi: 51.95)
/**
 * Hàm xử lý ngoại lệ Floating point
 * @param number - Số bị lỗi do ngoại lệ Floating point
 * @return - Số đã được sửa ngoại lệ Floating point
 */
function strip(number) {
	return parseFloat(number).toPrecision(12);
}
console.log(strip(1.2 + 2.2));

//=====================================================================//
/**
 * So sánh null và undefined
 * - null là đối tượng, biến null có thể hiểu là nó đã tồn tại nhưng không có giá trị nào cả
 * - undefined là một kiểu trong JS, biến undefined có thể hiểu là nó không tồn tại
 * - undefined là giá trị mặc định được trả về khi truy cập một biến không tồn tại
 */
console.log(typeof null); //object
console.log(typeof undefined); //undefined
console.log(!null); //true
console.log(!undefined); //true
console.log(null + 1); //1
console.log(undefined + 1); //NaN

//=====================================================================//
/**
 * So sánh == và ===
 * - 2 dấu bằng "==" : Chuyển đổi về cùng kiểu để so sánh
 * - 3 dấu bằng "===" : So sánh cả kiểu dữ liệu và giá trị
 */
const emptyObject1 = {};
const emptyObject2 = {};
const comparationNum1 = 3;
const comparationNum2 = 3;
const comparationString = '3';
/**
 * Mặc dù null khi chuyển number sẽ là 0 và undefined chuyển thành number sẽ là NaN
 * Tuy nhiên chúng đều là false khi chuyển sang boolean, nên khi sử dụng ==, kết quả
 * vẫn là true
 */
console.log(null == undefined); //true
/**
 * Khi so sánh 2 object, JS sẽ thực hiện so sánh địa chỉ ô nhớ của chúng trước
 */
console.log(emptyObject1 == emptyObject2); //false
/**
 * Đối với các kiểu nguyên thủy, JS sẽ không so sánh địa chỉ ô nhớ
 */
console.log(JSON.stringify(emptyObject1) === JSON.stringify(emptyObject2)); //true
console.log(comparationNum1 === comparationNum2); //true
console.log(comparationNum1 === comparationString); //false
/**
 * Khi so sánh 2 dấu bằng, JS sẽ cố chuyển đổi 2 vế về cùng kiểu dữ liệu
 */
console.log(comparationNum1 == comparationString); //true
console.log(comparationNum1 === +comparationString); //true

//=====================================================================//
/**
 * So sánh các phương thức làm tròn số
 * - ceil: luôn làm tròn lên
 * - floor: luôn làm tròn xuống
 * - round: làm tròn dựa trên 0.5
 * - trunc: bỏ phần thập phân
 */
console.log(Math.ceil(0.1)); //1
console.log(Math.ceil(0.8)); //1
console.log(Math.ceil(-0.1)); //-0
console.log(Math.ceil(-0.8)); //-0

console.log(Math.floor(0.1)); //0
console.log(Math.floor(0.8)); //0
console.log(Math.floor(-0.1)); //-1
console.log(Math.floor(-0.8)); //-1

console.log(Math.round(0.1)); //0
console.log(Math.round(0.8)); //1
console.log(Math.round(-0.1)); //-0
console.log(Math.round(-0.8)); //-1

console.log(Math.trunc(0.1)); //0
console.log(Math.trunc(0.8)); //0
console.log(Math.trunc(-0.1)); //-0
console.log(Math.trunc(-0.8)); //-0

//=====================================================================//
/**
 * So sánh tốc độ các vòng lặp
 * - Vòng lặp For thông thường là nhanh nhất do số lần lặp được cung cấp từ trước
và không cần phải tiền xử lý trước khi lặp như vòng lặp forEach, forin hay forof
 */
/**
 * Hàm tính toán thời gian thực thi
 * @param title - Tiêu đề in ra trước khi thực hiện callback
 * @param callback - Callback cần tính toán thời gian thực thi
 * @return - Thời gian cần để thực thi callback
 */
function getExecutionTime(title, callback) {
	console.info(title);
	const start = Date.now();
	callback();
	const end = Date.now();
	return end - start;
}
/**
 * Các biến dùng chung cho các test case
 */
const n = 300000;
const arr = Array.from({ length: n }, (_, i) => i + 1);
let sum, j;

/**
 * Các hàm test case
 */
function testNormalFor() {
	sum = 0;
	for (let i = 0; i < n; i++) {
		sum += arr[i];
	}
}
function testForin() {
	sum = 0;
	for (i in arr) {
		sum += arr[i];
	}
}
function testForof() {
	sum = 0;
	for (i of arr) {
		sum += i;
	}
}

function testForeach() {
	sum = 0;
	arr.forEach((v) => (sum += v));
}

function testWhileloop() {
	sum = 0;
	j = 0;
	while (j < n) {
		sum += arr[j++];
	}
}
function testDoWhile() {
	sum = 0;
	j = 0;
	do {
		sum += arr[j++];
	} while (j < n);
}

console.log(getExecutionTime('Normal for caculating...', testNormalFor));
console.log(getExecutionTime('For in caculating...', testForin));
console.log(getExecutionTime('For of caculating...', testForof));
console.log(getExecutionTime('For each caculating...', testForeach));
console.log(getExecutionTime('While loop caculating...', testWhileloop));
console.log(getExecutionTime('Do while loop caculating...', testDoWhile));

//=====================================================================//
/**
 * So sánh typeof và instanceof
 * - Giá trị trả về của typeof là chuỗi, giá trị trả về của instanceof là boolean
 * - typeof được dùng khi ta muốn biết tên kiểu dữ liệu của biến
 * - instanceof được dùng khi ta muốn biết biến có phải là thực thể của đối tượng hay không
 */
console.log(typeof 3); //number
console.log(typeof '3'); //string
console.log(3 instanceof Number); //false
console.log([] instanceof Array); //true
console.log(null instanceof Object); //false
console.log(typeof null); //object
//console.log(undefined instanceof undefined); //Lỗi. Vế phải phải là một đối tượng

//=====================================================================//
/**
 * So sánh var, let và const
 * - var là localscope, nghĩa là biến có thể được truy cập từ nơi khai báo nó
 * và từ các blockscope con (xem ví dụ để hiểu)
 * - var có tính chất hoisting, có nghĩa là ta có thể sử dụng biến trước khi khai báo
 * - var có thể được khai báo lại trong cùng scope
 * - let là blockscope
 * - let có thể được cập nhật nhưng không thể khai báo lại trong cùng scope
 * - const giống let nhưng không thể cập nhật
 */

/**
 * - Sử dụng var sẽ khiến code khó đọc do nó có thể được khai báo lại.
 * var khiến chương trình dễ xảy ra lỗi hơn do nó là localscope
 * - Sử dụng let mặc dù tốt hơn var nhưng đôi khi cũng khiến chương trình xảy ra lỗi
 * do nó là blockscope, nó vẫn có thể được sửa đổi trong functionscope
 * - Sử dụng const mặc dù tránh được việc bị sửa đổi, nhưng
 */

if (true) {
	if (true) {
		//Blockscope, ở đây có thể truy cập các biến global
		var variable1 = 'localscope';
	}
}
//Globalscope, ở đây có thể truy cập các biến var trong blockscope con
console.log(variable1); //localscope
function functionScope() {
	//Functionscope, ở đây có thể truy cập các biến global
	var variable2 = 'functionScope';
}
//Globalscope, ở đây không thể truy cập các biến var trong functionscope
//console.log(variable2); //Lỗi: variable2 is not defined

//=====================================================================//
/**
 * So sánh tham chiếu và tham trị
 * Tham chiếu: 2 đối tượng cùng chiếu đến một ô nhớ
 * Tham trị: 2 biến khác ô nhớ nhưng giá trị giống nhau
 */
//Tham chiếu
const object1 = {};
const object2 = object1;
object2.data = 'data';
console.log(object1); //{ data: 'data' }
console.log(object2); //{ data: 'data' }
//Tham trị
const num1 = 1;
let num2 = num1;
num2++;
console.log(num1);
console.log(num2);

class User {
	constructor(name, emails, favorites) {
		this.name = name;
		this.emails = emails;
		this.favorites = favorites;
		this.friendRequests = [];
	}
	/**
	 * Thêm sở thích
	 * @param favorite - Sở thích cần thêm
	 */
	addFavorite(favorite) {
		this.favorites.push(favorite);
	}
	/**
	 * Xóa sở thích
	 * @param favorite - Sở thích cần xóa
	 */
	removeFavorite(favorite) {
		const rmIndex = this.favorites.indexOf(favorite);
		this.favorites.splice(rmIndex, 1);
	}
}
const user1 = new User(
	'Andrew',
	['andrew@email.vn'],
	['football', 'music', 'games']
);
const user2 = new User(
	'Anna',
	['anna09091999@email.vn'],
	['travel', 'shopping']
);
const users = [user1, user2];

//Tham trị
//{"emails":["andrew@email.vn"],"favorites":["football","music","games"]}
users[0].removeFavorite('music');
users[0].emails[1] = 'drw@email.com';
console.log(users);
//{"emails":["andrew@email.vn","drw@email.com"],"favorites":["football","games"]}

//Tham chiếu
console.log(JSON.stringify(users[1]));
//{"friendRequests":[]}
users[1].friendRequests[0] = users[0]; //Thêm user0 vào danh sách friendRequest của user1
users[0].favorites[1] = 'swim'; //Sửa favorite của user0
console.log(JSON.stringify(users[1])); //Ở user1, trong danh sách friendRequest, user0 bị thay đổi
//{ "friendRequests":[ { "favorites":["football","swim"] } ] }
