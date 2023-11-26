/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

export function isHighSurrogate(ch: number): boolean {
	return ch >= 0xd800 && ch <= 0xdbff;
}

export function isLowSurrogate(ch: number): boolean {
	return ch >= 0xdc00 && ch <= 0xdfff;
}

export function isSupplementaryCodePoint(ch: number): boolean {
	return ch >= 0x10000;
}
