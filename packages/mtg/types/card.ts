type CardFace = {
	name: string
	mana_cost: string
	type_line: string
	oracle_text: string
	image_uris: any
}

type CardImageUris = {
	small: string
	normal: string
	large: string
	png: string
	art_crop: string
	border_crop: string
}

export interface Card {
	id: string | null
	name: string
	lang: string
	rarity: string
	type_line: string
	image_uris: CardImageUris
	card_faces: CardFace[]
	frame_effects: string[]
	oracle_text: string
}
