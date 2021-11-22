import { mount } from 'enzyme';
import { findByTestAttr } from '../tests/testUtils';
import App from './App';

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = () => {
	return mount(<App />);
};

test('renders without errors', () => {
	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, 'component-app');
	expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
	beforeEach(() => {
		// clear the mock call from previous tests
		mockGetSecretWord.mockClear();
	});

	test('Run getSecretWord on app mount', () => {
		const wrapper = setup();
		expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
	});

	test('getSecretWord does not run on app update', () => {
		const wrapper = setup();
		mockGetSecretWord.mockClear();

		// using setProps because wrapper.update() doesn't trigger useEffect
		wrapper.setProps();

		expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
	});
});
