/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { IntegerList } from '../../src/misc/IntegerList';

import { suite, test } from '@testdeck/mocha';
import * as assert from 'assert';

@suite
export class TestIntegerList {
	@test
	public emptyListToEmptyCharArray(): void {
		let l: IntegerList = new IntegerList();
		assert.deepStrictEqual(new Uint16Array(0), l.toCharArray());
	}

	@test
	public negativeIntegerToCharArrayThrows(): void {
		let l: IntegerList = new IntegerList();
		l.add(-42);
		assert.throws(() => l.toCharArray(), RangeError);
	}

	@test
	public surrogateRangeIntegerToCharArray(): void {
		let l: IntegerList = new IntegerList();
		// Java allows dangling surrogates, so (currently) we do
		// as well. We could change this if desired.
		l.add(0xdc00);
		let expected = new Uint16Array([0xdc00]);
		assert.deepStrictEqual(expected, l.toCharArray());
	}

	@test
	public tooLargeIntegerToCharArrayThrows(): void {
		let l: IntegerList = new IntegerList();
		l.add(0x110000);
		assert.throws(() => l.toCharArray(), RangeError);
	}

	@test
	public unicodeBMPIntegerListToCharArray(): void {
		let l: IntegerList = new IntegerList();
		l.add(0x35);
		l.add(0x4e94);
		l.add(0xff15);
		let expected = new Uint16Array([0x35, 0x4e94, 0xff15]);
		assert.deepStrictEqual(expected, l.toCharArray());
	}

	@test
	public unicodeSMPIntegerListToCharArray(): void {
		let l: IntegerList = new IntegerList();
		l.add(0x104a5);
		l.add(0x116c5);
		l.add(0x1d7fb);
		let expected = new Uint16Array([
			0xd801, 0xdca5, 0xd805, 0xdec5, 0xd835, 0xdffb,
		]);
		assert.deepStrictEqual(expected, l.toCharArray());
	}
}
