import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="font-rubik text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-rubik text-2xl font-semibold mb-4">Página no encontrada</h2>
        <Link href="/" className="btn-primary inline-block">Volver al inicio</Link>
      </div>
    </div>
  );
}
