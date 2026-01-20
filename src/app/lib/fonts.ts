import { Inter, Lusitana, Noto_Sans_JP } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
