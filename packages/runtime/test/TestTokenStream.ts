/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { BufferedTokenStream } from '../src/BufferedTokenStream';
import { CharStreams } from '../src/CharStreams';
import { XPathLexer, TOKEN } from '../src/tree/xpath/XPathLexer';

/**
 * This class contains tests for specific API functionality in `TokenStream` and derived types.
 */
describe('BufferedTokenStream', () => {
	/**
	 * This is a targeted regression test for antlr/antlr4#1584 (`BufferedTokenStream` cannot be reused after EOF).
	 */
	it('CAN be reused after fill', () => {
		let firstInput = CharStreams.fromString('A');
		let tokenStream = new BufferedTokenStream(new XPathLexer(firstInput));
		tokenStream.fill();
		expect(tokenStream.size).toStrictEqual(2);
		expect(tokenStream.get(0).type).toStrictEqual(TOKEN.TOKEN_REF);
		expect(tokenStream.get(1).type).toStrictEqual(TOKEN.EOF);

		let secondInput = CharStreams.fromString('A/');
		tokenStream.tokenSource = new XPathLexer(secondInput);
		tokenStream.fill();
		expect(tokenStream.size).toStrictEqual(3);
		expect(tokenStream.get(0).type).toStrictEqual(TOKEN.TOKEN_REF);
		expect(tokenStream.get(1).type).toStrictEqual(TOKEN.ROOT);
		expect(tokenStream.get(2).type).toStrictEqual(TOKEN.EOF);
	})
});

