//=====================================================//
//=====================================================//
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
//=====================================================//
/**
 * Destructuring
 * - Destructuring là hành động phân rã object thành các
 * biến. Mục đích của nó là làm cho code ngắn gọn hơn
 */
const { name: modelName, wheels, ...otherProperties } = car;
const pCar = JSON.stringify(otherProperties);
console.log(`name: ${modelName}\nwheels: ${wheels}\notherProperties: ${pCar}`);
/*
name: VF 8
wheels: 4
otherProperties: {"color":"black","good":true}
*/

//=====================================================//
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
//=====================================================//
/**
 * Default, rest, spread
 * - Default là để chỉ giá trị mặc định của tham số trong hàm
 * - Rest là hành động gom các tham số còn lại của hàm thành một mảng
 * - Spread là hành động truyền mảng vào hàm dưới dạng nhiều tham số
 */
const defaultRectangle = new Rectangle(0, 0);
function addRectangle(
	rect1,
	rect2 = defaultRectangle //Đặt giá trị mặc định của tham số
) {
	return new Rectangle(
		rect1.width + rect2.width,
		rect1.height + rect2.height
	);
}
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
new Promise(checkStatus)
	.then(afterCheckStatusSuccessful)
	.then(afterGetAPIData)
	.catch(afterCheckStatusRejected);
/**
 * Luồng đi:
 * checkStatus()--fulfilled-->afterCheckStatusSuccessful()--fulfilled-->afterGetAPIData()
 *      |                                            |
 *      |                                            |
 *      rejected-->afterCheckStatusRejected()<--rejected
 */

//=====================================================//
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
