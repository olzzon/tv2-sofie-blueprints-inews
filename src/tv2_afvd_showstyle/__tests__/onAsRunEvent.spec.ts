import { IBlueprintAsRunLogEventContent, LookaheadMode, TSR } from '@sofie-automation/blueprints-integration'
import onAsRunEvent from '../onAsRunEvent'

describe('onAsRunevent', () => {
	const runEvent = {
		_id: 'studio0Runevent',
		studioId: 'studio0',
		rundownId: 'rundown0',
		timestamp: 0,
		content: IBlueprintAsRunLogEventContent.STARTEDPLAYBACK,
		rehersal: true
	}
	it('Returns empty promise', () => {
		expect(
			onAsRunEvent({
				asRunEvent: runEvent,
				rundownId: 'rundown0',
				rundown: {
					_id: '',
					showStyleVariantId: '',
					externalId: '',
					name: ''
				},
				getAllAsRunEvents: () => {
					return [runEvent]
				},
				getSegments: () => {
					return []
				},
				getSegment: () => {
					return undefined
				},
				getParts: () => {
					return []
				},
				getIngestDataForRundown: () => {
					return undefined
				},
				getIngestDataForPart: () => {
					return undefined
				},
				formatDateAsTimecode: (time: number) => {
					return time.toString()
				},
				formatDurationAsTimecode: (time: number) => {
					return time.toString()
				},
				error: (_: string) => {
					return
				},
				warning: (_: string) => {
					return
				},
				getHashId: (_: string, __?: boolean) => {
					return ''
				},
				unhashId: (hash: string) => {
					return hash
				},
				getStudioMappings: () => {
					return {
						'1': {
							device: TSR.DeviceType.ATEM,
							deviceId: '',
							lookahead: LookaheadMode.NONE
						}
					}
				},
				getStudioConfig: () => {
					return {
						'1': false
					}
				},
				getShowStyleConfig: () => {
					return {
						'1': false
					}
				},
				getStudioConfigRef: (key: string) => {
					return key
				},
				getShowStyleConfigRef: (key: string) => {
					return key
				},
				getCurrentTime: () => {
					return 0
				},
				getAllQueuedMessages: () => {
					return []
				},
				getPartInstance: () => {
					return undefined
				},
				getPieceInstance: () => {
					return undefined
				},
				getPieceInstances: () => {
					return []
				},
				getIngestDataForPartInstance: () => {
					return undefined
				}
			})
		).toBeTruthy()
	})
})
