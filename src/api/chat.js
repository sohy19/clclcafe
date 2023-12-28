import { localAxios } from "@/util/http-commons";
import { useMemberStore } from "@/stores/member";
import { httpStatusCode } from "@/util/http-status";
import { storeToRefs } from "pinia";
import axios from "axios";

const memberStore = useMemberStore();
const { isValidToken } = storeToRefs(memberStore);
const { tokenRegenerate } = memberStore;

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

local.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response.status === httpStatusCode.UNAUTHORIZED) {
			tokenRegenerate();
			error.config.headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
			};
			const response = await axios.request(error.config);
			return response;
		}
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

export async function deleteChat(id, success, fail) {
	await local.delete(`${url}/${id}/delete/`).then(success).catch(fail);
}
