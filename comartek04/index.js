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
