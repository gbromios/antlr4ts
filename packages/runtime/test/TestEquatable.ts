import type { Equatable } from '../src/misc/Stubs';
import { MockEquatable } from './util/MockEquatable';

// type check the Equatable interface and validate the suitability of the mock
// Equatable class for other tests

describe('Equatable interface', () => {
	const alpha = MockEquatable('alpha', '1');
	const alphaAgain = MockEquatable('alpha', '1');
	const beta = MockEquatable('beta', '1');
	describe('EquatableTest', () => {
		it('should respect identity', () => {
			expect(alpha.equals(alpha)).toBe(true);
			expect(alphaAgain.equals(alphaAgain)).toBe(true);
			expect(beta.equals(beta)).toBe(true);
		});

		it('should compare equality by value', () => {
			expect(alpha.equals(alphaAgain)).toBe(true);
			expect(alphaAgain.equals(alpha)).toBe(true);
		});

		it('should detect difference by value', () => {
			expect(beta.equals(alpha)).toBe(false);
		});

		it('should hash identical values the same', () => {
			expect(alpha.hashCode()).toStrictEqual(alphaAgain.hashCode());
		});

		it('should hash different values differently', () => {
			expect(alpha.hashCode()).not.toStrictEqual(beta.hashCode());
		});
	});

});

