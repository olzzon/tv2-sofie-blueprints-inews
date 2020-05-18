// import { DeviceType, TimelineObjAbstractAny } from 'timeline-state-resolver-types'
import {
	BlueprintResultPart,
	IBlueprintAdLibPiece,
	IBlueprintPiece,
	PartContext,
	PieceLifespan,
	PieceMetaData
} from 'tv-automation-sofie-blueprints-integration'
import { CreateAdlibServer, CreatePartServerBase, literal, MakeContentServer, PartDefinition } from 'tv2-common'
import { AdlibTags, CueType, Enablers, MEDIA_PLAYER_AUTO } from 'tv2-constants'
// import _ = require('underscore')
import {
	// OfftubeAbstractLLayer,
	OfftubeAtemLLayer,
	OfftubeCasparLLayer,
	OfftubeSisyfosLLayer
} from '../../tv2_offtube_studio/layers'
import { OffTubeShowstyleBlueprintConfig } from '../helpers/config'
import { OfftubeEvaluateCues } from '../helpers/EvaluateCues'
import { MergePiecesAsTimeline } from '../helpers/MergePiecesAsTimeline'
import { OffTubeSourceLayer } from '../layers'

export function OfftubeCreatePartServer(
	context: PartContext,
	config: OffTubeShowstyleBlueprintConfig,
	partDefinition: PartDefinition,
	segmentExternalId: string
): BlueprintResultPart {
	const basePartProps = CreatePartServerBase(context, config, partDefinition)

	if (basePartProps.invalid) {
		return basePartProps.part
	}

	let part = basePartProps.part.part
	const pieces = basePartProps.part.pieces
	const adLibPieces = basePartProps.part.adLibPieces
	const file = basePartProps.file
	// const duration = basePartProps.duration

	part = {
		...part
		// TODO: Effekt
		// ...CreateEffektForpart(context, config, partDefinition, pieces)
	}
	// TODO: Script
	// AddScript(partDefinition, pieces, duration)

	pieces.push(
		literal<IBlueprintPiece>({
			_id: '',
			externalId: partDefinition.externalId,
			name: file,
			enable: { start: 0 },
			outputLayerId: 'pgm',
			sourceLayerId: OffTubeSourceLayer.PgmSourceSelect, // TODO: Server
			infiniteMode: PieceLifespan.OutOnNextPart,
			metaData: literal<PieceMetaData>({
				mediaPlayerSessions: [segmentExternalId]
			}),
			content: MakeContentServer(file, segmentExternalId, partDefinition, config, {
				Caspar: {
					ClipPending: OfftubeCasparLLayer.CasparPlayerClipPending
				},
				Sisyfos: {
					ClipPending: OfftubeSisyfosLLayer.SisyfosSourceClipPending
				},
				ATEM: {
					MEPGM: OfftubeAtemLLayer.AtemMEProgram
				}
			}),
			adlibPreroll: config.studio.CasparPrerollDuration
		})
	)

	OfftubeEvaluateCues(context, config, pieces, adLibPieces, partDefinition.cues, partDefinition, {})

	if (pieces.length === 0) {
		part.invalid = true
	}

	let adlibServer: IBlueprintAdLibPiece = CreateAdlibServer(
		config,
		0,
		partDefinition.externalId,
		MEDIA_PLAYER_AUTO,
		partDefinition,
		file,
		false,
		{
			PgmServer: OffTubeSourceLayer.SelectedAdLibServer,
			PgmVoiceOver: OffTubeSourceLayer.SelectedAdLibVoiceOver,
			Caspar: {
				ClipPending: OfftubeCasparLLayer.CasparPlayerClipPending
			},
			ATEM: {
				MEPGM: OfftubeAtemLLayer.AtemMEClean
			},
			Sisyfos: {
				ClipPending: OfftubeSisyfosLLayer.SisyfosSourceClipPending
			}
		},
		{
			isOfftube: true,
			tagAsAdlib: true,
			enabler: Enablers.OFFTUBE_ENABLE_SERVER
		}
	)
	adlibServer.toBeQueued = true
	adlibServer.canCombineQueue = true
	adlibServer.tags = [AdlibTags.OFFTUBE_100pc_SERVER]
	adlibServer.name = file

	// TODO: Merge graphics into server part as timeline objects
	OfftubeEvaluateCues(context, config, pieces, adLibPieces, partDefinition.cues, partDefinition, {
		adlibsOnly: true
	})

	adlibServer = MergePiecesAsTimeline(context, config, partDefinition, adlibServer, [
		CueType.Grafik,
		CueType.TargetEngine,
		CueType.VIZ
	])
	adLibPieces.push(adlibServer)

	// Flow producer
	/*const adlibServerFlowProducer = _.clone(adlibServer)
	adlibServerFlowProducer.tags = ['flow_producer']
	adlibServerFlowProducer.content!.timelineObjects.push(
		literal<TimelineObjAbstractAny>({
			id: '',
			enable: {
				while: '1'
			},
			priority: 1,
			layer: OfftubeAbstractLLayer.OfftubeAbstractLLayerPgmEnabler,
			content: {
				deviceType: DeviceType.ABSTRACT
			},
			classes: [Enablers.OFFTUBE_ENABLE_SERVER]
		})
	)
	adlibServerFlowProducer.infiniteMode = PieceLifespan.OutOnNextPart
	adlibServerFlowProducer.canCombineQueue = false
	adlibServerFlowProducer.externalId = `${adlibServerFlowProducer.externalId}-flowProducer`
	adLibPieces.push(adlibServerFlowProducer)*/

	if (pieces.length === 0) {
		part.invalid = true
	}

	return {
		part,
		adLibPieces,
		pieces
	}
}
