import '@/app/globals.css';
import { inter, notoSansJP } from '@/app/ui/fonts';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
