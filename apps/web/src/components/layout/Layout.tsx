import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Plus, Home, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { href: '/',         label: 'Beranda',       icon: Home },
    { href: '/projects', label: 'Project Saya',  icon: FolderOpen },
    { href: '/create',   label: 'Buat Cerita',   icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <Film className="h-5 w-5" />
            <span>Legenda AI Studio</span>
          </Link>
          <nav className="ml-8 flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent',
                  location.pathname === href
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
