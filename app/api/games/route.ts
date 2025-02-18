import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const baseURL = 'https://apinext.collegefootballdata.com/games'

    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const team = searchParams.get('team');
    
    const fetchURL = `${baseURL}?year=${year}&team=${team}&seasonType=regular`

    const response = await fetch(fetchURL, {
        headers: {
            'accept': 'application/json',
            'Authorization': process.env.AUTH_TOKEN!,
        }
    });

    const data = await response.json();

    return Response.json({ data });
}