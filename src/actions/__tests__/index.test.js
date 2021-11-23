import moxios from 'moxios';

import { getSecretWord, correctGuess, actionTypes } from '../index';

describe('correctGuess', () => {
	test('returns an action with type `CORRECT_GUESS`', () => {
		const action = correctGuess();
		expect(action).toStrictEqual({
			type: actionTypes.CORRECT_GUESS,
		});
	});
});

describe('getSecretWord', () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('secret word is returned', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: 'party',
			});
		});

		// TODO: Update to test app in redux / context section

		return getSecretWord().then(secretWord => {
			expect(secretWord).toBe('party');
		});
	});
});
