import type { Equatable } from '../../src/misc/Stubs';
import { MockedFunction, SpyInstance, vi } from 'vitest';
import { MurmurHash } from '../../src/misc/MurmurHash';

const IS_MOCK_EQUATABLE = Symbol('IS_MOCK_EQUATABLE');
export type MockEquatable = Equatable & {
	[IS_MOCK_EQUATABLE]: true;
	readonly a: string;
	readonly b: string;
	toString (): string;
	aSpy: SpyInstance;
	bSpy: SpyInstance;
	hashCode: MockedFunction<Equatable['hashCode']>;
	equals: MockedFunction<Equatable['equals']>;
}

function meqIs(o: unknown): o is MockEquatable {
	return Boolean(o && typeof o === 'object' && IS_MOCK_EQUATABLE in o);
}

function meqHashCode (this: MockEquatable) {
	return MurmurHash.hashCode([this.a, this.b], 5280);
}

function meqEquals(this: MockEquatable, o: unknown) {
	//return meqIs(o) && (this === o || (this.a === o.a && this.b === o.b));
	const result = meqIs(o) && (this === o || (this.a === o.a && this.b === o.b));
	return result
}

export function MockEquatable(a: string, b: string): MockEquatable {
	const meq = {
		[IS_MOCK_EQUATABLE]: true,
		a,
		b,
		toString: () => `MockEquatable(a=${a}, b=${b})`
	} as MockEquatable;
	meq.aSpy = vi.spyOn(meq, 'a', 'get').mockImplementation(() => a);
	meq.bSpy = vi.spyOn(meq, 'b', 'get').mockImplementation(() => b);
	meq.hashCode = vi.fn(meqHashCode.bind(meq));
	meq.equals = vi.fn(meqEquals.bind(meq));
	return meq;
}
