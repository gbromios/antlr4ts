/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:27.6769122-07:00

import { ATNState } from './ATNState';
import { IntervalSet } from '../misc/IntervalSet';
import { Transition } from './Transition';
import { TransitionType } from './TransitionType';

/** TODO: make all transitions sets? no, should remove set edges */
export class AtomTransition extends Transition {
	/** The token type or character value; or, signifies special label. */
	public _label: number;

	constructor(target: ATNState, label: number) {
		super(target);
		this._label = label;
	}

	get serializationType(): TransitionType {
		return TransitionType.ATOM;
	}

	get label(): IntervalSet {
		return IntervalSet.of(this._label);
	}

	public matches(
		symbol: number,
		minVocabSymbol: number,
		maxVocabSymbol: number,
	): boolean {
		return this._label === symbol;
	}

	public toString(): string {
		return String(this.label);
	}
}