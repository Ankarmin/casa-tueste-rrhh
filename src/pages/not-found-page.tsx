import { Link } from 'react-router-dom';
import { buttonVariants } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Casa Tueste</p>
        <h1 className="mt-4 text-5xl font-semibold text-foreground">404</h1>
        <p className="mt-3 text-lg text-muted-foreground">La ruta que intentaste abrir no existe.</p>
        <Link to="/" className={buttonVariants({ className: 'mt-8 bg-gradient-primary text-primary-foreground' })}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
