import mammoth from 'mammoth';
import * as fs from 'fs';

async function main() {
  const result = await mammoth.extractRawText({
    path: 'assets/15th Round Hainan Regatta 2026 NOTICE OF RACE 竞赛通知-英文版_20260718182308726.docx'
  });
  const text = result.value;
  // Find Schedule section
  const scheduleIdx = text.indexOf('8. SCHEDULE');
  if (scheduleIdx >= 0) {
    console.log(text.substring(scheduleIdx, scheduleIdx + 3000));
  } else {
    // Try alternative
    const idx2 = text.indexOf('Schedule');
    if (idx2 >= 0) {
      console.log(text.substring(idx2, idx2 + 3000));
    }
  }
}
main().catch(console.error);
