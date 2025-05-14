import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // 福岡県博多区の天気情報を取得
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Hakata,JP&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('天気情報の取得に失敗しました');
    }

    const data = await response.json();
    
    return NextResponse.json({
      weather: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      humidity: Math.round(data.main.humidity),
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: '天気情報の取得に失敗しました' },
      { status: 500 }
    );
  }
} 