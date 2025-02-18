'use client'

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Game } from 'cfbd';

const fetcher = (url: string) => fetch(url).then(r => r.json())


export default function Home() {
	const [games, setGames] = useState<Game[]>();
	const [year, setYear] = useState('2023');
	const [team, setTeam] = useState('Penn State');

	const { data, isLoading, error } = useSWR(`/api/games?year=${year}&team=${team}`, fetcher)

	useEffect(() => {
		if (data?.data) {
			setGames(data.data);
		}
	}, [data]);

	if (error) return <div>Failed to load</div>;
	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			{games?.map((game, index) => (
				<div key={index}>
					{game.awayTeam}
				</div>
			))}
		</div>
	);
}
