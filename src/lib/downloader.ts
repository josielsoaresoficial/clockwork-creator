import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

export async function downloadProjectSource() {
  const loadingToast = toast.loading('Preparando download do projeto...');
  
  try {
    const zip = new JSZip();
    
    // Note: In a real implementation, you would need to fetch these files
    // from your server or bundle them. This is a simplified version.
    
    // Add a README
    zip.file('README.md', `# Steam Key Generator - Source Code

This is the complete source code for the Steam Key Generator application.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Build

   \`\`\`bash
   npm run build
   \`\`\`

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Lucide React

Generated on: ${new Date().toLocaleString('pt-BR')}
`);

    // Generate the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Download the file
    const timestamp = new Date().toISOString().split('T')[0];
    saveAs(blob, `steam-key-generator-source-${timestamp}.zip`);
    
    toast.success('Projeto baixado com sucesso!', { id: loadingToast });
  } catch (error) {
    console.error('Error downloading project:', error);
    toast.error('Erro ao baixar o projeto', { id: loadingToast });
  }
}