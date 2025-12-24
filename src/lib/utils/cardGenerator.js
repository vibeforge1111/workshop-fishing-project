export async function generateCatchCard(catchData, template = 'classic') {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Load catch image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = catchData.image_url;
  });

  if (template === 'classic') {
    await drawClassicTemplate(ctx, img, catchData);
  } else if (template === 'trophy') {
    await drawTrophyTemplate(ctx, img, catchData);
  } else if (template === 'neon') {
    await drawNeonTemplate(ctx, img, catchData);
  }

  return canvas.toDataURL('image/png');
}

async function drawClassicTemplate(ctx, img, catchData) {
  const { width, height } = ctx.canvas;

  // Background gradient (ocean blue)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1E40AF');
  gradient.addColorStop(1, '#1E3A8A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw catch image (square, centered)
  const imgSize = width - 80;
  const imgY = 100;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 40, imgY, imgSize, imgSize, 24);
  ctx.clip();

  // Cover fit the image
  const scale = Math.max(imgSize / img.width, imgSize / img.height);
  const x = (imgSize - img.width * scale) / 2 + 40;
  const y = (imgSize - img.height * scale) / 2 + imgY;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();

  // Stats section
  const statsY = imgY + imgSize + 60;

  // Species name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 56px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(catchData.species || 'Unknown Species', width / 2, statsY);

  // Weight and length
  ctx.font = '36px system-ui, sans-serif';
  ctx.fillStyle = '#FBBF24';
  let statsText = [];
  if (catchData.weight_lb) statsText.push(`${catchData.weight_lb} lb`);
  if (catchData.length_in) statsText.push(`${catchData.length_in} in`);
  ctx.fillText(statsText.join(' • ') || 'No measurements', width / 2, statsY + 60);

  // Location
  if (catchData.location_name) {
    ctx.fillStyle = '#93C5FD';
    ctx.font = '28px system-ui, sans-serif';
    ctx.fillText(`📍 ${catchData.location_name}`, width / 2, statsY + 110);
  }

  // Username
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '32px system-ui, sans-serif';
  ctx.fillText(`@${catchData.user?.username || 'angler'}`, width / 2, height - 120);

  // FishFlex branding
  ctx.fillStyle = '#60A5FA';
  ctx.font = 'bold 28px system-ui, sans-serif';
  ctx.fillText('🐟 FishFlex', width / 2, height - 60);
}

async function drawTrophyTemplate(ctx, img, catchData) {
  const { width, height } = ctx.canvas;

  // Dark background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Gold border
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Trophy banner at top
  ctx.fillStyle = '#FBBF24';
  ctx.fillRect(0, 0, width, 80);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏆 TROPHY CATCH 🏆', width / 2, 52);

  // Draw catch image
  const imgSize = width - 120;
  const imgY = 120;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 60, imgY, imgSize, imgSize, 16);
  ctx.clip();
  const scale = Math.max(imgSize / img.width, imgSize / img.height);
  const x = (imgSize - img.width * scale) / 2 + 60;
  const y = (imgSize - img.height * scale) / 2 + imgY;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();

  // Gold frame around image
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 4;
  ctx.beginPath();
  roundRect(ctx, 60, imgY, imgSize, imgSize, 16);
  ctx.stroke();

  // Stats
  const statsY = imgY + imgSize + 60;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px system-ui, sans-serif';
  ctx.fillText(catchData.species || 'Unknown', width / 2, statsY);

  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 40px system-ui, sans-serif';
  let stats = [];
  if (catchData.weight_lb) stats.push(`${catchData.weight_lb} LB`);
  if (catchData.length_in) stats.push(`${catchData.length_in} IN`);
  ctx.fillText(stats.join(' | '), width / 2, statsY + 55);

  // User
  ctx.fillStyle = '#94A3B8';
  ctx.font = '28px system-ui, sans-serif';
  ctx.fillText(`Caught by @${catchData.user?.username || 'angler'}`, width / 2, height - 100);

  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 24px system-ui, sans-serif';
  ctx.fillText('🐟 FishFlex', width / 2, height - 50);
}

async function drawNeonTemplate(ctx, img, catchData) {
  const { width, height } = ctx.canvas;

  // Pure black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Draw image
  const imgSize = width - 80;
  const imgY = 80;
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 40, imgY, imgSize, imgSize, 20);
  ctx.clip();
  const scale = Math.max(imgSize / img.width, imgSize / img.height);
  const x = (imgSize - img.width * scale) / 2 + 40;
  const y = (imgSize - img.height * scale) / 2 + imgY;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  ctx.restore();

  // Neon glow effect on text
  const statsY = imgY + imgSize + 80;

  // Glow
  ctx.shadowColor = '#3B82F6';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#3B82F6';
  ctx.font = 'bold 52px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(catchData.species || 'Unknown', width / 2, statsY);

  ctx.shadowColor = '#FBBF24';
  ctx.fillStyle = '#FBBF24';
  ctx.font = 'bold 44px system-ui, sans-serif';
  let stats = [];
  if (catchData.weight_lb) stats.push(`${catchData.weight_lb} lb`);
  if (catchData.length_in) stats.push(`${catchData.length_in}"`);
  ctx.fillText(stats.join(' / '), width / 2, statsY + 65);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '28px system-ui, sans-serif';
  ctx.fillText(`@${catchData.user?.username || 'angler'}`, width / 2, height - 100);

  ctx.shadowColor = '#3B82F6';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#3B82F6';
  ctx.font = 'bold 28px system-ui, sans-serif';
  ctx.fillText('FishFlex', width / 2, height - 50);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
