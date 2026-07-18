import mammoth from 'mammoth';

async function main() {
  const result = await mammoth.extractRawText({
    path: 'assets/Schedule_20260718190150578.docx'
  });
  console.log(result.value);
}
main().catch(console.error);
