import { localAxios } from "@/util/http-commons";

const local = localAxios();

local.interceptors.request.use(
	function (config) {
		if (sessionStorage.getItem("accessToken")) {
			config.headers.Authorization = `Bearer ${sessionStorage.getItem(
				"accessToken"
			)}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

const url = "/chats";

export async function createChat(param, success, fail) {
	await local
		.post(`${url}/create/`, JSON.stringify(param))
		.then(success)
		.catch(fail);
}

export async function joinChat(id, success, fail) {
	await local.post(`${url}/${id}/join/`).then(success).catch(fail);
}

export async function moreChat(id, timestamp, success, fail) {
	await local
		.get(`${url}/${id}/more/?key=${timestamp}`)
		.then(success)
		.catch(fail);
}

export async function getList(success, fail) {
	await local.get(`${url}/`).then(success).catch(fail);
}

export async function getDetail(id, success, fail) {
	await local.get(`${url}/${id}/`).then(success).catch(fail);
}

export async function getUser(id, success, fail) {
	await local.get(`${url}/${id}/members/`).then(success).catch(fail);
}
