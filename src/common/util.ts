import { DeviceType, Timeline, TimelineObjEmpty } from 'timeline-state-resolver-types'
import { IBlueprintAdLibPiece, IBlueprintPiece } from 'tv-automation-sofie-blueprints-integration'

export function literal<T>(o: T) {
	return o
}
export function assertUnreachable(_never: never): never {
	throw new Error('Switch validation failed, look for assertUnreachable(...)')
}

export function createVirtualPiece(
	layer: string,
	enable: number | Timeline.TimelineEnable,
	mainPiece?: IBlueprintPiece
): IBlueprintPiece {
	return {
		_id: '',
		name: '',
		externalId: mainPiece ? mainPiece.externalId : '-',
		enable:
			typeof enable === 'number'
				? {
						start: enable,
						duration: 0
				  }
				: enable,
		sourceLayerId: layer,
		outputLayerId: 'pgm',
		virtual: true,
		content: {
			timelineObjects: []
		}
	}
}

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>
export type EmptyBaseObj = OptionalExceptFor<Omit<TimelineObjEmpty, 'content'>, 'layer' | 'enable' | 'classes'>
export function createEmptyObject(obj: EmptyBaseObj): TimelineObjEmpty {
	return literal<TimelineObjEmpty>({
		id: '',
		priority: 0,
		...obj,
		content: {
			deviceType: DeviceType.ABSTRACT,
			type: 'empty'
		}
	})
}

/**
 * Returs true if the piece is interface IBlueprintAdLibPiece
 * @param {IBlueprintPiece | IBlueprintAdLibPiece} piece Piece to check
 */
export function isAdLibPiece(piece: IBlueprintPiece | IBlueprintAdLibPiece) {
	return '_rank' in piece
}
