import { localAxios } from "@/util/http-commons";

const local = localAxios();

const url = "/members";

export async function signup(param, success, fail) {
	// console.log(param);
	await local
		.post(`${url}/signup/`, JSON.stringify(param))
		.then(success)
		.catch(fail);
}

export function login(param, success, fail) {
	local.post(`${url}/signin/`, JSON.stringify(param)).then(success).catch(fail);
}

export function logout(param, success, fail) {
	local.post(`${url}/logout/`, JSON.stringify(param)).then(success).catch(fail);
}

export function tokenRegeneration(param, success, fail) {
	local
		.post(`${url}/refresh/`, JSON.stringify(param))
		.then(success)
		.catch(fail);
}
