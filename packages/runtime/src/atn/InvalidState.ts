/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

import { ATNState } from './ATNState';
import { ATNStateType } from './ATNStateType';
import { BasicState } from './BasicState';

/**
 *
 * @author Sam Harwell
 */
export class InvalidState extends BasicState {
	get stateType(): ATNStateType {
		return ATNStateType.INVALID_TYPE;
	}
}