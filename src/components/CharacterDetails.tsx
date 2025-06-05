import { Avatar, AvatarImage } from './ui/avatar';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { attributeIcons, CharacterIcons, wutheringWavesCharacters } from '@/data/characters.data';

export type Character = {
  id: number;
  name: string;
  rarity: number;
  attribute: string;
  weapon: string;
};

interface CharacterDetailsProps {
  onAdd: (Character: Character) => void;
  selectedCharacters: Character[];
}

const resonatorAttributeIcons: Record<string, string> = attributeIcons;
const resonatorAvatarIcons: Record<string, string> = CharacterIcons;

export default function CharacterDetails({ onAdd, selectedCharacters }: CharacterDetailsProps) {
  const characters = wutheringWavesCharacters;
  const isCharacterSelected = (id: number) => selectedCharacters.some((char) => char.id === id);
  //check apakah rarity === 5 star

  return (
    //{ id: 1, name: 'Aalto', rarity: 4, attribute: 'Aero', weapon: 'Pistols' },
    <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-1">
      {characters.map((character) => {
        const alreadySelected = isCharacterSelected(character.id);
        const isFiveStarCharacter = character.rarity === 5;

        return (
          <Tooltip key={character.id}>
            <TooltipTrigger asChild>
              <Card key={character.id} className={`p-4 cursor-pointer hover:bg-muted transition ${alreadySelected ? 'opacity-50 pointer-events-none' : ''} `} onClick={() => onAdd(character)}>
                <CardHeader className="flex flex-col items-center space-y-2">
                  <Avatar className={`w-16 h-16  ${isFiveStarCharacter ? 'border-r-4 border-b-4 border-yellow-300' : 'border-r-4 border-b-4 border-purple-500'}`}>
                    <AvatarImage src={resonatorAvatarIcons[character.name]} />
                  </Avatar>
                  <CardTitle className="text-center">{character.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Attribute: {character.attribute}</p>
                  <img src={resonatorAttributeIcons[character.attribute]} alt={character.attribute} className="w-6 h-6" />
                  <p className="text-sm text-muted-foreground">Weapon: {character.weapon}</p>
                  <p className="text-sm text-muted-foreground">Rarity: {character.rarity}★</p>
                </CardHeader>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add {character.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
