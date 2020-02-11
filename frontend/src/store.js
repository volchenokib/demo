import Vue from 'vue';
import Vuex from 'vuex';
// import demo from '@/api/demo';
import axios from 'axios';
import { baseURL } from '@/api/const';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		data: {
			isLoding: false
		},

		form: {
			isReset: false
		},

		button: {
			isDisable: false
		}
	},

	getters: {
		getDataState(state) {
			return state.data.isLoding;
		},

		formResetNeed(state) {
			return state.form.isReset;
		},

		getButtonState(state) {
			return state.button.isDisable;
		}
	},

	mutations: {
		API_DATA_PENDING(state) {
			state.data.isLoding = true;
			state.button.isDisable = true;
		},

		API_DATA_SUCCES(state, payload) {
			state.data.isLoding = false;
			state.button.isDisable = false;
			state.form.isReset = payload;
		},

		API_DATA_FAILURE(state, error) {
			state.data.isLoding = false;
			state.button.isDisable = false;
		}
	},

	actions: {
		downloadFile(store, payload) {
			store.commit('API_DATA_PENDING');

			return axios
				.get(
					'https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png',
					{
						responseType: 'arraybuffer'
					},
					payload
				)
				.then(response => {
					// server imitation
					setTimeout(() => {
						store.commit('API_DATA_SUCCES', true);
						store.dispatch('forceFileDownload', response);
					}, 5000);
				})
				.catch(error => {
					store.commit('API_DATA_FAILURE', error);
				});
		},

		forceFileDownload(response) {
			const url = window.URL.createObjectURL(new Blob([response.data]));

			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'file.png'); //or any other extension
			document.body.appendChild(link);
			link.click();
		},
		async downloadFile2() {
			try {
				const response = await axios.get('http://localhost:8081/downloadFile', {
					responseType: 'arraybuffer'
				});
				console.log('response', response);
			} catch (e) {
				console.log('Error', e);
			}
		}
	}
});