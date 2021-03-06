import {
	GraphicsContent,
	IBlueprintActionManifest,
	IBlueprintAdLibPiece,
	IBlueprintPiece,
	IBlueprintRundownDB,
	PieceLifespan,
	TSR
} from '@sofie-automation/blueprints-integration'
import { AtemLLayerDSK, CueDefinitionGraphic, GraphicInternal, literal, PartDefinitionKam } from 'tv2-common'
import { AbstractLLayer, AdlibTags, CueType, GraphicLLayer, PartType, SharedOutputLayers } from 'tv2-constants'
import { SegmentContext } from '../../../../__mocks__/context'
import { BlueprintConfig } from '../../../../tv2_afvd_studio/helpers/config'
import mappingsDefaults from '../../../../tv2_afvd_studio/migrations/mappings-defaults'
import { defaultShowStyleConfig, defaultStudioConfig } from '../../../__tests__/configs'
import { SourceLayer } from '../../../layers'
import { getConfig } from '../../config'
import { EvaluateCueGraphic } from '../graphic'

const RUNDOWN_EXTERNAL_ID = 'TEST.SOFIE.JEST'

function makeMockContext() {
	const rundown = literal<IBlueprintRundownDB>({
		externalId: RUNDOWN_EXTERNAL_ID,
		name: RUNDOWN_EXTERNAL_ID,
		_id: '',
		showStyleVariantId: ''
	})
	const mockContext = new SegmentContext(rundown, mappingsDefaults)
	mockContext.studioConfig = defaultStudioConfig as any
	mockContext.showStyleConfig = defaultShowStyleConfig as any

	return mockContext
}

const config = getConfig(makeMockContext())

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

const dskEnableObj = literal<TSR.TimelineObjAtemDSK>({
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
})

describe('grafik piece', () => {
	test('kg bund', () => {
		const cue: CueDefinitionGraphic<GraphicInternal> = {
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'bund',
				cue: 'kg',
				textFields: ['Odense', 'Copenhagen']
			},
			start: {
				seconds: 0
			},
			iNewsCommand: 'kg'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				enable: {
					start: 0,
					duration: 4000
				},
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
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
						dskEnableObj
					])
				})
			})
		])
	})

	test('adlib kg bund', () => {
		const cue: CueDefinitionGraphic<GraphicInternal> = {
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'bund',
				cue: 'kg',
				textFields: ['Odense', 'Copenhagen']
			},
			adlib: true,
			iNewsCommand: 'kg'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(adLibPieces).toEqual([
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				uniquenessId: 'gfx_bund - Odense\n - Copenhagen_studio0_graphicsLower_overlay_commentator',
				expectedDuration: 5000,
				tags: [AdlibTags.ADLIB_KOMMENTATOR],
				noHotKey: true,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
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
						dskEnableObj
					])
				})
			}),
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				uniquenessId: 'gfx_bund - Odense\n - Copenhagen_studio0_graphicsLower_overlay_flow',
				expectedDuration: 4000,
				tags: [AdlibTags.ADLIB_FLOW_PRODUCER],
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
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
						dskEnableObj
					])
				})
			})
		])
	})

	test('adlib kg bund (overlay+full allowed)', () => {
		const cue: CueDefinitionGraphic<GraphicInternal> = {
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'bund',
				cue: 'kg',
				textFields: ['Odense', 'Copenhagen']
			},
			adlib: true,
			iNewsCommand: 'kg'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'
		const newConfig = JSON.parse(JSON.stringify(config)) as BlueprintConfig
		newConfig.studio.PreventOverlayWithFull = false

		EvaluateCueGraphic(
			newConfig,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(adLibPieces).toEqual([
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				uniquenessId: 'gfx_bund - Odense\n - Copenhagen_studio0_graphicsLower_overlay_commentator',
				tags: [AdlibTags.ADLIB_KOMMENTATOR],
				expectedDuration: 5000,
				noHotKey: true,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								start: 0
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
						dskEnableObj
					])
				})
			}),
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				uniquenessId: 'gfx_bund - Odense\n - Copenhagen_studio0_graphicsLower_overlay_flow',
				tags: [AdlibTags.ADLIB_FLOW_PRODUCER],
				expectedDuration: 4000,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								start: 0
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
						dskEnableObj
					])
				})
			})
		])
	})

	test('kg bund length', () => {
		const cue: CueDefinitionGraphic<GraphicInternal> = {
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'bund',
				cue: 'kg',
				textFields: ['Odense', 'Copenhagen']
			},
			start: {
				seconds: 10
			},
			iNewsCommand: 'kg'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				enable: {
					start: 10000,
					duration: 4000
				},
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
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
						dskEnableObj
					])
				})
			})
		])
	})

	test('kg bund infinite', () => {
		const cue: CueDefinitionGraphic<GraphicInternal> = {
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'bund',
				cue: 'kg',
				textFields: ['Odense', 'Copenhagen']
			},
			start: {
				seconds: 10
			},
			end: {
				infiniteMode: 'B'
			},
			iNewsCommand: 'kg'
		}
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'bund - Odense\n - Copenhagen',
				enable: {
					start: 10000
				},
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsLower,
				content: literal<GraphicsContent>({
					fileName: 'bund',
					path: 'bund',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: `.studio0_parent_camera_1 & !.adlib_deparent & !.full`
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
						dskEnableObj
					])
				})
			})
		])
	})

	test('kg direkte', () => {
		const cue = literal<CueDefinitionGraphic<GraphicInternal>>({
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'direkte',
				cue: 'kg',
				textFields: ['KØBENHAVN']
			},
			start: {
				seconds: 0
			},
			iNewsCommand: '#kg'
		})
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'direkte - KØBENHAVN',
				enable: {
					start: 0
				},
				lifespan: PieceLifespan.OutOnSegmentEnd,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsIdentPersistent,
				content: literal<GraphicsContent>({
					fileName: 'direkte',
					path: 'direkte',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: `.studio0_parent_camera_1 & !.adlib_deparent & !.full`
							},
							priority: 1,
							layer: GraphicLLayer.GraphicLLayerOverlayIdent,
							content: {
								deviceType: TSR.DeviceType.VIZMSE,
								type: TSR.TimelineContentTypeVizMSE.ELEMENT_INTERNAL,
								templateName: 'direkte',
								templateData: ['KØBENHAVN'],
								channelName: 'OVL1'
							}
						}),
						dskEnableObj
					])
				})
			}),
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'direkte - KØBENHAVN',
				enable: {
					start: 0
				},
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsIdent,
				content: {
					timelineObjects: [
						literal<TSR.TimelineObjAbstractAny>({
							id: '',
							enable: {
								while: '1'
							},
							layer: AbstractLLayer.IdentMarker,
							content: {
								deviceType: TSR.DeviceType.ABSTRACT
							}
						})
					]
				}
			})
		])
	})

	test('kg arkiv', () => {
		const cue = literal<CueDefinitionGraphic<GraphicInternal>>({
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'arkiv',
				cue: 'kg',
				textFields: ['unnamed org']
			},
			start: {
				seconds: 0
			},
			iNewsCommand: '#kg'
		})
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(pieces).toEqual([
			literal<IBlueprintPiece>({
				externalId: partId,
				name: 'arkiv - unnamed org',
				enable: {
					start: 0,
					duration: 4000
				},
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsIdent,
				content: literal<GraphicsContent>({
					fileName: 'arkiv',
					path: 'arkiv',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: `!.full`
							},
							priority: 1,
							layer: GraphicLLayer.GraphicLLayerOverlayIdent,
							content: {
								deviceType: TSR.DeviceType.VIZMSE,
								type: TSR.TimelineContentTypeVizMSE.ELEMENT_INTERNAL,
								templateName: 'arkiv',
								templateData: ['unnamed org'],
								channelName: 'OVL1'
							}
						}),
						dskEnableObj
					])
				})
			})
		])
	})

	test('adlib tlftoptlive', () => {
		const cue = literal<CueDefinitionGraphic<GraphicInternal>>({
			type: CueType.Graphic,
			target: 'OVL',
			graphic: {
				type: 'internal',
				template: 'tlftoptlive',
				cue: 'kg',
				textFields: ['Line 1', 'Line 2']
			},
			adlib: true,
			iNewsCommand: '#kg'
		})
		const pieces: IBlueprintPiece[] = []
		const adLibPieces: IBlueprintAdLibPiece[] = []
		const actions: IBlueprintActionManifest[] = []
		const partId = '0000000001'

		EvaluateCueGraphic(
			config,
			makeMockContext(),
			pieces,
			adLibPieces,
			actions,
			partId,
			cue,
			cue.adlib ? cue.adlib : false,
			dummyPart,
			0
		)
		expect(adLibPieces).toEqual([
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'tlftoptlive - Line 1\n - Line 2',
				lifespan: PieceLifespan.WithinPart,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsTop,
				expectedDuration: 5000,
				tags: ['kommentator'],
				uniquenessId: 'gfx_tlftoptlive - Line 1\n - Line 2_studio0_graphicsTop_overlay_commentator',
				noHotKey: true,
				content: literal<GraphicsContent>({
					fileName: 'tlftoptlive',
					path: 'tlftoptlive',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: `!.full`
							},
							priority: 1,
							layer: GraphicLLayer.GraphicLLayerOverlayTopt,
							content: {
								deviceType: TSR.DeviceType.VIZMSE,
								type: TSR.TimelineContentTypeVizMSE.ELEMENT_INTERNAL,
								templateName: 'tlftoptlive',
								templateData: ['Line 1', 'Line 2'],
								channelName: 'OVL1'
							}
						}),
						dskEnableObj
					])
				})
			}),
			literal<IBlueprintAdLibPiece>({
				_rank: 0,
				externalId: partId,
				name: 'tlftoptlive - Line 1\n - Line 2',
				lifespan: PieceLifespan.OutOnSegmentEnd,
				outputLayerId: SharedOutputLayers.OVERLAY,
				sourceLayerId: SourceLayer.PgmGraphicsTop,
				expectedDuration: 4000,
				tags: ['flow_producer'],
				uniquenessId: 'gfx_tlftoptlive - Line 1\n - Line 2_studio0_graphicsTop_overlay_flow',
				content: literal<GraphicsContent>({
					fileName: 'tlftoptlive',
					path: 'tlftoptlive',
					ignoreMediaObjectStatus: true,
					timelineObjects: literal<TSR.TSRTimelineObj[]>([
						literal<TSR.TimelineObjVIZMSEElementInternal>({
							id: '',
							enable: {
								while: `!.full`
							},
							priority: 1,
							layer: GraphicLLayer.GraphicLLayerOverlayTopt,
							content: {
								deviceType: TSR.DeviceType.VIZMSE,
								type: TSR.TimelineContentTypeVizMSE.ELEMENT_INTERNAL,
								templateName: 'tlftoptlive',
								templateData: ['Line 1', 'Line 2'],
								channelName: 'OVL1'
							}
						}),
						dskEnableObj
					])
				})
			})
		])
	})
})
