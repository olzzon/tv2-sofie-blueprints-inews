import { AdlibActionType } from 'tv2-constants'
import { PartDefinition } from '../inewsConversion'

interface ActionBase {
	type: AdlibActionType
}

export interface ActionSelectServerClip extends ActionBase {
	type: AdlibActionType.SELECT_SERVER_CLIP
	file: string
	partDefinition: PartDefinition
	duration: number
}

export interface ActionCutToCamera extends ActionBase {
	type: AdlibActionType.CUT_TO_CAMERA
	queue: boolean
	name: string
}

export type TV2AdlibAction = ActionSelectServerClip
