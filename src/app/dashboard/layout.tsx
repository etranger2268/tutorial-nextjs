import SideNav from '@/app/ui/dashboard/sidenav';
import { Suspense } from 'react';

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Suspense fallback={<p>Loading...</p>}>
          <SideNav />
        </Suspense>
      </div>
      <div className="grow p-6 md:overflow-y-auto">{children}</div>
    </div>
  );
}
