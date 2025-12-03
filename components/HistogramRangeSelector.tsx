"use client";

import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Distribution = Record<number, number>;

type Props = {
  distribution: Distribution;
  initialBucketSize?: 1 | 2 | 5 | 10;
  onRangeChange?: (range: [number, number]) => void; // Callback per il cambiamento del range
};

export default function HistogramRangeSelector({
  distribution,
  initialBucketSize = 5,
  onRangeChange,
}: Props) {
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [bucketSize, setBucketSize] = useState(initialBucketSize);

const handleRangeChange = (val: number[]) => {
  const newRange: [number, number] = [val[0], val[1]];
  setRange(newRange);
  if (onRangeChange) onRangeChange(newRange); // chiami il parent
};

  // --- Totale dei valori per calcolare la percentuale ---
  const totalCount = useMemo(
    () => Object.values(distribution).reduce((sum, v) => sum + v, 0),
    [distribution]
  );

  // --- 1) Bucketizzazione ---
  const bucketed = useMemo(() => {
    const result: Distribution = {};
    for (const key in distribution) {
      const value = Number(key);
      const count = distribution[value];
      const bucket = Math.floor(value / bucketSize) * bucketSize;
      result[bucket] = (result[bucket] ?? 0) + count;
    }
    return result;
  }, [distribution, bucketSize]);

  // --- 2) Creazione dati per il grafico con log-normalizzazione e percentuale ---
  const chartData = useMemo(() => {
    return Object.keys(bucketed)
      .map((k) => {
        const bucketStart = Number(k);
        const bucketEnd = bucketStart + bucketSize - 1;
        const labelBucket =
          bucketSize === 1 ? `${bucketStart}` : `${bucketStart}–${bucketEnd}`;

        const count = bucketed[bucketStart];
        const percentage = ((count / totalCount) * 100).toFixed(2);

        return {
          bucket: bucketStart,
          labelBucket,
          value: Math.log10(count + 1), // log-normalizzazione
          raw: count,
          percentage,
        };
      })
      .sort((a, b) => a.bucket - b.bucket);
  }, [bucketed, bucketSize, totalCount]);

  return (
    <Box w="100%" p={4}>
      {/* Controlli */}
      {/* <Flex mb={4} gap={4} align="center">
        <Text fontSize="sm" color="gray.500">
          Bucket size:
        </Text>
        <Select
          w="100px"
          value={bucketSize}
          onChange={(e) => setBucketSize(Number(e.target.value) as any)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </Select>
      </Flex> */}

      {/* Grafico */}
      <Box w="100%" h="100px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="labelBucket"
              tick={{ fontSize: 12 }}
              label={{
                value: "Percentuale",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              allowDecimals={false}
              label={{
                value: "log(count)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value: number, name: string, props) => {
                const payload = props?.payload as any;
                return [`${payload.raw} (${payload.percentage}%)`, payload.labelBucket];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value">
              {chartData.map((entry) => (
                <Cell
                  key={entry.bucket}
                  fill={
                    entry.bucket >= range[0] && entry.bucket <= range[1]
                      ? "#3182ce"
                      : "#A0AEC0"
                  }
                  opacity={entry.bucket >= range[0] && entry.bucket <= range[1] ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

            {/* Range slider */}
      <RangeSlider
        ml={"65px"}
        defaultValue={[0, 100]}
        min={0}
        max={100}
        step={1}
        // onChange={(val) => setRange([val[0], val[1]])}
        onChange={handleRangeChange}
        mb={6}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}
