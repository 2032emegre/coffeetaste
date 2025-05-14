import { NextRequest } from 'next/server';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import Chart from 'chart.js/auto';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tasting = JSON.parse(searchParams.get('tasting') || '{}');

  const width = 300;
  const height = 300;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: 'radar' as const,
    data: {
      labels: ['酸味', '甘味', '濃厚さ', 'ボディ', 'バランス', 'クリーン度', '余韻'],
      datasets: [{
        label: 'テイスティング',
        data: [
          tasting.acidity || 0,
          tasting.sweetness || 0,
          tasting.richness || 0,
          tasting.body || 0,
          tasting.balance || 0,
          tasting.cleanliness || 0,
          tasting.aftertaste || 0,
        ],
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'black',
        borderWidth: 2,
        pointBackgroundColor: 'black',
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, color: '#333' },
          pointLabels: {
            font: { size: 13 },
            color: '#111',
            padding: 2,
          },
          angleLines: { display: true, color: '#bbb' },
          grid: { color: '#bbb' },
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);

  return new Response(image, {
    headers: { 'Content-Type': 'image/png' }
  });
} 