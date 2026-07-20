/**
 * Meteora DLMM Strategies Dashboard
 * MIT License - Free to use, modify, and distribute
 * Created for the Solana/Meteora community
 */

import React, { useState, useEffect } from 'react';

const App = () => {
  // Состояния для данных
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPool, setSelectedPool] = useState(null);
  const [strategyType, setStrategyType] = useState('all');
  const [sortBy, setSortBy] = useState('apy');

  // Моковые данные для демонстрации (в реальности будешь подключать API Meteora)
  const mockPools = [
    {
      id: 1,
      name: 'SOL/USDC',
      pair: 'SOL/USDC',
      apy: 45.6,
      volume24h: 1245000,
      tvl: 8760000,
      fee: 0.3,
      strategy: 'concentrated',
      risk: 'medium',
      priceRange: ['$85.20', '$92.40'],
      currentPrice: '$88.70',
      liquidity: 3450000,
      feesEarned: 12450,
    },
    {
      id: 2,
      name: 'BONK/SOL',
      pair: 'BONK/SOL',
      apy: 128.4,
      volume24h: 567000,
      tvl: 2340000,
      fee: 0.6,
      strategy: 'wide',
      risk: 'high',
      priceRange: ['$0.0000012', '$0.0000048'],
      currentPrice: '$0.0000028',
      liquidity: 890000,
      feesEarned: 28700,
    },
    {
      id: 3,
      name: 'USDC/USDT',
      pair: 'USDC/USDT',
      apy: 8.2,
      volume24h: 3456000,
      tvl: 12450000,
      fee: 0.05,
      strategy: 'stable',
      risk: 'low',
      priceRange: ['$0.998', '$1.002'],
      currentPrice: '$1.000',
      liquidity: 8900000,
      feesEarned: 4560,
    },
    {
      id: 4,
      name: 'JUP/SOL',
      pair: 'JUP/SOL',
      apy: 67.8,
      volume24h: 876000,
      tvl: 4560000,
      fee: 0.4,
      strategy: 'concentrated',
      risk: 'medium',
      priceRange: ['$1.85', '$2.15'],
      currentPrice: '$1.97',
      liquidity: 2100000,
      feesEarned: 18900,
    },
    {
      id: 5,
      name: 'mSOL/SOL',
      pair: 'mSOL/SOL',
      apy: 15.3,
      volume24h: 234000,
      tvl: 3450000,
      fee: 0.1,
      strategy: 'stable',
      risk: 'low',
      priceRange: ['$0.985', '$1.015'],
      currentPrice: '$1.002',
      liquidity: 2800000,
      feesEarned: 5600,
    },
  ];

  useEffect(() => {
    // Имитация загрузки данных с API
    setLoading(true);
    setTimeout(() => {
      setPools(mockPools);
      setLoading(false);
    }, 1000);
  }, []);

  // Фильтрация и сортировка
  const filteredPools = pools
    .filter(pool => strategyType === 'all' || pool.strategy === strategyType)
    .sort((a, b) => {
      if (sortBy === 'apy') return b.apy - a.apy;
      if (sortBy === 'volume') return b.volume24h - a.volume24h;
      if (sortBy === 'tvl') return b.tvl - a.tvl;
      return 0;
    });

  // Форматирование чисел
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(0);
  };

  const formatCurrency = (num) => {
    return '$' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStrategyLabel = (strategy) => {
    switch(strategy) {
      case 'concentrated': return 'Концентрированный';
      case 'wide': return 'Широкий';
      case 'stable': return 'Стабильный';
      default: return strategy;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg">
                📊
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Meteora DLMM
                </h1>
                <p className="text-xs text-gray-400">Стратегии и аналитика пулов</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-purple-500/30">
                <span className="text-sm text-gray-400">Стратегия:</span>
                <select 
                  value={strategyType}
                  onChange={(e) => setStrategyType(e.target.value)}
                  className="bg-transparent border-none text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all">Все</option>
                  <option value="concentrated">Концентрированный</option>
                  <option value="wide">Широкий</option>
                  <option value="stable">Стабильный</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-purple-500/30">
                <span className="text-sm text-gray-400">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="apy">APY</option>
                  <option value="volume">Объем</option>
                  <option value="tvl">TVL</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-400">Загрузка данных с Meteora...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-400 text-sm">Всего пулов</p>
                <p className="text-2xl font-bold">{pools.length}</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-400 text-sm">Средний APY</p>
                <p className="text-2xl font-bold text-green-400">
                  {(pools.reduce((sum, p) => sum + p.apy, 0) / pools.length).toFixed(1)}%
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-400 text-sm">Общий TVL</p>
                <p className="text-2xl font-bold">{formatCurrency(pools.reduce((sum, p) => sum + p.tvl, 0))}</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-400 text-sm">Объем 24ч</p>
                <p className="text-2xl font-bold">{formatCurrency(pools.reduce((sum, p) => sum + p.volume24h, 0))}</p>
              </div>
            </div>

            {/* Таблица пулов */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
<div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-900/30 border-b border-purple-500/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Пул</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Стратегия</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">APY</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Объем 24ч</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">TVL</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Риск</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Цена</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPools.map((pool) => (
                      <tr 
                        key={pool.id}
                        className="border-b border-purple-500/10 hover:bg-purple-500/5 transition cursor-pointer"
                        onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium">{pool.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
                            {getStrategyLabel(pool.strategy)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-green-400 font-bold">{pool.apy}%</span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{formatCurrency(pool.volume24h)}</td>
                        <td className="px-4 py-3 text-gray-300">{formatCurrency(pool.tvl)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getRiskColor(pool.risk)}`}></div>
                            <span className="text-sm capitalize">{pool.risk}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{pool.currentPrice}</td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm hover:opacity-80 transition">
                            Детали
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Детальная информация по выбранному пулу */}
            {selectedPool && (
              <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                {(() => {
                  const pool = pools.find(p => p.id === selectedPool);
                  if (!pool) return null;
                  return (
                    <div>
                      <h3 className="text-xl font-bold mb-4">{pool.name} - Детали</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-gray-400 text-sm">Ценовой диапазон</p>
                          <p className="font-bold">{pool.priceRange[0]} - {pool.priceRange[1]}</p>
                          <p className="text-sm text-gray-400">Текущая: {pool.currentPrice}</p>

</div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-gray-400 text-sm">Ликвидность</p>
                          <p className="font-bold">{formatCurrency(pool.liquidity)}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-gray-400 text-sm">Заработано комиссий</p>
                          <p className="font-bold">{formatCurrency(pool.feesEarned)}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-80 transition">
                          Добавить ликвидность
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-black/30 backdrop-blur-sm py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>
            © 2024 · MIT License · 
            <a 
              href="https://github.com/rusichdenis-pixel/meteora-strategies" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 ml-1"
            >
              Исходный код на GitHub
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Данные для демонстрации · Не является финансовой рекомендацией
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
