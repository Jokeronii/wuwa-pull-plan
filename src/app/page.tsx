import CharsList from '@/components/CharsList';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center m-6">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-white">Wuthering Waves Pull Plan</h1>
      </div>
      <CharsList />
    </div>
  );
}
