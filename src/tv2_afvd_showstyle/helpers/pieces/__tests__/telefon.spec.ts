import {
	GraphicsContent,
	IBlueprintActionManifest,
	IBlueprintAdLibPiece,
	IBlueprintPiece,
	PieceLifespan,
	TSR
} from '@sofie-automation/blueprints-integration'
import {
	AtemLLayerDSK,
	CueDefinitionGraphic,
	CueDefinitionTelefon,
	GraphicInternal,
	literal,
	PartDefinitionKam
} from 'tv2-common'
import { CueType, GraphicLLayer, PartType, SharedOutputLayers } from 'tv2-constants'
import { SegmentContext } from '../../../../__mocks__/context'
import { defaultShowStyleConfig, defaultStudioConfig } from '../../../../tv2_afvd_showstyle/__tests__/configs'
import { SourceLayer } from '../../../../tv2_afvd_showstyle/layers'
import { defaultDSKConfig, StudioConfig } from '../../../../tv2_afvd_studio/helpers/config'
import { SisyfosLLAyer } from '../../../../tv2_afvd_studio/layers'
import mappingsDefaults from '../../../../tv2_afvd_studio/migrations/mappings-defaults'
import { ShowStyleConfig } from '../../config'
import { EvaluateTelefon } from '../telefon'

const mockContext = new SegmentContext(
	{
		_id: '',
		externalId: '',
		name: '',
		showStyleVariantId: ''
	},
	mappingsDefaults
)
mockContext.studioConfig = defaultStudioConfig as any
mockContext.showStyleConfig = defaultShowStyleConfig as any

const dummyPart = literal<PartDefinitionKam>({
	type: PartType.Kam,
	variant: {
		name: '1'
	},
	externalId: '0001',
	rawType: 'Kam 1',
	cues: [],
	script: '',
	storyName: '',
	fields: {},
	modified: 0,
	segmentExternalId: ''
})

describe('telefon', () => {
	test('telefon with vizObj', () => {
		const cue: CueDefinitionTelefon = {
			type: CueType.Telefon,
			source: 'TLF 1',
			graphic: literal<CueDefinitionGraphic<GraphicInternal>>({
				type: CueType.Graphic,
				target: 'TLF',
				graphic: {
					type: 'internal',
					template: 'bund',
					cue: 'kg',
					textFields: ['Odense', 'Copenhagen']
				},
				iNewsCommand: 'kg'
			}),
			start: {
				seconds: 0
			},
			iNewsCommand: 'TELEFON'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'
		EvaluateTelefon(
			{
				showStyle: (defaultShowStyleConfig as unknown) as ShowStyleConfig,
				studio: (defaultStudioConfig as unknown) as StudioConfig,
				sources: [],
				mediaPlayers: [],
				stickyLayers: [],
				liveAudio: [],
				dsk: defaultDSKConfig
			},
			mockContext,
			pieces,
			adLibPieces,
			actions,
			partId,
			dummyPart,
			cue
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'TLF 1',
				enable: {
					start: 0
				},
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsTLF,
				lifespan: PieceLifespan.WithinPart,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: [
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: '!.full'
							},
							priority: 1,
							layer: GraphicLLayer.GraphicLLayerOverlayLower,
							content: {
								deviceType: TSR.DeviceType.VIZMSE,
								type: TSR.TimelineContentTypeVizMSE.ELEMENT_INTERNAL,
								templateName: 'bund',
								templateData: ['Odense', 'Copenhagen'],
								channelName: 'OVL1'
							}
						}),
						literal<TSR.TimelineObjAtemDSK>({
							id: '',
							enable: {
								start: 0
							},
							priority: 1,
							layer: AtemLLayerDSK(0),
							content: {
								deviceType: TSR.DeviceType.ATEM,
								type: TSR.TimelineContentTypeAtem.DSK,
								dsk: {
									onAir: true,
									sources: {
										fillSource: 21,
										cutSource: 34
									},
									properties: {
										clip: 500,
										gain: 125,
										mask: {
											enabled: false
										}
									}
								}
							}
						}),
						literal<TSR.TimelineObjSisyfosChannel>({
							id: '',
							enable: {
								start: 0
							},
							priority: 1,
							layer: SisyfosLLAyer.SisyfosSourceTLF,
							content: {
								deviceType: TSR.DeviceType.SISYFOS,
								type: TSR.TimelineContentTypeSisyfos.CHANNEL,
								isPgm: 1
							}
						}),
						literal<TSR.TimelineObjSisyfosChannels>({
							id: '',
							enable: {
								start: 0
							},
							priority: 2,
							layer: SisyfosLLAyer.SisyfosGroupStudioMics,
							content: {
								deviceType: TSR.DeviceType.SISYFOS,
								type: TSR.TimelineContentTypeSisyfos.CHANNELS,
								channels: [
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceHost_1_ST_A,
										isPgm: 1
									},
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceHost_2_ST_A,
										isPgm: 1
									},
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceGuest_1_ST_A,
										isPgm: 1
									},
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceGuest_2_ST_A,
										isPgm: 1
									},
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceGuest_3_ST_A,
										isPgm: 1
									},
									{
										mappedLayer: SisyfosLLAyer.SisyfosSourceGuest_4_ST_A,
										isPgm: 1
									}
								],
								overridePriority: 2
							}
						})
					]
				})
			})
		])
	})
})
