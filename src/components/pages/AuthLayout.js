import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <main className="auth-shell min-h-screen overflow-hidden relative">
    <div className="absolute inset-0 pointer-events-none bg-auth-hero"></div>
    <div className="absolute -left-24 top-12 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float-up" />
    <div className="absolute right-0 top-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float-up" />
    <div className="relative z-10 px-6 py-10 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-white/95 shadow-glow ring-1 ring-slate-200/70 backdrop-blur-2xl overflow-hidden auth-grid">
        <section className="hidden lg:flex items-center justify-center bg-primary text-white px-10 relative overflow-hidden">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-5 py-4 backdrop-blur-xl ring-1 ring-white/20">
              <div className="h-10 w-10 rounded-2xl bg-secondary/20 flex items-center justify-center text-white text-lg font-semibold">E</div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Ethiotech IT Solutions</p>
                <p className="mt-1 text-2xl font-semibold">Secure platform</p>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight">Premium productivity for modern teams.</h1>
              <p className="max-w-md text-slate-300/90 leading-7">Build trust with a crisp, intelligent experience that makes every login feel secure and effortless.</p>
            </div>
            <div className="grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">Enterprise-grade performance</div>
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">Secure authentication flows</div>
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">Modern trusted experience</div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.3),_transparent_33%)]" />
        </section>

        <section className="relative p-8 sm:p-10 lg:p-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="h-10 w-10 rounded-3xl bg-slate-900/95 shadow-lg ring-1 ring-white/10 flex items-center justify-center text-white font-bold">E</div>
            </div>
            <div className="text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-secondary hover:text-accent transition">Sign In</Link></div>
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  </main>
);

export default AuthLayout;
