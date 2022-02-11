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
console.log(num1); //1
console.log(num2); //2

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
console.log(JSON.stringify(users[1])); //Trước khi sửa users[1] {"friendRequests":[]}

users[1].friendRequests[0] = users[0]; //Thêm user0 vào danh sách friendRequest của user1
users[0].favorites[1] = 'swim'; //Sửa favorite của user0

console.log(JSON.stringify(users[1])); //Ở user1, trong danh sách friendRequest, user0 bị thay đổi
//{ "friendRequests":[ { "favorites":["football","swim"] } ] }

//=====================================================================//

/**
 * Các toán tử Bitwise
 * JS sử dụng các số 32 bits
 */
//Toán tử AND
console.log(5 & 1); //= 00000000000000000000000000000101 AND 00000000000000000000000000000001 = 1
//Toán tử OR
console.log(5 | 1); //= 00000000000000000000000000000101 OR 00000000000000000000000000000001 = 101 = 5
//Toán tử NOT
console.log(~5); //= NOT 00000000000000000000000000000101 = 11111111111111111111111111111010 = -6
//Toán tử XOR
console.log(5 ^ 1); //= 00000000000000000000000000000101 XOR 00000000000000000000000000000001 = 010 = 4
//Toán tử dịch trái mất dữ liệu
console.log(5 << 1); //= 00000000000000000000000000000101 << 1 = 1010 = 10
//Toán tử dịch phải mất dữ liệu
console.log(5 >> 1); //= 00000000000000000000000000000101 >> 1 = 0010 = 2
//Toán tử dịch phải KHÔNG mất dữ liệu
console.log(5 >>> 1); //= 00000000000000000000000000000101 >>> 1 = 10000000000000000000000000000010 = 2

//Hàm chuyển đổi decimal thành binary (dạng chuỗi)
function dec2bin(dec) {
	return (dec >>> 0).toString(2);
}
//Hàm chuyển đổi binary thành decimal (dạng chuỗi)
function bin2dec(bin) {
	return parseInt(bin, 2).toString(10);
}

console.log(dec2bin(10)); //1010
console.log(bin2dec(10)); //2

//=====================================================================//

/** OOP ES5 */

function Vehicle(name, color, speed) {
	this.name = name;
	this.color = color;
	this.speed = speed;
}

//Sử dụng prototype để thêm thuộc tính
Vehicle.prototype.run = function () {
	console.log(`running ${this.speed} km/h!`);
};

//Tính kế thừa
function Car(name, color, speed, numberOfWheels) {
	//Gọi hàm khởi tạo của lớp cha
	Vehicle.call(this, name, color, speed);
	this.numberOfWheels = numberOfWheels;
}

//Kế thừa prototype của lớp cha
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

const vinfast = new Car('VF 8', 'white', 100, 4);
console.log(vinfast); //Car { name: 'VF 8', color: 'white', speed: 100, numberOfWheels: 4 }
console.log(typeof vinfast); //object
console.log(vinfast instanceof Car); //true
console.log(vinfast instanceof Vehicle); //true
vinfast.run(); //running 100km/h!

//=====================================================================//

/**
 * Từ khóa this là gì?
 * Từ khóa "this" được sử dụng để đại diện cho đối tượng chứa scope, nơi this được sử dụng
 */

/**
 * - Khi chạy bằng node, console.log(this); ở global sẽ trả về Object[global]
 * do đó khi gọi whatIsThis(); ta cố tình truy cập thuộc tính test của một Object[global]
 * nên kết quả là undefined
 * - Khi chạy bằng trình duyệt, console.log(this); ở global sẽ trả về Window {...}
 * khai báo biến var test đồng nghĩa với việc thêm thuộc tính test trong Window {...}
 * do đó khi gọi whatIsThis(); ta truy cập vào thuộc tính test trong Window {...}
 */
console.log(this); //Object[global] - Nếu chạy bằng node; Window {...} - Nếu chạy bằng trình duyệt

var test = 'am I in this object?';

console.log(this); //Object[global] - Nếu chạy bằng node; Window {test: "am I in this object?", ...} - Nếu chạy bằng trình duyệt

function whatIsThis() {
	var test = 'am I in this of function?';
	console.log(this.test); //undefined - Nếu chạy bằng node, "am I in this object?" - Nếu chạy bằng trình duyệt
	console.log(test); //"am I in this of function?"
}

whatIsThis();

const object1 = {
	test: 'hello',
	//khi gọi callMe, từ khóa "this" sẽ đại diện cho object1 và truy cập vào thuộc tính test
	callMe: whatIsThis,
};

object1.callMe(); //hello

//=====================================================================//

/**
 * Các phương thức bind, call, apply
 */

/**
 * Bind được dùng để xác định từ khóa this cho function
 */
const runVinfast = vinfast.run;
//Do runVinfast không hề chứa thuộc tính speed nên kết quả là undefined
runVinfast(); //"running undefined km/h!"

const boundRunVinfast = runVinfast.bind(vinfast);
boundRunVinfast(); //"running 100 km/h!"

/**
 * call được dùng để xác định từ khóa this trong khi function được thực thi
 * các đối số tiếp theo được truyền lần lượt
 * Ví dụ về call đã được nêu ra trong phần triển khai tính kế thừa bên trên
 */

/**
 * apply được dùng để xác định từ khóa this trong khi function được thực thi
 * giống với call nhưng các đối số tiếp theo được gom thành 1 mảng
 */

//=====================================================================//

/**
 * let, const
 * - let là blockscope, nghĩa là biến let có thể truy
 * cập bên trong các blockcode con. let cho phép ta
 * cập nhật giá trị của biến
 * - const giống như let nhưng không cho phép cập nhật
 * giá trị của biến
 */
let a = 1;
const b = 'hi';
function printGlobalVariable() {
	//Tại đây là blockcode con của globalscope
	a = 2;
	//b=5; Error
	console.log(a, b);
}

printGlobalVariable(); //2 hi

//=====================================================//

/**
 * Arrow function, template string
 * - Arrow function là một cách viết ngắn gọn để tạo một
 * function
 * - Template string là chuỗi cho phép nhúng các thành phần
 * khác(biến, kết quả của một hàm, ...) vào nó
 */
const afSayHello = (name) => {
	console.log(`Hi, ${name}!`);
};

afSayHello('ES6'); //Hi, ES6!

//=====================================================//

/**
 * Enhanced object literals
 * - Enhanced object literals là một tính năng giúp tạo
 * object một cách dễ dàng và nhanh chóng
 */

function getCar(name, color, wheels, isDamaged) {
	return {
		//Tên biến chuyển thành key
		//Giá trị của biến là value
		name,
		color,
		wheels,
		//Lược bỏ từ khóa function
		run() {
			console.log(
				this.damaged && !this.good
					? `${this.name} is damaged`
					: `${this.name} is running...`
			);
		},
		//Giá trị của key là động
		[isDamaged ? 'damaged' : 'good']: true,
	};
}

const car = getCar('VF 8', 'black', 4, true);
console.log(car);
//{ name: 'VF 8', color: 'black', wheels: 4, run: [Function: run], damaged: true }

car.run(); //VF 8 is damaged

delete car.damaged;
car.good = true;

car.run(); //VF 8 is running...

//=====================================================//

/**
 * Destructuring
 * - Destructuring là hành động phân rã object thành các
 * biến. Mục đích của nó là làm cho code ngắn gọn hơn
 */

const { name: modelName, wheels, ...otherProperties } = car;
const pCar = JSON.stringify(otherProperties);

/*
 name: VF 8
 wheels: 4
 otherProperties: {"color":"black","good":true}
 */
console.log(`name: ${modelName}\nwheels: ${wheels}\notherProperties: ${pCar}`);

//=====================================================//

/**
 * Class
 * - class là từ khóa giúp tạo một lớp trong ES6, nó được
 * sinh ra nhằm tránh việc tạo một class bằng từ khóa
 * function trong ES5
 */

class Geo {
	constructor() {
		this.name = 'geometry';
	}
}

class Rectangle extends Geo {
	constructor(width, height) {
		//Gọi constructor của lớp cha
		super();
		this.width = width;
		this.height = height;
	}
	get area() {
		return this.calcArea();
	}
	calcArea() {
		return this.width * this.height;
	}
}

const rec = new Rectangle(10, 5);
console.log(Rectangle.name); //Rectangle
console.log(rec); //Rectangle { width: 10, height: 5 }
console.log(rec.area); //50

//=====================================================//

/**
 * Default, rest, spread
 * - Default là để chỉ giá trị mặc định của tham số trong hàm
 * - Rest là hành động gom các tham số còn lại của hàm thành một mảng
 * - Spread là hành động truyền mảng vào hàm dưới dạng nhiều tham số
 */

const defaultRectangle = new Rectangle(0, 0);
//Hàm cộng 2 hình chữ nhật
function addRectangle(
	rect1,
	rect2 = defaultRectangle //Đặt giá trị mặc định của tham số
) {
	return new Rectangle(
		rect1.width + rect2.width,
		rect1.height + rect2.height
	);
}
//Hàm cộng n hình chữ nhật
function addRectangles(
	...rectangles //Gom các tham số còn lại thành một mảng
) {
	let width = 0;
	let height = 0;
	for (let i = rectangles.length - 1; i >= 0; i--) {
		width += rectangles[i].width;
		height += rectangles[i].height;
	}
	return new Rectangle(width, height);
}
const rect1 = new Rectangle(10, 10);
const rect2 = new Rectangle(5, 5);
const rect3 = new Rectangle(15, 5);
const rects = [rect1, rect2, rect3];

//Bỏ qua tham số thứ 2 để dùng giá trị mặc định
console.log(addRectangle(rect1)); //Rectangle { width: 10, height: 10 }
//Truyền rects dưới dạng nhiều tham số
console.log(addRectangles(...rects)); //Rectangle { width: 30, height: 20 }

//=====================================================//

/**
 * Promise
 * - Promise là một proxy. Một hành động bất đồng bộ sẽ trả về một Promise
 * để cung cấp kết quả của hành động đó trong tương lai
 * - Promise có 3 trạng thái:
 *  + Pending: Đang thực thi
 *  + Fulfilled: Thực thi thành công
 *  + Rejected: Thực thi thất bại
 */

function checkStatus(resolve, reject) {
	console.info('Pending...');
	//Tạo hành động bất đồng bộ
	const checkStatus = () => {
		//Ngẫu nhiên resolve hoặc reject
		Math.round(Math.random())
			? resolve('Server is up')
			: reject('Server is down');
	};
	setTimeout(checkStatus, 3000);
}
//Thực hiện lấy dữ liệu nếu checkStatus() resolve
function afterCheckStatusSuccessful(status) {
	console.info('Fulfilled[checkStatus]: ' + status); //Fulfilled[checkStatus]: Server is up
	function getAPIData(resolve) {
		//Từ khóa void được dùng để tránh việc trả về kết quả của resolve()
		setTimeout(() => void resolve({ data: 'data' }), 3000);
	}
	//getAPIData() phải được thực thi xong mới chuyển xuống then() tiếp theo hoặc catch()
	return new Promise(getAPIData);
}
//Thực hiện log dữ liệu nếu afterCheckStatusSuccessful() resolve
function afterGetAPIData(data) {
	console.info('Fulfilled[checkStatus]: ' + JSON.stringify(data)); //Fulfilled[checkStatus]: {"data":"data"}
}
function afterCheckStatusRejected(error) {
	console.error(error); //'Server is down'
}

/**
 * Luồng đi:
 * checkStatus()--fulfilled-->afterCheckStatusSuccessful()--fulfilled-->afterGetAPIData()
 *      |                                            |
 *      |                                            |
 *      rejected-->afterCheckStatusRejected()<--rejected
 */
new Promise(checkStatus)
	.then(afterCheckStatusSuccessful)
	.then(afterGetAPIData)
	.catch(afterCheckStatusRejected);

//=====================================================//

/**
 * Promise methods
 * - Promise.all(promises): Thực hiện đồng thời các Promise,
 * trả về một Promise mới, resolve khi tất cả Promise resolve,
 * reject khi có bất kỳ một Promise nào đó reject
 */
function consoleLogResults(results) {
	console.log(results);
}
const promise1 = new Promise((resolve) => {
	setTimeout(() => resolve('promise1'), 2000);
});
const promise2 = 'hello';
const promise3 = Promise.resolve({ data: 'data' });
const promises = [promise1, promise2, promise3];

Promise.all(promises).then(consoleLogResults); //[ 'promise1', 'hello', { data: 'data' } ]

/**
 * Promise methods
 * - Promise.allSettled(promises): Thực hiện đồng thời các Promise,
 * trả về một Promise mới, luôn luôn resolve khi tất cả Promise
 * đã được thực thi xong (Không quan tâm các Promise trong mảng resolve
 * hay reject)
 */
const promise4 = Promise.reject({ error: true });

Promise.allSettled([promise4, ...promises]).then(consoleLogResults); /*
 [
   { status: 'rejected', reason: { error: true } },
   { status: 'fulfilled', value: 'promise1' },
   { status: 'fulfilled', value: 'hello' },
   { status: 'fulfilled', value: { data: 'data' } }
 ]*/

/**
 * Promise methods
 * - Promise.any(promises): Thực hiện đồng thời các Promise,
 * trả về Promise resolve nhanh nhất, hoặc Promise reject nếu
 * toàn bộ Promise bị reject
 */
Promise.any([promise1, promise4, promise3]).then(consoleLogResults); //{ data: 'data' }
//promise4 reject, promise1 và promise3 fulfilled nhưng promise3 fulfilled nhanh nhất

/**
 * Promise methods
 * - Promise.race(promises): Thực hiện đồng thời các Promise,
 * trả về Promise resolve hoặc reject nhanh nhất
 */
Promise.race([promise1, promise4, promise3])
	.then(consoleLogResults)
	.catch(consoleLogResults); //{ error: true }
//thời gian promise4 thực thi tương đương với promise3 nhưng promise4 được lặp qua trước

//=====================================================//

/**
 * Async/await
 * - async/await là các từ khóa được dùng để thay thế
 * cho việc sử dụng Promise, mục đích là để code ngắn
 * gọn, dễ đọc hơn
 */

const axios = require('axios');

//Hàm async luôn trả về một promise
async function getData() {
	console.log('I will show up first');
	const response = await axios.get(
		'https://my-json-server.typicode.com/typicode/demo/posts'
	);
	console.log(JSON.stringify(response.data));
}

getData().catch(consoleLogResults); //[{"id":1,"title":"Post 1"},{"id":2,"title":"Post 2"},{"id":3,"title":"Post 3"}]

//=====================================================//

/**
 * Axios
 * Là thư viện giúp tạo request HTTP
 */

//Tạo config chung cho các request
const client = axios.create({
	//baseURL: 'http://localhost:8008/', - URL cơ sở
	responseType: 'json', //Kiểu dữ liệu trả về
	withCredentials: true, //Sử dụng trường credentials trong HTTP Header
});
//Khi phản hồi thành công
function onResponseSuccessful(response) {
	return response;
}
//Khi phản hồi lỗi
async function onResponseError(err) {
	if (err.response.status === 401) {
		//Nếu xảy ra lỗi 401, chứng tỏ người dùng chưa đăng nhập hoặc token đã hết hạn
		if (localStorage.getItem('isAuth')) {
			//Token hết hạn, cần refresh
			try {
				//Refresh token
				const refreshToken = localStorage.getItem('refreshToken');
				await client('auth/token', { refreshToken });
				//Thực hiện gửi lại request ban đầu
				return client(err.config);
			} catch (err) {}
		}
	}
	//Các lỗi khác thì không xử lý, chuyển tiếp lỗi để xử lý ở nơi khác
	return Promise.reject(err);
}

//Chặn response từ Server
client.interceptors.response.use(onResponseSuccessful, onResponseError);

//=====================================================//

const axios = require('axios');

const axiosConfig = {
	baseURL: 'https://jsonplaceholder.typicode.com/',
	responseType: 'json',
};
const client = axios.create(axiosConfig);

//Hàm chạy hiệu ứng loading
function animate() {
	console.log('Loading...');
}
//Hàm chạy hiệu ứng loaded
function cancelAnimate() {
	console.log('Loaded!');
}
//Hàm tùy chỉnh đầu ra của axios request
function preProcess(axiosRequest, customErrMsg) {
	return axiosRequest
		.then((response) => response.data)
		.catch(() => Promise.reject(customErrMsg));
}
//Hàm call api thực hiện authenticate
function authenticate(userId) {
	return preProcess(client.get('users/' + userId), 'Authenticate failed');
}
//Hàm call api thực hiện lấy các posts của user
function getPosts(userId) {
	return preProcess(client.get('posts?userId=' + userId), 'Get posts failed');
}

/**
 * Thực hiện tuần tự
 * thời gian thực thi = tổng thời gian của từng promise
 * Ví dụ dưới đây không giải quyết được vấn đề animation bị kết thúc trước Promise
 */

function afterAuthFulfilled(userData) {
	//Đã xác thực thành công
	//Thực hiện lấy posts dựa vào user id
	return getPosts(userData.id);
}
function afterGetPostsFulfilled(posts) {
	//Đã get posts thành công
	console.log(posts.length);
}
function afterRejected(err) {
	//Đã xảy ra lỗi
	console.log(err);
}
function finallyRequest() {
	//Hủy animation
	cancelAnimate();
}
//Sử dụng Promise
const userId = 1; //Id người dùng muốn đăng nhập

//Khởi chạy animation
animate();
//Thực hiện xác thực
authenticate(userId)
	.then(afterAuthFulfilled)
	.then(afterGetPostsFulfilled)
	.catch(afterRejected)
	.finally(finallyRequest);

//Sử dụng Async/Await
(async function () {
	try {
		//Khởi chạy animation
		animate();
		//Thực hiện xác thực
		const userData = await authenticate(userId);
		//Thực hiện lấy posts dựa vào user id
		const posts = await getPosts(userData.id);
		console.log(posts.length);
	} catch (err) {
		afterRejected();
	} finally {
		finallyRequest();
	}
})();

/**
 * Thực hiện đồng thời
 * JS cung cấp các phương thức xử lý đồng thời các Promise (all, allSettle, any, race)
 * thời gian thực thi = khoảng thời gian promise thực thi lâu nhất
 * Ví dụ đã được liệt kê trong pull "ES6 Features #3")
 */
