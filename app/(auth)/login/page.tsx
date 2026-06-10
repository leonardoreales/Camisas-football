"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

function LoginCard() {
  const { signInWithGoogle } = useAuth();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? undefined;
  const error = params.get("error");

  return (
    <div className="w-full max-w-md">
      <div className="border-edge bg-surface rounded-md border p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight"
          >
            KIT<span className="text-accent-green">STORE</span>
          </Link>
          <p className="text-muted mt-3 text-sm">
            Ingresa para ver tus pedidos y comprar más rápido.
          </p>
        </div>

        {error && (
          <div className="border-accent-red/40 bg-accent-red/10 text-accent-red mb-6 rounded border px-4 py-3 text-sm">
            No se pudo iniciar sesión. Intenta de nuevo.
          </div>
        )}

        <Button
          variant="surface"
          size="lg"
          className="w-full"
          onClick={() => signInWithGoogle(redirect)}
        >
          <GoogleIcon />
          Continuar con Google
        </Button>

        <p className="text-disabled mt-6 text-center text-xs">
          Al continuar aceptas nuestros términos y la política de privacidad.
        </p>
      </div>

      <p className="text-muted mt-6 text-center text-sm">
        <Link href="/" className="hover:text-accent-green transition-colors">
          ← Volver a la tienda
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Suspense fallback={null}>
        <LoginCard />
      </Suspense>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.2 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.2 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c4.9 0 9.4-1.9 12.8-5l-5.9-5c-2 1.5-4.5 2.4-6.9 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l5.9 5c-.4.4 6.9-5 6.9-15 0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
