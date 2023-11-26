/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:24.7363448-07:00

import { ATNState } from './ATNState';
import { Transition } from './Transition';
import { TransitionType } from './TransitionType';

export class ActionTransition extends Transition {
	public ruleIndex: number;
	public actionIndex: number;
	public isCtxDependent: boolean; // e.g., $i ref in action

	constructor(
		target: ATNState,
		ruleIndex: number,
		actionIndex: number = -1,
		isCtxDependent: boolean = false,
	) {
		super(target);
		this.ruleIndex = ruleIndex;
		this.actionIndex = actionIndex;
		this.isCtxDependent = isCtxDependent;
	}

	get serializationType(): TransitionType {
		return TransitionType.ACTION;
	}

	get isEpsilon(): boolean {
		return true; // we are to be ignored by analysis 'cept for predicates
	}

	public matches(
		symbol: number,
		minVocabSymbol: number,
		maxVocabSymbol: number,
	): boolean {
		return false;
	}

	public toString(): string {
		return 'action_' + this.ruleIndex + ':' + this.actionIndex;
	}
}
