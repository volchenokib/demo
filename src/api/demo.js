import Vue from 'vue';
import baseURL from '@/api/const';

export default {
	fetchFile(payload) {
		return Vue.http(
			{
				method: 'get',
				url: 'https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png',
				responseType: 'arraybuffer'
			},
			payload
		);
	}
};
