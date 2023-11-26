/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:48.1433686-07:00

import { Interval } from '../misc/Interval';
import { Parser } from '../Parser';
import { ParseTree } from './ParseTree';
import { ParseTreeVisitor } from './ParseTreeVisitor';
import { RuleContext } from '../RuleContext';
import { RuleNode } from './RuleNode';
import { Token } from '../Token';

export class TerminalNode implements ParseTree {
	public _symbol: Token;
	public _parent: RuleNode | undefined;

	constructor(symbol: Token) {
		this._symbol = symbol;
	}

	public getChild(i: number): never {
		throw new RangeError('Terminal Node has no children.');
	}

	get symbol(): Token {
		return this._symbol;
	}

	get parent(): RuleNode | undefined {
		return this._parent;
	}

	public setParent(parent: RuleContext): void {
		this._parent = parent;
	}

	get payload(): Token {
		return this._symbol;
	}

	get sourceInterval(): Interval {
		let tokenIndex: number = this._symbol.tokenIndex;
		return new Interval(tokenIndex, tokenIndex);
	}

	get childCount(): number {
		return 0;
	}

	public accept<T>(visitor: ParseTreeVisitor<T>): T {
		return visitor.visitTerminal(this);
	}

	get text(): string {
		return this._symbol.text || '';
	}

	public toStringTree(parser?: Parser): string {
		return this.toString();
	}

	public toString(): string {
		if (this._symbol.type === Token.EOF) {
			return '<EOF>';
		}

		return this._symbol.text || '';
	}
}
