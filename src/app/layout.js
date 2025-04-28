import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PixelPrompt | AI Pixel Art Generator',
  description: 'Generate stunning pixel art sprites instantly with AI technology.',
  authors: [{ name: 'Timilehin Osiyoku', url: 'https://pixelprompt-two.vercel.app/' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
