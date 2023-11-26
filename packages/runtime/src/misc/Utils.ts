/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:45.0833752-07:00

// Taking a case-by-case approach to pporting this functionaltiy
// as much of it may be supported natively by JavaScript. Or otherwise need
// substantial rethink

import { Equatable } from './Stubs';
import { IntegerList } from './IntegerList';

export function escapeWhitespace(s: string, escapeSpaces: boolean): string {
	return escapeSpaces ?
			s.replace(/ /, '\u00B7')
		:	s.replace(/\t/, '\\t').replace(/\n/, '\\n').replace(/\r/, '\\r');
}

// Seriously: why isn't this built in to java? ugh!
export function join(collection: Iterable<any>, separator: string): string {
	let buf = '';
	let first = true;
	for (let current of collection) {
		if (first) {
			first = false;
		} else {
			buf += separator;
		}

		buf += current;
	}

	return buf;
}

export function equals(
	x: Equatable | undefined,
	y: Equatable | undefined,
): boolean {
	if (x === y) {
		return true;
	}

	if (x === undefined || y === undefined) {
		return false;
	}

	return x.equals(y);
}

/** Convert array of strings to string&rarr;index map. Useful for
 *  converting rulenames to name&rarr;ruleindex map.
 */
export function toMap(keys: string[]): Map<string, number> {
	let m: Map<string, number> = new Map<string, number>();
	for (let i = 0; i < keys.length; i++) {
		m.set(keys[i], i);
	}

	return m;
}

export function toCharArray(str: string): Uint16Array;
export function toCharArray(data: IntegerList): Uint16Array;
export function toCharArray(str: string | IntegerList): Uint16Array {
	if (typeof str === 'string') {
		let result = new Uint16Array(str.length);
		for (let i = 0; i < str.length; i++) {
			result[i] = str.charCodeAt(i);
		}

		return result;
	} else {
		return str.toCharArray();
	}
}

// /**
// 	* @since 4.5
// 	*/
// @NotNull
// export function toSet(@NotNull bits: BitSet): IntervalSet {
// 	let s: IntervalSet =  new IntervalSet();
// 	let i: number =  bits.nextSetBit(0);
// 	while ( i >= 0 ) {
// 		s.add(i);
// 		i = bits.nextSetBit(i+1);
// 	}
// 	return s;
// }
//

export class AssertionError extends Error {
	name: string = 'AssertionError';
	constructor(desc?: string) {
		super('Assertion Failed' + desc === undefined ? '' : `: ${desc}`);
	}
}

/**
 * throws an AssertionError when the argument is falsy. Functions as a type
 *   predicate which filters out null, undef, 0, empty string and false.
 * @param arg — the value for which to assert truthiness
 * @param [desc] — description of the check being performed, will be
 *   included with any thrown AssertionError's message if provided.
 * @returns boolean — true for a truthy value (throws otherwise)
 */
export function assert<T>(
	arg: T,
	desc?: string,
): arg is Exclude<T, null | undefined | false | 0 | ''> {
	if (arg as any) return true;
	else throw new AssertionError(desc);
}
