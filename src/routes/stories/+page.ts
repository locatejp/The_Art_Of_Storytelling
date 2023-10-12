import type { PageLoad } from './$types'

const campfireTaleTitles = [
  'Whispers in the Woods',
  'The Haunting of Hollow Hill',
  'The Lost Expedition',
  'Cursed Waters: The Legend of Black Lake',
  'The Phantom Lantern',
  'Echoes from the Abandoned Mansion',
  "The Enchanted Forest's Secret",
  'The Moonlit Graveyard',
  'The Ghost Ship of Forgotten Shores',
  'The Curse of the Crimson Amulet',
]

export const load = (async () => {
  return {
    campfireTaleTitles,
  }
}) satisfies PageLoad
