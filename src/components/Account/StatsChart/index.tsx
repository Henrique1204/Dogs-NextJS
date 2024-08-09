'use client';

import React from 'react';

import { VictoryBar, VictoryChart, VictoryPie } from 'victory';

import { statsData } from '@/actions/stats-get';

import styles from './index.module.css';

type ChartAxis = {
	x: string;
	y: number;
};

const StatsChart = ({ statsData }: { statsData: statsData[] }) => {
	const [chart, setCharts] = React.useState<ChartAxis[]>([]);
	const [total, setTotal] = React.useState<number>(0);

	React.useEffect(() => {
		if (!statsData) return;

		const chartData = statsData.map((item) => {
			return {
				x: item.title,
				y: Number(item.acessos),
			};
		});

		setCharts(chartData);

		setTotal(
			statsData.reduce(
				(acc, currentStat) => acc + Number(currentStat.acessos),
				0
			)
		);
	}, [statsData]);

	return (
		<section className={`animerEsquerda ${styles.grafico}`}>
			<div className={`${styles.total} ${styles.graficoItem}`}>
				<p>Acessos: {total}</p>
			</div>

			<div className={styles.graficoItem}>
				<VictoryPie
					data={chart}
					innerRadius={50}
					padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
					style={{
						data: {
							fillOpacity: 0.9,
							stroke: '#FFF',
							strokeWidth: 2,
						},
						labels: {
							fontSize: 14,
							fill: '#333',
						},
					}}
				/>
			</div>

			<div className={styles.graficoItem}>
				<VictoryChart>
					<VictoryBar alignment='start' data={chart} />
				</VictoryChart>
			</div>
		</section>
	);
};

export default StatsChart;
