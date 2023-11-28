/*
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { Array2DHashSet } from '../src/misc/Array2DHashSet';
import assert from 'assert';
import { Equatable } from '../src/misc/Stubs';
import { MockEquatable } from './util/MockEquatable';


describe('Array2DHashSet', () => {
	let set: Array2DHashSet<Equatable>;

	beforeEach(() => {
		set = new Array2DHashSet<Equatable>();
	});

	describe('getOrAdd', () => {
		it('refers to private implementation', () => {
			const spy = vi.spyOn(set as any, 'getOrAddImpl');
			const meq = MockEquatable('a', 'z');
			expect(set.getOrAdd(meq)).toBe(meq);
			expect(spy).toHaveBeenCalledOnce();
			expect(spy).toHaveBeenCalledWith(meq);
		});
		it('only adds each value once', () => {
			const meqAB = MockEquatable('a', 'b');
			const meqXY = MockEquatable('x', 'y');
			const meqABAgain = MockEquatable('a', 'b');
			expect(set.getOrAdd(meqAB)).toBe(meqAB);
			expect(set.getOrAdd(meqXY)).toBe(meqXY);
			expect(set.getOrAdd(meqABAgain)).toBe(meqAB);
			expect(set.size).toStrictEqual(2);
		});
	});

	describe('add', () => {
		it('true when argument is the one already in the set', () => {
			const meqAB = MockEquatable('a', 'b');
			const meqABAgain = MockEquatable('a', 'b');
			expect(set.add(meqAB)).toBe(true);
			expect(set.add(meqAB)).toBe(true);
			expect(set.add(meqABAgain)).toBe(false);
			expect(set.size).toBe(1);
		});
	});

	it('size', () => {
		expect(set.isEmpty).toBe(true);
		expect(set.size).toStrictEqual(0);
		set.add(MockEquatable('a', '1'));
		expect(set.isEmpty).toBe(false);
		expect(set.size).toStrictEqual(1);
		set.add(MockEquatable('a', '2'));
		expect(set.size).toStrictEqual(2);
	});

	it('should check entries by value', () => {
		expect(set.isEmpty).toBe(true);
		const alpha = MockEquatable('alpha', '1')
		const alphaAgain = MockEquatable('alpha', '1')
		const beta = MockEquatable('beta', '1')
		set.add(alpha);
		expect(set.contains(alpha)).toBe(true);
		expect(set.contains(alphaAgain)).toBe(true);
		expect(set.contains(beta)).toBe(false);
	});
});
