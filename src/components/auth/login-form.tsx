import { useState } from 'react';
import { BrandMark } from '../brand-mark';

type LoginProps = {
  onLogin: (input: { username: string; password: string }) => Promise<void>;
};

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onLogin({ username, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#2B1A11]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_34%),linear-gradient(135deg,_#2B1A11_0%,_#4A2F21_45%,_#7A573D_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute -top-12 -right-10 hidden h-44 w-44 rounded-full bg-white/10 p-7 shadow-2xl backdrop-blur md:block">
        <img src="/imagotipo.webp" alt="" aria-hidden="true" className="h-full w-full object-contain opacity-70" />
      </div>
      <div className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-[#D8B08C]/15 blur-3xl" />

      <div className="relative z-10 mx-4 w-full max-w-md">
        <div className="rounded-2xl border border-[#6F4E37]/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 flex flex-col items-center">
            <BrandMark
              className="flex-col gap-4 text-center"
              badgeClassName="h-28 w-28 rounded-[2rem] text-3xl tracking-[0.35em]"
              labelClassName="text-[#3C2415]"
            />
            <h1 className="text-center text-[#3C2415]">Sistema de Gestion</h1>
            <p className="mt-2 text-center text-[#6F4E37]/70">Bienvenido al cafe de tus suenos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="mb-2 block text-[#3C2415]">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-lg border border-[#6F4E37]/30 bg-white px-4 py-3 focus:ring-2 focus:ring-[#6F4E37] focus:outline-none"
                placeholder="Ingrese su usuario"
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-[#3C2415]">
                Contrasena
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[#6F4E37]/30 bg-white px-4 py-3 focus:ring-2 focus:ring-[#6F4E37] focus:outline-none"
                placeholder="Ingrese su contrasena"
                disabled={isSubmitting}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#6F4E37] py-3 text-white shadow-lg transition-colors duration-200 hover:bg-[#5a3d2b] hover:shadow-xl"
            >
              {isSubmitting ? 'Validando...' : 'Iniciar sesion'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6F4E37]/60">
            <p>Usuario demo: rrhh / Contrasena: rrhh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
