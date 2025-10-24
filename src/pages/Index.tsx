import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState('usdt');
  const [receiveCurrency, setReceiveCurrency] = useState('rub');

  const currencies = [
    { value: 'btc', label: 'Bitcoin (BTC)', icon: '₿', rate: 5200000 },
    { value: 'eth', label: 'Ethereum (ETH)', icon: 'Ξ', rate: 280000 },
    { value: 'usdt', label: 'Tether (USDT)', icon: '₮', rate: 94.5 },
    { value: 'usdc', label: 'USD Coin (USDC)', icon: '$', rate: 94.3 },
    { value: 'rub', label: 'Российский рубль', icon: '₽', rate: 1 },
    { value: 'usd', label: 'US Dollar', icon: '$', rate: 94.2 },
    { value: 'eur', label: 'Euro', icon: '€', rate: 102.5 },
  ];

  const popularPairs = [
    { from: 'USDT', to: 'RUB', rate: '94.5', change: '+1.2%', volume: '₽12.5M' },
    { from: 'BTC', to: 'RUB', rate: '5,200,000', change: '+3.5%', volume: '₽8.2M' },
    { from: 'ETH', to: 'RUB', rate: '280,000', change: '+2.1%', volume: '₽5.8M' },
    { from: 'USDC', to: 'RUB', rate: '94.3', change: '+0.8%', volume: '₽4.1M' },
  ];

  const reviews = [
    {
      name: 'Александр К.',
      rating: 5,
      text: 'Быстрый обмен, отличный курс! Рекомендую всем.',
      date: '2 дня назад',
    },
    {
      name: 'Мария В.',
      rating: 5,
      text: 'Пользуюсь уже полгода, всегда все четко и без задержек.',
      date: '5 дней назад',
    },
    {
      name: 'Дмитрий П.',
      rating: 5,
      text: 'Лучший курс на рынке, поддержка быстро отвечает.',
      date: 'неделю назад',
    },
  ];

  const calculateReceive = () => {
    const fromCurrency = currencies.find((c) => c.value === sendCurrency);
    const toCurrency = currencies.find((c) => c.value === receiveCurrency);
    if (!fromCurrency || !toCurrency) return '0';

    const amount = parseFloat(sendAmount) || 0;
    const result = (amount * fromCurrency.rate) / toCurrency.rate;
    return result.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-glow">
                <Icon name="Coins" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold font-montserrat text-gradient">CryptoSwap</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              {['Обмен', 'Курсы', 'Отзывы', 'FAQ', 'Поддержка'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Войти
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold font-montserrat text-gradient mb-4 animate-slide-up">
            Обмен криптовалют и фиата
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Быстро, безопасно и по лучшему курсу. Поддержка 50+ валют
          </p>
        </div>

        <Card className="max-w-2xl mx-auto gradient-border backdrop-blur-sm bg-card/50 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat">Калькулятор обмена</CardTitle>
            <CardDescription>Рассчитайте сумму и создайте заявку на обмен</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Отдаете</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="flex-1 bg-muted/50 border-border/50"
                    placeholder="1000"
                  />
                  <Select value={sendCurrency} onValueChange={setSendCurrency}>
                    <SelectTrigger className="w-[180px] bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          <span className="flex items-center gap-2">
                            {currency.icon} {currency.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:rotate-180 transition-all duration-300"
                  onClick={() => {
                    const temp = sendCurrency;
                    setSendCurrency(receiveCurrency);
                    setReceiveCurrency(temp);
                  }}
                >
                  <Icon name="ArrowDownUp" className="text-primary" size={24} />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Получаете</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={calculateReceive()}
                    readOnly
                    className="flex-1 bg-muted/50 border-border/50 text-lg font-semibold text-primary"
                  />
                  <Select value={receiveCurrency} onValueChange={setReceiveCurrency}>
                    <SelectTrigger className="w-[180px] bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          <span className="flex items-center gap-2">
                            {currency.icon} {currency.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 text-lg bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity animate-glow">
              Создать заявку
            </Button>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                <span>~2-5 минут</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Shield" size={16} />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Zap" size={16} />
                <span>Без комиссий</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="курсы" className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-montserrat text-gradient mb-4">Популярные пары</h2>
          <p className="text-muted-foreground">Актуальные курсы обмена в режиме реального времени</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {popularPairs.map((pair, idx) => (
            <Card
              key={idx}
              className="gradient-border backdrop-blur-sm bg-card/50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold font-montserrat">
                    {pair.from}/{pair.to}
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      pair.change.startsWith('+') ? 'text-green-500 border-green-500/50' : 'text-red-500 border-red-500/50'
                    }`}
                  >
                    {pair.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">{pair.rate}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="TrendingUp" size={14} />
                  <span>Объем: {pair.volume}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="отзывы" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-montserrat text-gradient mb-4">Отзывы клиентов</h2>
          <p className="text-muted-foreground">Более 10,000 довольных пользователей</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold">{review.name}</div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-montserrat text-gradient mb-4">Частые вопросы</h2>
          <p className="text-muted-foreground">Ответы на самые популярные вопросы</p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-semibold">
              Как долго проходит обмен?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Обмен обычно занимает от 2 до 5 минут после получения подтверждения транзакции в блокчейне. Фиатные
              переводы могут занять до 15 минут в зависимости от банка.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-semibold">Есть ли комиссия?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Мы не берем комиссию за обмен. Курс уже включает в себя все расходы. Вы видите финальную сумму сразу в
              калькуляторе.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-semibold">
              Какие документы нужны для обмена?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Для обменов до 15,000 рублей документы не требуются. Для больших сумм может потребоваться верификация
              личности в соответствии с законодательством.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-semibold">Безопасно ли это?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да, мы используем многоуровневую систему безопасности, включая шифрование данных, холодное хранение
              криптовалют и двухфакторную аутентификацию. Работаем на рынке с 2018 года.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-semibold">
              Какие способы оплаты доступны?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Принимаем банковские карты, переводы через СБП, Тинькофф, Сбербанк, Альфа-Банк, а также криптокошельки
              всех популярных сетей (BTC, ETH, USDT TRC-20/ERC-20).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="gradient-border backdrop-blur-sm bg-card/50 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-2">Мгновенный обмен</h3>
              <p className="text-muted-foreground">Автоматическая обработка заявок 24/7</p>
            </CardContent>
          </Card>

          <Card className="gradient-border backdrop-blur-sm bg-card/50 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center animate-glow">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-2">Полная безопасность</h3>
              <p className="text-muted-foreground">Шифрование и защита ваших данных</p>
            </CardContent>
          </Card>

          <Card className="gradient-border backdrop-blur-sm bg-card/50 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-glow">
                <Icon name="Percent" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-2">Лучший курс</h3>
              <p className="text-muted-foreground">Конкурентные ставки на рынке</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer id="поддержка" className="border-t border-border/50 bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold font-montserrat text-lg mb-4">CryptoSwap</h4>
              <p className="text-sm text-muted-foreground">Надежный обменник криптовалют и фиата с 2018 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Обмен
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Курсы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Правила
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 CryptoSwap. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
