import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import demo1 from '@/components/demo1.vue';

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);

let actions;
let mutations;
let getters;
let store;

// getters = {
// 	getDataState: () => false,
// 	formResetNeed: () => false,
// 	getButtonState: () => false
// };

actions = {
	downloadFile: jest.fn(),
	forceFileDownload: jest.fn()
};

store = new Vuex.Store({
	state: {},
	actions,
	mutations,
	getters
});

describe('demo1 component', () => {
	const wrapper = mount(demo1, { store, localVue });
	// const vm = wrapper.vm;

	it('component renders correctly', () => {
		expect(wrapper.element).toMatchSnapshot();
	});

	it('date input error messages works correctly', () => {
		wrapper.find('button').trigger('click');
		const errMsg = wrapper.find('.v-messages__message');
		expect(errMsg.isVisible()).toBe(true);
	});

	describe('submit button', () => {
		const wrapper = mount(demo1, { store, localVue });

		it('button exist', () => {
			expect(wrapper.contains('button')).toBe(true);
		});

		it('button text is correct', () => {
			const buttonContent = wrapper.find('.v-btn__content');
			expect(buttonContent.text()).toMatch('сформировать');
		});

		it('action is fire', () => {
			const textInput = wrapper.findAll('input[type="text"]');
			textInput.setValue('12-05-2018');
			wrapper.find('button').trigger('click');
			expect(actions.downloadFile).toHaveBeenCalled();
			expect(actions.downloadFile).toHaveBeenCalledTimes(1);
		});
	});
});
