'use client';

import { CharacterIcons } from '@/data/characters.data';
import { Character } from './CharacterDetails';
import { Avatar, AvatarImage } from './ui/avatar';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { on } from 'events';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type PullListProps = {
  characters: Character[];
  onRemove: (id: number) => void;
};

const avatarIcons: Record<string, string> = CharacterIcons;

export default function PullList({ characters, onRemove }: PullListProps) {
  if (characters.length === 0) return <div className="text-center text-white">No characters Added</div>;
  return (
    <div className="grid grid-cols-1 gap-2">
      {characters.map((character) => (
        <Card key={character.id} className="grid grid-cols-4 items-center p-4 bg-slate-400">
          {/* column 1 */}
          <div className="justify-items-center">
            <Avatar className={`w-20 h-20  ${character.rarity === 5 ? 'border border-r-4 border-b-4 border-yellow-300' : 'border border-r-4 border-b-4 border-purple-500'}`}>
              <AvatarImage src={avatarIcons[character.name]} />
            </Avatar>
            <CardTitle className="text-lg">{character.name}</CardTitle>
          </div>

          {/* column 2 */}
          <CardHeader className="font-semibold">
            <p className="text-sm ">Attribute: {character.attribute}</p>
            <p className="text-sm ">Weapon: {character.weapon}</p>
            <p className="text-sm ">Rarity: {character.rarity}★</p>
          </CardHeader>

          {/* column 3 */}
          <PullWish />

          {/* column 4 */}
          <div className="justify-self-end">
            <Button onClick={() => onRemove(character.id)} variant="destructive">
              <Trash2 />
              Remove
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function PullWish() {
  return (
    <div className="font-semibold">
      <RadioGroup className="grid grid-cols-3">
        <div className="flex flex-col items-center gap-3">
          Pull
          <RadioGroupItem value="pull" />
        </div>
        <div className="flex flex-col items-center gap-3">
          Maybe
          <RadioGroupItem value="maybe" />
        </div>
        <div className="flex flex-col items-center gap-3">
          Skip
          <RadioGroupItem value="skip" />
        </div>
      </RadioGroup>
    </div>
  );
}
