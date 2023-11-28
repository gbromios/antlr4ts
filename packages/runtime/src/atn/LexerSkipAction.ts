/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:30.2324460-07:00

import { Lexer } from '../Lexer';
import { LexerAction } from './LexerAction';
import { LexerActionType } from './LexerActionType';
import { MurmurHash } from '../misc/MurmurHash';

/**
 * Implements the `skip` lexer action by calling {@link Lexer#skip}.
 *
 * The `skip` command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link #INSTANCE}.
 *
 * @author Sam Harwell
 * @since 4.2
 */
export class LexerSkipAction implements LexerAction {
	/**
	 * Constructs the singleton instance of the lexer `skip` command.
	 */
	constructor() {
		// intentionally empty
	}

	/**
	 * {@inheritDoc}
	 * @returns This method returns {@link LexerActionType#SKIP}.
	 */
	get actionType(): LexerActionType {
		return LexerActionType.SKIP;
	}

	/**
	 * {@inheritDoc}
	 * @returns This method returns `false`.
	 */
	get isPositionDependent(): boolean {
		return false;
	}

	/**
	 * {@inheritDoc}
	 *
	 * This action is implemented by calling {@link Lexer#skip}.
	 */
	public execute(lexer: Lexer): void {
		lexer.skip();
	}

	public hashCode(): number {
		let hash: number = MurmurHash.initialize();
		hash = MurmurHash.update(hash, this.actionType);
		return MurmurHash.finish(hash, 1);
	}

	public equals(obj: any): boolean {
		return obj === this;
	}

	public toString(): string {
		return 'skip';
	}
}

export namespace LexerSkipAction {
	/**
	 * Provides a singleton instance of this parameterless lexer action.
	 */
	export const INSTANCE: LexerSkipAction = new LexerSkipAction();
}