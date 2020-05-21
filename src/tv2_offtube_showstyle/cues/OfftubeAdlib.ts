import { IBlueprintAdLibPiece, PartContext } from 'tv-automation-sofie-blueprints-integration'
import {
	CreateAdlibServer,
	CueDefinitionAdLib,
	CueDefinitionDVE,
	GetDVETemplate,
	literal,
	PartDefinition,
	PieceMetaData,
	TemplateIsValid
} from 'tv2-common'
import { AdlibTags, CueType } from 'tv2-constants'
import { OfftubeAtemLLayer, OfftubeCasparLLayer, OfftubeSisyfosLLayer } from '../../tv2_offtube_studio/layers'
import { OfftubeMakeContentDVE } from '../content/OfftubeDVEContent'
import { OffTubeShowstyleBlueprintConfig } from '../helpers/config'
import { OffTubeSourceLayer } from '../layers'

export function OfftubeEvaluateAdLib(
	context: PartContext,
	config: OffTubeShowstyleBlueprintConfig,
	adLibPieces: IBlueprintAdLibPiece[],
	partId: string,
	parsedCue: CueDefinitionAdLib,
	partDefinition: PartDefinition,
	rank: number
) {
	if (parsedCue.variant.match(/server/i)) {
		// Create server AdLib
		const file = partDefinition.fields.videoId
		const duration = Number(partDefinition.fields.tapeTime) * 1000 || 0

		const adlibServer = CreateAdlibServer(config, rank, partId, `adlib_server_${file}`, partDefinition, file, false, {
			Caspar: {
				ClipPending: OfftubeCasparLLayer.CasparPlayerClipPending
			},
			Sisyfos: {
				ClipPending: OfftubeSisyfosLLayer.SisyfosSourceClipPending
			},
			ATEM: {
				MEPGM: OfftubeAtemLLayer.AtemMEProgram
			},
			STICKY_LAYERS: config.stickyLayers,
			PgmServer: OffTubeSourceLayer.SelectedAdLibServer,
			PgmVoiceOver: OffTubeSourceLayer.SelectedAdLibVoiceOver
		})
		adlibServer.toBeQueued = true
		adlibServer.canCombineQueue = true
		adlibServer.tags = [AdlibTags.OFFTUBE_100pc_SERVER]
		adlibServer.name = file
		// TODO: This should happen in above function
		adlibServer.expectedDuration = duration

		adLibPieces.push(adlibServer)

		const adlibFlowProducer = CreateAdlibServer(
			config,
			rank,
			partId,
			`adlib_server_${file}`,
			partDefinition,
			file,
			false,
			{
				Caspar: {
					ClipPending: OfftubeCasparLLayer.CasparPlayerClipPending
				},
				Sisyfos: {
					ClipPending: OfftubeSisyfosLLayer.SisyfosSourceClipPending
				},
				ATEM: {
					MEPGM: OfftubeAtemLLayer.AtemMEProgram
				},
				STICKY_LAYERS: config.stickyLayers,
				PgmServer: OffTubeSourceLayer.PgmServer,
				PgmVoiceOver: OffTubeSourceLayer.PgmVoiceOver
			}
		)
		adlibFlowProducer.toBeQueued = true
		adlibFlowProducer.canCombineQueue = true
		adlibFlowProducer.tags = [AdlibTags.ADLIB_FLOW_PRODUCER]
		adlibFlowProducer.name = file
		// TODO: This should happen in above function
		adlibFlowProducer.expectedDuration = duration

		adLibPieces.push(adlibFlowProducer)
	} else {
		// DVE
		if (!parsedCue.variant) {
			return
		}

		const rawTemplate = GetDVETemplate(config.showStyle.DVEStyles, parsedCue.variant) // TODO - is this correct?
		if (!rawTemplate) {
			context.warning(`Could not find template ${parsedCue.variant}`)
			return
		}

		if (!TemplateIsValid(JSON.parse(rawTemplate.DVEJSON as string))) {
			context.warning(`Invalid DVE template ${parsedCue.variant}`)
			return
		}

		const cueDVE: CueDefinitionDVE = {
			type: CueType.DVE,
			template: parsedCue.variant,
			sources: parsedCue.inputs ? parsedCue.inputs : {},
			labels: parsedCue.bynavn ? [parsedCue.bynavn] : [],
			iNewsCommand: 'DVE'
		}

		console.log(JSON.stringify(cueDVE))

		const content = OfftubeMakeContentDVE(context, config, partDefinition, cueDVE, rawTemplate, false, true)

		let sticky: { [key: string]: { value: number; followsPrevious: boolean } } = {}

		content.stickyLayers.forEach(layer => {
			sticky = {
				...sticky,
				[layer]: {
					value: 1,
					followsPrevious: false
				}
			}
		})

		adLibPieces.push(
			literal<IBlueprintAdLibPiece>({
				_rank: rank,
				externalId: partId,
				name: `DVE: ${parsedCue.variant}`,
				sourceLayerId: OffTubeSourceLayer.SelectedAdLibDVE,
				outputLayerId: 'pgm',
				toBeQueued: true,
				content: content.content,
				invalid: !content.valid,
				metaData: literal<PieceMetaData>({
					stickySisyfosLevels: sticky
				})
			})
		)

		adLibPieces.push(
			literal<IBlueprintAdLibPiece>({
				_rank: rank,
				externalId: partId,
				name: `DVE: ${parsedCue.variant}`,
				sourceLayerId: OffTubeSourceLayer.PgmDVE,
				outputLayerId: 'pgm',
				toBeQueued: true,
				content: content.content,
				invalid: !content.valid,
				tags: [AdlibTags.ADLIB_FLOW_PRODUCER],
				metaData: literal<PieceMetaData>({
					stickySisyfosLevels: sticky
				})
			})
		)
	}
}