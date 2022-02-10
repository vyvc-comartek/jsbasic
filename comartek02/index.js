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

console.log(this); //Object[global] - Nếu chạy bằng node; Window {...} - Nếu chạy bằng trình duyệt
var test = 'am I in this object?';
console.log(this); //Object[global] - Nếu chạy bằng node; Window {test: "am I in this object?", ...} - Nếu chạy bằng trình duyệt
function whatIsThis() {
	var test = 'am I in this of function?';
	console.log(this.test); //undefined - Nếu chạy bằng node, "am I in this object?" - Nếu chạy bằng trình duyệt
	console.log(test); //"am I in this of function?"
}
whatIsThis();
/**
 * Phân tích ví dụ trên:
 * - Khi chạy bằng node, console.log(this); ở global sẽ trả về Object[global]
 * do đó khi gọi whatIsThis(); ta cố tình truy cập thuộc tính test của một Object[global]
 * nên kết quả là undefined
 * - Khi chạy bằng trình duyệt, console.log(this); ở global sẽ trả về Window {...}
 * khai báo biến var test đồng nghĩa với việc thêm thuộc tính test trong Window {...}
 * do đó khi gọi whatIsThis(); ta truy cập vào thuộc tính test trong Window {...}
 */

const object1 = {
	test: 'hello',
	callMe: whatIsThis,
};
object1.callMe(); //hello
/**
 * Phân tích ví dụ trên:
 * Hàm callMe: whatIsThis nằm trong object1, nên khi gọi callMe, từ khóa "this" sẽ
 * đại diện cho object1 và truy cập vào thuộc tính test
 */

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
