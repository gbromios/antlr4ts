/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import * as assert from 'assert';
import { BitSet } from '../src/misc/BitSet';

describe('BitSet Tests', () => {
	const empty = new BitSet();
	const evens = new BitSet(100);
	for (let i = 0; i < 100; i += 2) {
		evens.set(i);
	}

	const primes = new BitSet([
		3, 2, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
		71, 73, 79, 83, 89, 97,
	]);

	describe('empty', () => {
		it('has zero length', () => {
			expect(empty.length()).toStrictEqual(0);
		});
		it('has zero cardinality', () => {
			expect(empty.cardinality()).toStrictEqual(0);
		});
		it('.isEmpty', () => {
			expect(empty.isEmpty).toBe(true);
		});
		it('.toString()', () => {
			expect(empty.toString()).toStrictEqual('{}');
		});

		it('no set bits', () => {
			expect(empty.nextSetBit(0)).toStrictEqual(-1);
			expect(empty.nextSetBit(1)).toStrictEqual(-1);
			expect(empty.nextSetBit(100)).toStrictEqual(-1);
		});

		it('nextClearBit', () => {
			expect(empty.nextClearBit(0)).toStrictEqual(0);
			expect(empty.nextClearBit(1)).toStrictEqual(1);
			expect(empty.nextClearBit(100)).toStrictEqual(-1);
		});

		it('never intersects', () => {
			expect(empty.intersects(empty)).toBe(false);
			expect(empty.intersects(primes)).toBe(false);
			expect(primes.intersects(empty)).toBe(false);
		});

		it('equals itself', () => {
			expect(empty.equals([1, 3])).toBe(false);
		});

		it('equals itself', () => {
			expect(empty.equals(empty)).toBe(true);
		});

		it('equals oversize', () => {
			const o = new BitSet(100);
			expect(o.size >= 100).toBe(true);
			expect(o.size <= 116).toBe(true);
			expect(o.isEmpty).toBe(true);
			expect(o.equals(empty)).toBe(true);
			expect(empty.equals(o)).toBe(true);
		});

		it('grows on demand', () => {
			const a = primes.clone();
			a.set(1000, 1050);
			a.xor(primes);
			a.flip(1004, 1050);
			a.clear(2000, 2003);
			expect(a.toString()).toStrictEqual('{1000, 1001, 1002, 1003}');
		});

		it('oversize truncation', () => {
			const o = new BitSet(100);
			const p = new BitSet(200);
			let a = o.clone();
			a.and(p);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = p.clone();
			a.and(o);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = o.clone();
			a.or(p);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = p.clone();
			a.or(o);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = o.clone();
			a.xor(p);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = p.clone();
			a.xor(o);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = o.clone();
			a.andNot(p);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = p.clone();
			a.andNot(o);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(0);

			a = p.clone();
			a.clear(7, 1000);
			expect(a.isEmpty).toBe(true);
			expect(a.size).toStrictEqual(208);

			a = p.clone();
			a.set(75);
			a.xor(o);
			expect(a.toString()).toStrictEqual('{75}');
		});
	});

	describe('evens', () => {
		it('has bits set', () => {
			for (let i = 0; i < 100; i += 2) {
				expect(evens.get(i)).toBe(true);
			}
		});

		it('has bits clear', () => {
			for (let i = 1; i < 100; i += 2) {
				expect(evens.get(i)).toBe(false);
			}
		});

		it('JavaScript style iteration works', () => {
			let count = 0;
			for (let n of evens) {
				expect(n % 2).toStrictEqual(0);
				count++;
			}
			expect(count).toStrictEqual(50);
		});

		it('misc tests', () => {
			expect(evens.get(100)).toBe(false);
			expect(evens.get(101)).toBe(false);
			expect(evens.cardinality()).toStrictEqual(50);
		});

		it('hash collisions', () => {
			expect(evens.hashCode()).not.toStrictEqual(0);
			expect(evens.hashCode()).not.toStrictEqual(primes.hashCode());
		});

		it('copy constructor', () => {
			const a = new BitSet(evens);
			for (let i = 0; i < 100; i += 2) {
				expect(a.get(i)).toBe(true);
			}
			for (let i = 1; i < 100; i += 2) {
				expect(a.get(i)).toBe(false);
			}
		});

		it('set bits and clear bits', () => {
			expect(evens.nextSetBit(60)).toStrictEqual(60);
			expect(evens.nextSetBit(61)).toStrictEqual(62);
			expect(evens.nextClearBit(60)).toStrictEqual(61);
			expect(evens.nextClearBit(61)).toStrictEqual(61);
			expect(evens.previousSetBit(60)).toStrictEqual(60);
			expect(evens.previousSetBit(59)).toStrictEqual(58);
			expect(evens.previousClearBit(81)).toStrictEqual(81);
			expect(evens.previousClearBit(80)).toStrictEqual(79);
		});

		it('lengthy bit scans', () => {
			let a = new BitSet([50, 70, 90]);
			a.clear(90);
			expect(a.nextSetBit(0)).toStrictEqual(50);
			expect(a.nextSetBit(51)).toStrictEqual(70);
			expect(a.nextSetBit(71)).toStrictEqual(-1);
			expect(a.previousSetBit(1000)).toStrictEqual(70);
			expect(a.previousSetBit(69)).toStrictEqual(50);
		});

		it('lengthy bit scans', () => {
			let a = new BitSet([50, 70, 90]);
			a.clear(90);
			a.flip(0, 100);
			expect(a.nextClearBit(0)).toStrictEqual(50);
			expect(a.nextClearBit(51)).toStrictEqual(70);
			expect(a.nextClearBit(71)).toStrictEqual(-1);
			expect(a.previousClearBit(100)).toStrictEqual(70);
			expect(a.previousClearBit(69)).toStrictEqual(50);
		});
	});

	describe('primes', () => {
		it('length()', () => {
			expect(primes.length()).toStrictEqual(98);
		});
		it('cardinality()', () => {
			expect(primes.cardinality()).toStrictEqual(25);
		});
		it('toString() as expected', () => {
			const s = primes.toString();
			assert.strictEqual(
				s,
				'{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97}',
			);
		});
		it('and operation', () => {
			const a = new BitSet(evens);
			a.and(primes);
			expect(a.cardinality()).toStrictEqual(1);
			expect(a.length()).toStrictEqual(3);
			expect(a.get(2)).toBe(true);
			expect(a.get(9)).toBe(false);
			expect(a.toString()).toStrictEqual('{2}');
			expect(a.intersects(empty)).toBe(false);
			expect(a.intersects(evens)).toBe(true);
			expect(a.intersects(primes)).toBe(true);
		});
		it('or operation', () => {
			const a = new BitSet(evens);
			a.or(primes);
			expect(a.cardinality()).toStrictEqual(74);
			expect(a.length()).toStrictEqual(99);
			expect(a.get(2)).toBe(true);
			expect(a.get(3)).toBe(true);
			expect(a.get(4)).toBe(true);
			expect(a.get(9)).toBe(false);
		});
		it('xor operation', () => {
			const a = evens.clone();
			a.xor(evens);
			expect(a.isEmpty).toBe(true);
			const b = evens.clone();
			b.xor(primes);
			const c = evens.clone();
			c.or(primes);
			expect(b.cardinality()).toStrictEqual(c.cardinality() - 1);
		});
	});

	describe('range operations', () => {
		const ninetys = new BitSet();
		ninetys.set(90, 99);
		const tens = new BitSet();
		tens.set(10, 19);

		const composites = new BitSet(primes);
		composites.flip(2, 99);

		it('tens or ninetys', () => {
			const a = tens.clone();
			a.or(ninetys);
			assert.strictEqual(
				a.toString(),
				'{10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99}',
			);

			const b = ninetys.clone();
			b.or(tens);
			expect(a.equals(b)).toBe(true);
		});

		it('primes and composites isEmpty', () => {
			let a = primes.clone();
			a.and(composites);
			expect(a.isEmpty).toBe(true);
		});

		it('primes and composites do not intersect', () => {
			expect(primes.intersects(composites)).toBe(false);
		});

		it('ninetys', () => {
			assert.strictEqual(
				ninetys.toString(),
				'{90, 91, 92, 93, 94, 95, 96, 97, 98, 99}',
			);
		});

		it('ninetys and prime', () => {
			const ninetySeven = new BitSet(primes);
			ninetySeven.and(ninetys);
			expect(ninetySeven.toString()).toStrictEqual('{97}');
			expect(ninetySeven.equals(new BitSet([97]))).toBe(true);
			expect(ninetySeven.equals(primes)).toBe(false);
			expect(ninetySeven.equals(empty)).toBe(false);
		});

		it('composites', () => {
			assert.strictEqual(
				composites.toString(),
				'{4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99}',
			);
		});

		it('ninetys xor prime', () => {
			const x = new BitSet(primes);
			x.xor(composites);
			it('0 is not prime or composite', () => expect(x.get(0)).toBe(false))
			it('1 is not prime or composite', () => expect(x.get(1)).toBe(false))
			for (let i = 2; i < 100; i++) {
				it(`${i} is either prime or composite`, () =>
					expect(x.get(i)).toBe(true)
				);
			}
		});

		it('prime andNot ninetys', () => {
			const x = new BitSet(primes);
			x.andNot(ninetys);
			assert.strictEqual(
				x.toString(),
				'{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89}',
			);
		});

		it('prime and composites ', () => {
			const x = new BitSet(primes);
			x.and(composites);
			expect(x.toString()).toStrictEqual('{}');
		});

		it('clear', () => {
			const x = new BitSet(primes);
			x.clear(10, 100);
			x.clear(2);
			expect(x.toString()).toStrictEqual('{3, 5, 7}');

			const y = primes.clone();
			y.clear();
			expect(y.toString()).toStrictEqual('{}');
		});

		it('primes.get(1,11)', () => {
			const x = primes.get(1, 11);
			expect(x.toString()).toStrictEqual('{2, 3, 5, 7, 11}');
		});

		it('set(range) & and()', () => {
			const a = ninetys.clone();
			a.and(primes);
			expect(a.toString()).toStrictEqual('{97}');
		});
	});

	describe('error cases', () => {
		const dummy = evens.clone();
		it('constructor throws', () => {
			assert.throws(() => {
				let a = new BitSet(-1);
			});
		});

		it('other throws', () => {
			assert.throws(() => {
				evens.previousClearBit(-1);
			});
			assert.throws(() => {
				evens.previousSetBit(-2);
			});
			assert.throws(() => {
				dummy.nextClearBit(-3);
			});
			assert.throws(() => {
				dummy.nextSetBit(-4);
			});
			assert.throws(() => {
				dummy.set(-5);
			});
			assert.throws(() => {
				dummy.clear(-6);
			});
		});
	});
});
