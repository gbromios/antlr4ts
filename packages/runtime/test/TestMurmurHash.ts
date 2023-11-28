/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { MurmurHash } from '../src/misc/MurmurHash';

describe('MurmurHash', () => {
	describe('given an empty array', () => {
		it('produces 0 when seeded with 0', () =>
			expect(MurmurHash.hashCode([], 0)).toStrictEqual(0)
		);
		it ('produces a stable/known value when seeded with 1', () =>
			expect(MurmurHash.hashCode([], 1)).toStrictEqual(1364076727)
		)
	});

	describe('given the array [0]', () => {
		it('produces a stable/known value when seeded with 0', () =>
			expect(MurmurHash.hashCode([0], 0)).toStrictEqual(593689054)
		);

		it('produces a stable/known value when seeded with 1', () =>
			expect(MurmurHash.hashCode([0], 1)).toStrictEqual(2028806445)
		);
	});

	describe('given the array [0, 1]', () => {
		it('produces a stable/known value when seeded with 0', () =>
			expect(MurmurHash.hashCode([0, 1], 0)).toStrictEqual(987256456)
		);

		it('produces a stable/known value when seeded with 1', () =>
			expect(MurmurHash.hashCode([0], 1)).toStrictEqual(2028806445)
		);
	});
})
