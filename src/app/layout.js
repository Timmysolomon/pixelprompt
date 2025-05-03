import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import SessionWrapper from '@/components/SessionWrapper';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
  title: 'PixelPrompt',
  description: 'Generate futuristic pixel art with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
