import { BlueprintResultPart, IBlueprintPart, NotesContext } from '@sofie-automation/blueprints-integration'
import { literal, PartDefinition, PartTime, TV2BlueprintConfigBase, TV2StudioConfigBase } from 'tv2-common'

export function CreatePartKamBase<
	StudioConfig extends TV2StudioConfigBase,
	ShowStyleConfig extends TV2BlueprintConfigBase<StudioConfig>
>(
	_context: NotesContext,
	config: ShowStyleConfig,
	partDefinition: PartDefinition,
	totalWords: number
): { part: BlueprintResultPart; duration: number; invalid?: true } {
	const partTime = PartTime(config, partDefinition, totalWords, false)

	const part = literal<IBlueprintPart>({
		externalId: partDefinition.externalId,
		title: partDefinition.rawType,
		metaData: {},
		expectedDuration: partTime > 0 ? partTime : 0
	})

	return {
		part: {
			part,
			pieces: [],
			adLibPieces: []
		},
		duration: partTime
	}
}
