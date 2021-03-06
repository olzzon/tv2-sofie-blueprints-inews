import {
	ActionExecutionContext,
	BlueprintMappings,
	ConfigItemValue,
	IBlueprintConfig,
	IBlueprintMutatablePart,
	IBlueprintPart,
	IBlueprintPartInstance,
	IBlueprintPiece,
	IBlueprintPieceInstance,
	IBlueprintResolvedPieceInstance,
	OmitId
} from '@sofie-automation/blueprints-integration'
import { DVEConfigInput, literal, TableConfigItemSourceMappingWithSisyfos } from 'tv2-common'
import { DefaultBreakerConfig } from '../../tv2_afvd_showstyle/__tests__/breakerConfigDefault'
import { defaultDSKConfig, OfftubeStudioConfig, parseConfig } from '../../tv2_offtube_studio/helpers/config'
import { OfftubeSisyfosLLayer } from '../../tv2_offtube_studio/layers'
import { OfftubeShowStyleConfig, parseConfig as parseShowStyleConfig } from '../helpers/config'

const mockStudioConfig: OfftubeStudioConfig = {
	SofieHostURL: '',

	ClipMediaFlowId: '',
	GraphicMediaFlowId: '',
	JingleMediaFlowId: '',
	JingleFileExtension: '',
	ClipFileExtension: 'mxf',
	GraphicFileExtension: '.png',
	ClipNetworkBasePath: '/',
	GraphicNetworkBasePath: '/',
	JingleNetworkBasePath: '/',
	ClipFolder: '',
	GraphicFolder: '',
	JingleFolder: '',
	GraphicIgnoreStatus: false,
	JingleIgnoreStatus: false,
	ClipIgnoreStatus: false,
	SourcesCam: [
		literal<TableConfigItemSourceMappingWithSisyfos>({
			SisyfosLayers: [],
			StudioMics: true,
			SourceName: '1',
			AtemSource: 4
		})
	],
	SourcesRM: [],
	SourcesFeed: [],
	SourcesSkype: [],
	ABMediaPlayers: [],
	StudioMics: [
		OfftubeSisyfosLLayer.SisyfosSourceHost_1_ST_A,
		OfftubeSisyfosLLayer.SisyfosSourceHost_2_ST_A,
		OfftubeSisyfosLLayer.SisyfosSourceHost_3_ST_A
	],
	ABPlaybackDebugLogging: false,

	AtemSource: {
		DSK: defaultDSKConfig,
		SplitArtF: 0,
		SplitArtK: 0,
		Default: 0,
		Continuity: 0,
		SplitBackground: 0,
		Loop: 0
	},
	AtemSettings: {},
	AudioBedSettings: {
		fadeIn: 0,
		fadeOut: 0,
		volume: 0
	},
	CasparPrerollDuration: 280,
	MaximumPartDuration: 0,
	DefaultPartDuration: 0,
	IdleSource: 0,
	IdleSisyfosLayers: [],
	ServerPostrollDuration: 5000,
	GraphicsType: 'HTML',
	VizPilotGraphics: {
		KeepAliveDuration: 1000,
		PrerollDuration: 1000,
		OutTransitionDuration: 1000,
		CutToMediaPlayer: 1000,
		FullGraphicBackground: 0
	},
	HTMLGraphics: {
		GraphicURL: '',
		KeepAliveDuration: 1000,
		TransitionSettings: {
			wipeRate: 20,
			borderSoftness: 7500,
			loopOutTransitionDuration: 120
		}
	}
}

const mockShowStyleConfig: OfftubeShowStyleConfig = {
	DVEStyles: [
		literal<DVEConfigInput>({
			DVEName: 'morbarn',
			DVEJSON: '{}',
			DVEGraphicsFrame: '',
			DVEGraphicsKey: '',
			DVEGraphicsTemplateJSON: '',
			DVEInputs: ''
		}),
		literal<DVEConfigInput>({
			DVEName: 'barnmor',
			DVEJSON: '{}',
			DVEGraphicsFrame: '',
			DVEGraphicsKey: '',
			DVEGraphicsTemplateJSON: '',
			DVEInputs: ''
		})
	],
	GFXTemplates: [],
	WipesConfig: [],
	BreakerConfig: DefaultBreakerConfig(),
	DefaultTemplateDuration: 4,
	LYDConfig: [],
	CasparCGLoadingClip: '',
	Transitions: [{ Transition: '1' }, { Transition: '2' }],
	ShowstyleTransition: 'CUT',
	MakeAdlibsForFulls: true
}

export class MockActionContext implements ActionExecutionContext {
	public warnings: string[] = []
	public errors: string[] = []

	public takeAfterExecute: boolean = false

	/** Get the mappings for the studio */
	public getStudioMappings: () => Readonly<BlueprintMappings>

	constructor(
		public segmentId: string,
		public currentPart: IBlueprintPartInstance,
		public currentPieceInstances: IBlueprintPieceInstance[],
		public nextPart?: IBlueprintPartInstance,
		public nextPieceInstances?: IBlueprintPieceInstance[]
	) {}
	/** Returns a map of the ShowStyle configs */
	public getShowStyleConfig(): Readonly<{
		[key: string]: ConfigItemValue
	}> {
		return JSON.parse(JSON.stringify(parseShowStyleConfig((mockShowStyleConfig as any) as IBlueprintConfig)))
	}
	/** Returns a map of the studio configs */
	public getStudioConfig(): Readonly<{
		[key: string]: ConfigItemValue
	}> {
		return JSON.parse(JSON.stringify(parseConfig((mockStudioConfig as any) as IBlueprintConfig)))
	}
	/** Un-hash, is return the string that created the hash */
	public unhashId(hash: string) {
		return hash
	}
	/**
	 * Hash a string. Will return a unique string, to be used for all _id:s that are to be inserted in database
	 * @param originString A representation of the origin of the hash (for logging)
	 * @param originIsNotUnique If the originString is not guaranteed to be unique, set this to true
	 */
	public getHashId(originString: string, _originIsNotUnique?: boolean) {
		return originString
	}
	public warning(message: string) {
		this.warnings.push(message)
	}
	public error(message: string) {
		this.errors.push(message)
	}
	/** Returns a reference to a studio config value, that can later be resolved in Core */
	public getStudioConfigRef(_configKey: string): string {
		return ''
	}
	/** Returns a reference to a showStyle config value, that can later be resolved in Core */
	public getShowStyleConfigRef(_configKey: string): string {
		return ''
	}
	/** Get a PartInstance which can be modified */
	public getPartInstance(part: 'current' | 'next'): IBlueprintPartInstance | undefined {
		if (part === 'current') {
			return this.currentPart
		}
		return this.nextPart
	}
	/** Get the PieceInstances for a modifiable PartInstance */
	public getPieceInstances(part: 'current' | 'next'): IBlueprintPieceInstance[] {
		if (part === 'current') {
			return this.currentPieceInstances
		}

		return this.nextPieceInstances || []
	}
	/** Get the resolved PieceInstances for a modifiable PartInstance */
	public getResolvedPieceInstances(_part: 'current' | 'next'): IBlueprintResolvedPieceInstance[] {
		return []
	}
	/** Get the last active piece on given layer */
	public findLastPieceOnLayer(
		_sourceLayerId: string,
		_options?: {
			excludeCurrentPart?: boolean
			originalOnly?: boolean
			pieceMetaDataFilter?: any
		}
	): IBlueprintPieceInstance | undefined {
		return undefined
	}
	/** Fetch the showstyle config for the specified part */
	/** Creative actions */
	/** Insert a piece. Returns id of new PieceInstance. Any timelineObjects will have their ids changed, so are not safe to reference from another piece */
	public insertPiece(part: 'current' | 'next', piece: IBlueprintPiece): IBlueprintPieceInstance {
		const pieceInstance: IBlueprintPieceInstance = {
			_id: '',
			piece: {
				_id: '',
				...piece
			}
		}
		if (part === 'current') {
			this.currentPieceInstances.push(pieceInstance)
		} else {
			if (this.nextPart && this.nextPieceInstances) {
				this.nextPieceInstances.push(pieceInstance)
			}
		}
		return pieceInstance
	}
	/** Update a pieceInstance */
	public updatePieceInstance(
		_pieceInstanceId: string,
		piece: Partial<OmitId<IBlueprintPiece>>
	): IBlueprintPieceInstance {
		return {
			_id: '',
			piece: {
				_id: '',
				...(piece as IBlueprintPiece)
			}
		}
	}
	/** Insert a queued part to follow the current part */
	public queuePart(part: IBlueprintPart, pieces: IBlueprintPiece[]): IBlueprintPartInstance {
		const instance = literal<IBlueprintPartInstance>({
			_id: '',
			segmentId: this.segmentId,
			part: {
				_id: '',
				...part,
				segmentId: this.segmentId
			}
		})

		this.nextPart = instance
		this.nextPieceInstances = pieces.map<IBlueprintPieceInstance>(p => ({
			_id: (Date.now() * Math.random()).toString(),
			piece: {
				_id: '',
				...p
			}
		}))

		return instance
	}
	/** Update a partInstance */
	public updatePartInstance(part: 'current' | 'next', props: Partial<IBlueprintMutatablePart>): IBlueprintPartInstance {
		if (part === 'current') {
			this.currentPart.part = { ...this.currentPart.part, ...props }
			return this.currentPart
		} else if (this.nextPart) {
			this.nextPart.part = { ...this.nextPart.part, ...props }
			return this.nextPart
		}

		throw new Error(`MOCK ACTION EXECTUION CONTEXT: Could not update part instance: ${part}`)
	}
	/** Destructive actions */
	/** Stop any piecesInstances on the specified sourceLayers. Returns ids of piecesInstances that were affected */
	public stopPiecesOnLayers(_sourceLayerIds: string[], _timeOffset?: number): string[] {
		return []
	}
	/** Stop piecesInstances by id. Returns ids of piecesInstances that were removed */
	public stopPieceInstances(_pieceInstanceIds: string[], _timeOffset?: number): string[] {
		return []
	}
	/** Remove piecesInstances by id. Returns ids of piecesInstances that were removed */
	public removePieceInstances(part: 'current' | 'next', pieceInstanceIds: string[]): string[] {
		if (part === 'current') {
			this.currentPieceInstances = this.currentPieceInstances.filter(p => !pieceInstanceIds.includes(p._id))
		} else if (this.nextPieceInstances) {
			this.nextPieceInstances = this.nextPieceInstances.filter(p => !pieceInstanceIds.includes(p._id))
		}

		return pieceInstanceIds
	}
	/** Set flag to perform take after executing the current action. Returns state of the flag after each call. */
	public takeAfterExecuteAction(take: boolean): boolean {
		this.takeAfterExecute = take

		return take
	}

	public hackGetMediaObjectDuration(_mediaId: string): number | undefined {
		return undefined
	}

	public findLastScriptedPieceOnLayer(
		_sourceLayerId: string,
		_options?: {
			excludeCurrentPart?: boolean
			pieceMetaDataFilter?: any
		}
	): IBlueprintPiece | undefined {
		return undefined
	}

	public getPartInstanceForPreviousPiece(_piece: IBlueprintPieceInstance): IBlueprintPartInstance {
		return literal<IBlueprintPartInstance>({
			_id: '',
			segmentId: '',
			part: {
				_id: '',
				segmentId: '',
				externalId: '',
				title: ''
			}
		})
	}

	public getPartForPreviousPiece(_piece: { _id: string }): IBlueprintPart | undefined {
		return
	}
}
