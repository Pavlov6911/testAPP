import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ChevronLeft, ChevronRight, Star, Play, Pause, TrendingUp, Activity, Users, DollarSign, BarChart3, Eye, Video, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

// Realistic trading performance data
const performanceData = [
  { month: 'Jan', profit: 8.2, volume: 1250000, trades: 342, winRate: 68.4, drawdown: -2.1 },
  { month: 'Feb', profit: 12.7, volume: 1580000, trades: 398, winRate: 71.2, drawdown: -1.8 },
  { month: 'Mar', profit: 9.4, volume: 1420000, trades: 365, winRate: 69.8, drawdown: -3.2 },
  { month: 'Apr', profit: 15.8, volume: 1890000, trades: 445, winRate: 73.5, drawdown: -2.5 },
  { month: 'May', profit: 11.3, volume: 1650000, trades: 387, winRate: 70.1, drawdown: -4.1 },
  { month: 'Jun', profit: 18.9, volume: 2100000, trades: 512, winRate: 75.8, drawdown: -1.9 },
  { month: 'Jul', profit: 22.4, volume: 2350000, trades: 578, winRate: 77.2, drawdown: -2.8 },
  { month: 'Aug', profit: 16.7, volume: 1980000, trades: 467, winRate: 72.4, drawdown: -3.5 },
  { month: 'Sep', profit: 25.1, volume: 2580000, trades: 634, winRate: 78.9, drawdown: -2.2 },
  { month: 'Oct', profit: 28.6, volume: 2890000, trades: 698, winRate: 80.1, drawdown: -1.7 },
  { month: 'Nov', profit: 31.2, volume: 3120000, trades: 742, winRate: 81.5, drawdown: -2.4 },
  { month: 'Dec', profit: 35.8, volume: 3450000, trades: 823, winRate: 83.2, drawdown: -1.5 },
];

// Key performance metrics
const performanceMetrics = {
  totalReturn: '287.3%',
  sharpeRatio: '2.84',
  maxDrawdown: '-4.1%',
  winRate: '76.8%',
  totalTrades: 6391,
  avgMonthlyReturn: '18.2%',
  volatility: '12.4%',
  profitFactor: '2.67'
};

// Live trading activity data
const liveActivityData = [
  { time: '09:00', trades: 45, volume: 2.3, profit: 1.2 },
  { time: '09:15', trades: 52, volume: 3.1, profit: 2.1 },
  { time: '09:30', trades: 38, volume: 2.8, profit: 1.8 },
  { time: '09:45', trades: 61, volume: 4.2, profit: 3.2 },
  { time: '10:00', trades: 47, volume: 3.5, profit: 2.5 },
  { time: '10:15', trades: 55, volume: 3.9, profit: 2.8 },
  { time: '10:30', trades: 42, volume: 2.9, profit: 2.1 },
  { time: '10:45', trades: 58, volume: 4.1, profit: 3.5 },
];

// Real-time market sentiment data
const marketSentimentData = [
  { name: 'Bullish', value: 65, color: '#10B981' },
  { name: 'Bearish', value: 25, color: '#EF4444' },
  { name: 'Neutral', value: 10, color: '#6B7280' },
];

// Trading volume by currency pairs
const volumeData = [
  { pair: 'EUR/USD', volume: 45.2, trades: 1250 },
  { pair: 'GBP/USD', volume: 32.8, trades: 890 },
  { pair: 'USD/JPY', volume: 28.5, trades: 750 },
  { pair: 'AUD/USD', volume: 22.1, trades: 620 },
  { pair: 'USD/CAD', volume: 18.7, trades: 480 },
  { pair: 'USD/CHF', volume: 15.3, trades: 390 },
];

// Live performance metrics that update
const getLiveMetrics = (t: any) => ({
  [t('performance.liveMetrics.activeTraders')]: 1247,
  [t('performance.liveMetrics.totalVolume')]: '€2.8M',
  [t('performance.liveMetrics.dailyProfit')]: '+€45,230',
  [t('performance.liveMetrics.successRate')]: '87.3%',
  [t('performance.liveMetrics.avgReturn')]: '+2.4%',
  [t('performance.liveMetrics.riskScore')]: 'Low'
});

// Video testimonials data
const getVideoTestimonials = (t: any) => [
  {
    id: 1,
    name: t('performance.videoTestimonials.alexJohnson.name'),
    role: t('performance.videoTestimonials.alexJohnson.role'),
    thumbnail: '/api/placeholder/300/200',
    videoUrl: '#',
    duration: '2:34',
    rating: 5,
    preview: t('performance.videoTestimonials.alexJohnson.preview'),
  },
  {
    id: 2,
    name: t('performance.videoTestimonials.mariaGarcia.name'),
    role: t('performance.videoTestimonials.mariaGarcia.role'),
    thumbnail: '/api/placeholder/300/200',
    videoUrl: '#',
    duration: '3:12',
    rating: 5,
    preview: t('performance.videoTestimonials.mariaGarcia.preview'),
  },
  {
    id: 3,
    name: t('performance.videoTestimonials.davidChen.name'),
    role: t('performance.videoTestimonials.davidChen.role'),
    thumbnail: '/api/placeholder/300/200',
    videoUrl: '#',
    duration: '2:58',
    rating: 4,
    preview: t('performance.videoTestimonials.davidChen.preview'),
  },
];

// Trading images data
const getTradingImages = (t: any) => [
  {
    id: 1,
    url: '/api/placeholder/600/400',
    title: 'Trading Dashboard',
    description: 'Real-time trading dashboard with live market data',
  },
  {
    id: 2,
    url: '/api/placeholder/400/300',
    title: t('performance.tradingImages.profitAnalytics.title'),
    description: t('performance.tradingImages.profitAnalytics.description'),
  },
  {
    id: 3,
    url: '/api/placeholder/400/300',
    title: t('performance.tradingImages.riskManagement.title'),
    description: t('performance.tradingImages.riskManagement.description'),
  },
  {
    id: 4,
    url: '/api/placeholder/400/300',
    title: t('performance.tradingImages.marketAnalysis.title'),
    description: t('performance.tradingImages.marketAnalysis.description'),
  },
];

// Testimonials data
const getTestimonials = (t: any) => [
  {
    name: t('performance.testimonials.alexJohnson.name'),
    role: t('performance.testimonials.alexJohnson.role'),
    content: t('performance.testimonials.alexJohnson.content'),
    rating: 5,
  },
  {
    name: t('performance.testimonials.mariaGarcia.name'),
    role: t('performance.testimonials.mariaGarcia.role'),
    content: t('performance.testimonials.mariaGarcia.content'),
    rating: 5,
  },
  {
    name: t('performance.testimonials.davidChen.name'),
    role: t('performance.testimonials.davidChen.role'),
    content: t('performance.testimonials.davidChen.content'),
    rating: 4,
  },
  {
    name: t('performance.testimonials.sarahWilliams.name'),
    role: t('performance.testimonials.sarahWilliams.role'),
    content: t('performance.testimonials.sarahWilliams.content'),
    rating: 5,
  },
];

const PerformanceSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Get translated data
  const testimonials = getTestimonials(t);
  const videoTestimonials = getVideoTestimonials(t);
  const tradingImages = getTradingImages(t);
  const liveMetrics = getLiveMetrics(t);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [currentVideoTestimonial, setCurrentVideoTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [liveDataUpdate, setLiveDataUpdate] = useState(0);
  const [activeChart, setActiveChart] = useState('activity');

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-sliding functionality
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveDataUpdate(prev => prev + 1);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-advance video testimonials
  useEffect(() => {
    if (isVideoPlaying) return;

    const interval = setInterval(() => {
      setCurrentVideoTestimonial((prev) => (prev + 1) % videoTestimonials.length);
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  // Auto-advance image gallery
  useEffect(() => {
    if (showImageModal) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % tradingImages.length);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [showImageModal]);

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  return (
    <SectionContainer id="performance" className="bg-[#121212] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#121212] to-black/80" />
        
        {/* Floating background particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Pulsing energy rings */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-orange-400/10 rounded-full"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-orange-300/15 rounded-full"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.2, 0, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionTitle 
          title={t('performance.title')} 
          subtitle={t('performance.subtitle')} 
          className="text-center mb-16"
        />

        {/* Performance Chart */}
        <ScrollReveal type="fade" direction="up" delay={0.2}>
          <motion.div
            variants={chartVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-orange-400/30 shadow-2xl relative overflow-hidden group"
          >
            {/* Enhanced animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-15"
              animate={{
                background: [
                  "radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 30% 80%, rgba(255, 140, 0, 0.25) 0%, transparent 70%)",
                  "radial-gradient(circle at 60% 40%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            />
            
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent relative z-10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  "0 0 10px rgba(255, 106, 0, 0.3)",
                  "0 0 20px rgba(255, 106, 0, 0.5)",
                  "0 0 10px rgba(255, 106, 0, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('performance.monthlyReturns')}
            </motion.h3>
            
            <div className="h-80 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6a00" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff6a00" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: any) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #ff6a00',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: any, name: string) => [
                      <div className="text-accent font-bold text-lg">{value}% Profit</div>,
                      <div className="text-white/80 text-sm">Volume: ${(performanceData.find(d => d.profit === value)?.volume || 0 / 1000000).toFixed(1)}M</div>,
                      <div className="text-white/80 text-sm">Trades: {performanceData.find(d => d.profit === value)?.trades || 0}</div>,
                      <div className="text-white/80 text-sm">Win Rate: {performanceData.find(d => d.profit === value)?.winRate || 0}%</div>,
                      <div className="text-white/80 text-sm">Drawdown: {performanceData.find(d => d.profit === value)?.drawdown || 0}%</div>
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#ff6a00" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorProfit)"
                    dot={{ fill: '#ff6a00', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#ff6a00', strokeWidth: 2, fill: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Live Activity Dashboard */}
        <ScrollReveal type="fade" direction="up" delay={0.25}>
          <motion.div
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-orange-400/30 shadow-2xl relative overflow-hidden group"
          >
            {/* Live indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-white text-sm font-semibold">LIVE</span>
            </div>

            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent"
            >
              Live Trading Activity
            </motion.h3>

            {/* Chart Selection Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'activity', label: t('performance.liveActivity.tradingActivity'), icon: Activity },
                { id: 'sentiment', label: t('performance.liveActivity.marketSentiment'), icon: TrendingUp },
                { id: 'volume', label: t('performance.liveActivity.volumeAnalysis'), icon: BarChart3 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveChart(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeChart === id 
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' 
                      : 'bg-black/30 text-white/70 hover:bg-black/50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Charts */}
            <div className="h-80">
              <AnimatePresence mode="wait">
                {activeChart === 'activity' && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={liveActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #ff6a00',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="trades" 
                          stroke="#ff6a00" 
                          strokeWidth={3}
                          dot={{ fill: '#ff6a00', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {activeChart === 'sentiment' && (
                  <motion.div
                    key="sentiment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex items-center justify-center"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={marketSentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {marketSentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #ff6a00',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {activeChart === 'volume' && (
                  <motion.div
                    key="volume"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="pair" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #ff6a00',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Bar dataKey="volume" fill="#ff6a00" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Metrics Bar */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
              {Object.entries(liveMetrics).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="bg-black/50 rounded-lg p-3 text-center border border-orange-400/10"
                  animate={{
                    borderColor: liveDataUpdate % 2 === 0 ? 'rgba(255, 106, 0, 0.3)' : 'rgba(255, 106, 0, 0.1)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-orange-400 font-bold text-lg">
                     {key === t('performance.liveMetrics.activeTraders') ? parseInt(value.toString()) + Math.floor(Math.random() * 10) : value}
                   </div>
                  <div className="text-white/60 text-xs">
                    {key}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Performance Metrics Grid */}
        <ScrollReveal type="slide" direction="left" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {Object.entries(performanceMetrics).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm p-6 rounded-xl border border-orange-400/20 text-center group hover:border-orange-400/40 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(255, 106, 0, 0.2)"
                }}
              >
                <motion.div
                  className="text-2xl font-bold text-accent mb-2"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255, 106, 0, 0.5)",
                      "0 0 15px rgba(255, 106, 0, 0.8)",
                      "0 0 5px rgba(255, 106, 0, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {value}
                </motion.div>
                <div className="text-sm text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Interactive Trading Dashboard */}
        <ScrollReveal type="slide" direction="right" delay={0.4}>
          <motion.div
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30 shadow-2xl relative overflow-hidden group mb-16"
            onMouseEnter={() => setIsAutoSliding(false)}
            onMouseLeave={() => setIsAutoSliding(true)}
          >
            {/* Enhanced animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-15"
              animate={{
                background: [
                  "radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 30% 80%, rgba(255, 140, 0, 0.25) 0%, transparent 70%)",
                  "radial-gradient(circle at 60% 40%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent relative z-10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  "0 0 10px rgba(255, 106, 0, 0.3)",
                  "0 0 20px rgba(255, 106, 0, 0.5)",
                  "0 0 10px rgba(255, 106, 0, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('performance.liveDashboard')}
            </motion.h3>

            {/* Slide Indicators */}
            <motion.div className="flex justify-center mb-6 space-x-2 relative z-10">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </motion.div>

            {/* Carousel Content */}
            <div className="relative h-80 overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Slide 1: Live Market Data */}
                <div className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { symbol: 'EUR/USD', price: '1.0847', change: '+0.21%', trend: 'up' },
                      { symbol: 'GBP/USD', price: '1.2634', change: '-0.09%', trend: 'down' },
                      { symbol: 'USD/JPY', price: '149.82', change: '+0.30%', trend: 'up' },
                      { symbol: 'AUD/USD', price: '0.6523', change: '+0.52%', trend: 'up' },
                      { symbol: 'USD/CAD', price: '1.3721', change: '-0.13%', trend: 'down' },
                      { symbol: 'USD/CHF', price: '0.9012', change: '+0.08%', trend: 'up' }
                    ].map((pair, index) => (
                      <div key={pair.symbol} className="bg-black/50 rounded-lg p-3 border border-accent/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-semibold text-sm">{pair.symbol}</span>
                          <span className={`text-xs ${
                            pair.trend === 'up' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {pair.trend === 'up' ? '↗' : '↘'}
                          </span>
                        </div>
                        <div className="text-accent font-bold">{pair.price}</div>
                        <div className={`text-xs ${
                          pair.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {pair.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 2: Performance Metrics */}
                <div className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: t('performance.metrics.totalReturn'), value: '287.3%' },
                      { label: t('performance.metrics.winRate'), value: '76.8%' },
                      { label: t('performance.metrics.sharpeRatio'), value: '2.84' },
                      { label: t('performance.metrics.maxDrawdown'), value: '-4.1%' },
                      { label: t('performance.metrics.totalTrades'), value: '6,391' },
                      { label: t('performance.metrics.avgMonthly'), value: '18.2%' },
                      { label: t('performance.metrics.volatility'), value: '12.4%' },
                      { label: t('performance.metrics.profitFactor'), value: '2.67' }
                    ].map((metric, index) => (
                      <motion.div 
                        key={metric.label} 
                        className="bg-black/50 rounded-lg p-3 border border-accent/10 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-accent font-bold text-lg">{metric.value}</div>
                        <div className="text-white/60 text-xs">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Slide 3: Trading Signals & Analysis */}
                <div className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Trading Signals */}
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold mb-3">Recent Signals</h4>
                      {[
                        { pair: 'EUR/USD', signal: 'BUY', profit: '+1.2%' },
                        { pair: 'GBP/JPY', signal: 'SELL', profit: '+2.8%' },
                        { pair: 'USD/CAD', signal: 'BUY', profit: '+0.9%' }
                      ].map((signal, index) => (
                        <div key={signal.pair} className="bg-black/50 rounded-lg p-3 border border-accent/10">
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">{signal.pair}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                signal.signal === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {signal.signal}
                              </span>
                              <span className="text-accent text-sm">{signal.profit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Market Analysis */}
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold mb-3">Market Analysis</h4>
                      <div className="bg-black/50 rounded-lg p-3 border border-accent/10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-400">📈</span>
                          <span className="text-white text-sm font-semibold">Bullish Sentiment</span>
                        </div>
                        <p className="text-white/70 text-xs">Strong upward momentum across major pairs</p>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-accent/10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-accent">⚡</span>
                          <span className="text-white text-sm font-semibold">Volatility: 68%</span>
                        </div>
                        <p className="text-white/70 text-xs">Ideal conditions for scalping strategies</p>
                      </div>
                      <div className="bg-black/50 rounded-lg p-3 border border-accent/10">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-400">🎯</span>
                          <span className="text-white text-sm font-semibold">Success Rate: 87.3%</span>
                        </div>
                        <p className="text-white/70 text-xs">AI algorithms performing above average</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Client Testimonials */}
        <ScrollReveal type="slide" direction="right" delay={0.4}>
          <motion.div
            variants={testimonialVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30 shadow-2xl relative overflow-hidden group"
          >
            {/* Enhanced animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-15"
              animate={{
                background: [
                  "radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 30% 80%, rgba(255, 140, 0, 0.25) 0%, transparent 70%)",
                  "radial-gradient(circle at 60% 40%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            />
            
            {/* Enhanced floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-orange-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-15, -30, -15],
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                  duration: 5 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
            
            {/* Corner accent elements */}
            <motion.div
              className="absolute top-4 left-4 w-3 h-3 bg-orange-400/60 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-2 h-2 bg-orange-300/40 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent relative z-10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  "0 0 10px rgba(255, 106, 0, 0.3)",
                  "0 0 20px rgba(255, 106, 0, 0.5)",
                  "0 0 10px rgba(255, 106, 0, 0.3)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('performance.clientTestimonials')}
            </motion.h3>
            
            <div className="relative h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm p-6 rounded-xl border border-orange-400/20 relative overflow-hidden group h-full flex flex-col"
                >
                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-400/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  />
                  
                  {/* Floating micro particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-1 h-1 bg-orange-400/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-orange-300/40 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <div className="flex mb-4 relative z-10">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ 
                          scale: 1.2,
                          filter: "drop-shadow(0 0 5px rgba(255, 106, 0, 0.6))"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Star size={20} className="text-orange-400 fill-orange-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p 
                    className="text-gray-300 italic relative z-10 leading-relaxed flex-grow"
                    whileHover={{
                      color: "#e5e7eb"
                    }}
                  >
                    "{testimonials[currentTestimonial].content}"
                  </motion.p>
                  
                  <div className="mt-4 relative z-10">
                    <motion.p 
                      className="font-bold text-white"
                      whileHover={{
                        color: "#fb923c",
                        textShadow: "0 0 10px rgba(255, 106, 0, 0.3)"
                      }}
                    >
                      {testimonials[currentTestimonial].name}
                    </motion.p>
                    <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <motion.button 
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-background hover:bg-primary/20 text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button 
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-background hover:bg-primary/20 text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 mx-1 rounded-full ${currentTestimonial === index ? 'bg-accent' : 'bg-white/30'}`}
                  whileHover={{ scale: 1.2 }}
                  animate={currentTestimonial === index ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={currentTestimonial === index ? { duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : { duration: 0.3, ease: "easeOut" }}                  
                />
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Video Testimonials Section */}
        <ScrollReveal type="slide" direction="left" delay={0.5}>
          <motion.div
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30 shadow-2xl relative overflow-hidden group mb-16"
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              <Video size={24} className="text-orange-400" />
              Video Testimonials
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoTestimonials.map((video, index) => (
                <motion.div
                  key={video.id}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group/video ${
                    currentVideoTestimonial === index ? 'ring-2 ring-orange-400' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setCurrentVideoTestimonial(index);
                    setIsVideoPlaying(!isVideoPlaying);
                  }}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-all duration-300" />
                    
                    {/* Play button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      {isVideoPlaying && currentVideoTestimonial === index ? (
                        <Pause size={48} className="text-white drop-shadow-lg" />
                      ) : (
                        <Play size={48} className="text-white drop-shadow-lg" />
                      )}
                    </motion.div>
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black/50">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{video.name}</h4>
                      <div className="flex">
                        {[...Array(video.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-orange-400 fill-orange-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{video.role}</p>
                    <p className="text-gray-300 text-sm mt-2 italic">"{video.preview}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Trading Images Gallery */}
        <ScrollReveal type="slide" direction="right" delay={0.6}>
          <motion.div
            className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30 shadow-2xl relative overflow-hidden group mb-16"
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              <ImageIcon size={24} className="text-orange-400" />
              Trading Platform Gallery
            </motion.h3>

            {/* Main featured image */}
            <motion.div
              className="relative mb-6 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setShowImageModal(true)}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={tradingImages[currentImage].url}
                alt={tradingImages[currentImage].title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-xl font-bold mb-2">{tradingImages[currentImage].title}</h4>
                <p className="text-gray-300">{tradingImages[currentImage].description}</p>
              </div>
              <motion.div
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
              >
                <Eye size={20} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-4 gap-4">
              {tradingImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={`relative rounded-lg overflow-hidden cursor-pointer ${
                    currentImage === index ? 'ring-2 ring-orange-400' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrentImage(index)}
                >
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-20 object-cover"
                  />
                  <div className={`absolute inset-0 ${
                    currentImage === index ? 'bg-orange-400/20' : 'bg-black/40 hover:bg-black/20'
                  } transition-all duration-300`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={tradingImages[currentImage].url}
                  alt={tradingImages[currentImage].title}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{tradingImages[currentImage].title}</h4>
                  <p className="text-gray-300">{tradingImages[currentImage].description}</p>
                </div>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Live Statistics Bar */}
        <ScrollReveal type="fade" direction="up" delay={0.7}>
          <motion.div
            className="bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/20 mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: Users, label: 'Active Traders', value: '1,247', color: 'text-blue-400' },
                { icon: DollarSign, label: 'Daily Volume', value: '€2.8M', color: 'text-green-400' },
                { icon: TrendingUp, label: 'Success Rate', value: '87.3%', color: 'text-orange-400' },
                { icon: Activity, label: 'Live Trades', value: '156', color: 'text-red-400' },
                { icon: BarChart3, label: 'Profit Today', value: '+€45K', color: 'text-purple-400' },
                { icon: Eye, label: 'Watching', value: '2,891', color: 'text-cyan-400' },
              ].map(({ icon: Icon, label, value, color }, index) => (
                <motion.div
                  key={label}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className={`${color} mb-2 flex justify-center`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div className="text-white font-bold text-lg">{value}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
};

export default PerformanceSection;