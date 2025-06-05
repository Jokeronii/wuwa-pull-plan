'use client';

import { useRef, useState } from 'react';
import CharacterDetails, { Character } from './CharacterDetails';
import PullList from './PullList';
import { Card, CardHeader, CardTitle } from './ui/card';
import domtoimage from 'dom-to-image-more';

export default function CharsList() {
  const [pullList, setPullList] = useState<Character[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const pullListRef = useRef<HTMLDivElement>(null);

  const handleCaptureImage = async () => {
    if (!pullListRef.current) return;

    try {
      const dataUrl = await domtoimage.toJpeg(pullListRef.current, {
        copyDefaultStyles: false,
      });
      const link = document.createElement('a');

      link.download = 'pull-list.jpg';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log('Error handleCaptureImage: ', error);
    }
  };

  const handleSelectCharacter = () => setIsSelected(!isSelected);
  const handleCharacterList = (character: Character) => {
    //cari id yg sama, jika sama jangan tambah ke list
    if (!pullList.find((char) => char.id === character.id))
      //set list char
      setPullList([...pullList, character]);
  };

  const handleRemoveCharacter = (id: number) => {
    setPullList(pullList.filter((char) => char.id !== id));
  };

  return (
    // for show list selected character
    <div className="grid grid-cols-2 m-10 gap-4">
      <Card className="bg-slate-800 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-center text-white">Character Pull List</CardTitle>
          <button onClick={handleCaptureImage} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
            Download as Image
          </button>
        </CardHeader>
        <div className="px-4" id="pull-list" ref={pullListRef}>
          <PullList characters={pullList} onRemove={handleRemoveCharacter} />
        </div>
      </Card>

      {/* for select character */}
      <Card className="bg-slate-800 border border-slate-800">
        <CardHeader>
          <CardTitle className="text-center text-white">Add Character to Pull List</CardTitle>
        </CardHeader>
        <div className="px-4">
          <CharacterDetails onAdd={handleCharacterList} selectedCharacters={pullList} />
        </div>
      </Card>
    </div>
  );
}
