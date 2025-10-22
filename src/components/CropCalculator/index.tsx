import React, { useState } from 'react';
import { CROPS, Crop } from '../../data/crops';

type Result = {
  crop: Crop;
  estimatedDays: [number, number];
  warnings: string[];
};

export default function CropCalculator() {
  const [cropId, setCropId] = useState<string>(CROPS[0].id);
  const [temp, setTemp] = useState<number>((CROPS[0].optimalTempC[0] + CROPS[0].optimalTempC[1]) / 2);
  const [ph, setPh] = useState<number>((CROPS[0].optimalPH[0] + CROPS[0].optimalPH[1]) / 2);
  const [lightHours, setLightHours] = useState<number>(16);
  const [result, setResult] = useState<Result | null>(null);

  const selected = CROPS.find(c => c.id === cropId)!;

  function calculate() {
    const warnings: string[] = [];

    // базовый диапазон из данных культуры
    let [minD, maxD] = selected.growthDaysRange;

    // простая коррекция дней по отклонению температуры
    const avgOpt = (selected.optimalTempC[0] + selected.optimalTempC[1]) / 2;
    const tempDiff = temp - avgOpt;
    // уменьшение/увеличение времени: 2% дней на каждую °C отклонения (примерная эмпирика)
    const tempFactor = 1 + (-0.02 * tempDiff);
    minD = Math.round(minD * tempFactor);
    maxD = Math.round(maxD * tempFactor);

    // предупреждения по pH
    if (ph < selected.optimalPH[0]) warnings.push(`pH ниже оптимума (${selected.optimalPH[0]}–${selected.optimalPH[1]})`);
    if (ph > selected.optimalPH[1]) warnings.push(`pH выше оптимума (${selected.optimalPH[0]}–${selected.optimalPH[1]})`);

    // предупреждения по температуре
    if (temp < selected.optimalTempC[0]) warnings.push(`Температура ниже оптимума (${selected.optimalTempC[0]}–${selected.optimalTempC[1]} °C)`);
    if (temp > selected.optimalTempC[1]) warnings.push(`Температура выше оптимума (${selected.optimalTempC[0]}–${selected.optimalTempC[1]} °C)`);

    // освещение
    if (selected.lightLux && (lightHours < 8 || lightHours > 20)) {
      warnings.push('Часы освещения вне типичного диапазона (8–20 ч). Проверьте интенсивность света относительно рекомендуемых Lux.');
    }

    setResult({ crop: selected, estimatedDays: [Math.max(1, minD), Math.max(minD, maxD)], warnings });
  }

  return (
    <div style={{padding: 12, border: '1px solid #ddd', borderRadius: 6}}>
      <h3>Калькулятор по культуре</h3>

      <label>Культура
        <select value={cropId} onChange={e => { setCropId(e.target.value); const c = CROPS.find(x => x.id === e.target.value)!; setTemp((c.optimalTempC[0]+c.optimalTempC[1])/2); setPh((c.optimalPH[0]+c.optimalPH[1])/2); }}>
          {CROPS.map(c => <option key={c.id} value={c.id}>{c.commonName}</option>)}
        </select>
      </label>

      <div style={{marginTop:8}}>
        <label>Температура, °C
          <input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} />
        </label>
      </div>

      <div style={{marginTop:8}}>
        <label>pH
          <input type="number" step="0.1" value={ph} onChange={e => setPh(Number(e.target.value))} />
        </label>
      </div>

      <div style={{marginTop:8}}>
        <label>Часы света/сутки
          <input type="number" value={lightHours} onChange={e => setLightHours(Number(e.target.value))} />
        </label>
      </div>

      <div style={{marginTop:10}}>
        <button onClick={calculate}>Рассчитать</button>
      </div>

      {result && (
        <div style={{marginTop:12, background: '#fafafa', padding: 10, borderRadius: 4}}>
          <b>Результат для:</b> {result.crop.commonName} ({result.crop.scientificName ?? '—'})<br/>
          <b>Оценочный срок (дней):</b> {result.estimatedDays[0]} — {result.estimatedDays[1]}<br/>
          {result.crop.notes && <div><i>Примечание:</i> {result.crop.notes}</div>}
          {result.warnings.length > 0 && (
            <div style={{marginTop:8, color: '#a00'}}>
              <b>Предупреждения:</b>
              <ul>
                {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}