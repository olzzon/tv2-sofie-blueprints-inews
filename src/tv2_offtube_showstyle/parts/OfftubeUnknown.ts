import {
	IBlueprintAdLibPiece,
	IBlueprintPart,
	IBlueprintPiece,
	PartContext
} from 'tv-automation-sofie-blueprints-integration'
import { AddScript, GetJinglePartProperties, literal, PartDefinition, PartTime } from 'tv2-common'
import { CueType } from 'tv2-constants'
import { OffTubeShowstyleBlueprintConfig } from '../helpers/config'
import { OfftubeEvaluateCues } from '../helpers/EvaluateCues'
import { OffTubeSourceLayer } from '../layers'

export function CreatePartUnknown(
	context: PartContext,
	config: OffTubeShowstyleBlueprintConfig,
	partDefinition: PartDefinition,
	totalWords: number,
	asAdlibs?: boolean
) {
	const partTime = PartTime(config, partDefinition, totalWords)

	let part = literal<IBlueprintPart>({
		externalId: partDefinition.externalId,
		title: partDefinition.type + ' - ' + partDefinition.rawType,
		metaData: {},
		typeVariant: '',
		autoNext: false,
		expectedDuration: partTime
	})

	const adLibPieces: IBlueprintAdLibPiece[] = []
	const pieces: IBlueprintPiece[] = []

	OfftubeEvaluateCues(context, config, pieces, adLibPieces, partDefinition.cues, partDefinition, { adlib: asAdlibs })
	part = { ...part, ...GetJinglePartProperties(context, config, partDefinition) }

	if (partDefinition.cues.filter(cue => cue.type === CueType.DVE).length) {
		part.prerollDuration = config.studio.CasparPrerollDuration
	}

	AddScript(partDefinition, pieces, partTime, OffTubeSourceLayer.PgmScript)

	if (pieces.length === 0) {
		part.invalid = true
	}

	return {
		part,
		adLibPieces,
		pieces
	}
}
