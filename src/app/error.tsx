'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="font-rubik text-3xl font-bold text-primary mb-4">Algo salió mal</h2>
        <button onClick={reset} className="btn-primary">Reintentar</button>
      </div>
    </div>
  );
}
