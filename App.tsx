import React, { useState } from 'react';
import useAgeCalculator from './hooks/useAgeCalculator';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Disclaimer from './pages/Disclaimer'; // Import the new component

// The content of the main calculator page has been moved into its own component
const CalculatorPage = () => {
    const { day, setDay, month, setMonth, year, setYear, age, error, calculateAge, reset, calendar, setCalendar } = useAgeCalculator();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculateAge();
    };

    const handleCalendarChange = (newCalendar: 'gregorian' | 'hijri') => {
        if (calendar !== newCalendar) {
            setCalendar(newCalendar);
            reset();
        }
    };
    
    // All the JSX for the calculator and SEO content remains here, unchanged from the previous version.
    // ... (The large block of JSX for CalculatorPage is omitted for brevity but is identical to the previous version's App.tsx content)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const selectClassName = `w-full p-3 border-2 bg-gray-50 rounded-lg text-lg font-bold text-gray-800 transition-all duration-300 focus:outline-none appearance-none bg-no-repeat bg-right pr-12 pl-4 ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300'}`;
    const labelClassName = "block text-right font-bold text-sm uppercase tracking-widest mb-2";
    const labelErrorColor = error ? 'text-red-500' : 'text-gray-400';

    const gregorianMonthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const hijriMonthNames = ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
    const displayMonths = calendar === 'hijri' ? hijriMonthNames : gregorianMonthNames;

    const currentGregorianYear = new Date().getFullYear();
    const gregorianYears = Array.from({ length: 120 }, (_, i) => currentGregorianYear - i);
    let currentHijriYear;
    try {
        const hijriYearStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric' }).format(new Date());
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const parseArabic = (str: string) => parseInt(String(str).split('').map(char => arabicNumerals.includes(char) ? arabicNumerals.indexOf(char) : char).join(''));
        currentHijriYear = parseArabic(hijriYearStr.replace(/[^٠-٩0-9]/g, ''));
    } catch (e) {
        currentHijriYear = 1446; // Fallback
    }
    const hijriYears = Array.from({ length: 120 }, (_, i) => currentHijriYear - i);
    const displayYears = calendar === 'hijri' ? hijriYears : gregorianYears;

    return (
        <>
            <main id="calculator-tool" className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-[2rem] shadow-2xl p-6 sm:p-10 w-full max-w-lg text-center">
                <header className="flex items-center justify-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                        حاسبة العمر
                    </h1>
                </header>

                <div className="bg-gray-200/70 p-1 rounded-full flex justify-center items-center gap-2 mb-8">
                    <button
                        onClick={() => handleCalendarChange('gregorian')}
                        className={`w-full px-6 py-2 rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${calendar === 'gregorian' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-600'}`}
                    >
                        ميلادي
                    </button>
                    <button
                        onClick={() => handleCalendarChange('hijri')}
                        className={`w-full px-6 py-2 rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${calendar === 'hijri' ? 'bg-white text-indigo-600 shadow' : 'bg-transparent text-gray-600'}`}
                    >
                        هجري
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-full grid grid-cols-3 gap-3 text-center">
                            <div>
                                <label htmlFor="day" className={`${labelClassName} ${labelErrorColor}`}>يوم</label>
                                <div className="relative">
                                    <select id="day" name="day" value={day} onChange={(e) => setDay(e.target.value)} className={selectClassName} required>
                                        <option value="" disabled>اليوم</option>
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="month" className={`${labelClassName} ${labelErrorColor}`}>شهر</label>
                                <div className="relative">
                                    <select id="month" name="month" value={month} onChange={(e) => setMonth(e.target.value)} className={selectClassName} required>
                                        <option value="" disabled>الشهر</option>
                                        {displayMonths.map((name, index) => <option key={index + 1} value={index + 1}>{name}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="year" className={`${labelClassName} ${labelErrorColor}`}>سنة</label>
                                <div className="relative">
                                    <select id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)} className={selectClassName} required>
                                        <option value="" disabled>السنة</option>
                                        {displayYears.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="date-error" className="h-6 w-full">
                            {error && <p className="text-red-500 text-sm italic mt-1">{error}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row-reverse gap-3 w-full mt-4">
                            <button
                                type="submit"
                                className="w-full flex-grow bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 active:scale-[0.98] transform transition-all duration-300 text-white font-bold py-4 px-8 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
                            >
                                احسب عمري
                            </button>
                            <button
                                type="button"
                                onClick={reset}
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                            >
                                مسح
                            </button>
                        </div>
                    </div>
                </form>

                {age.years !== null && (
                    <section aria-live="polite" className="mt-8 w-full">
                        <AgeResult age={age} calendar={calendar} />
                    </section>
                )}

                <footer className="mt-8">
                    <p className="text-xs text-gray-500">
                        اكتشف قصة حياتك بالأرقام.
                    </p>
                </footer>
            </main>
            <SeoContent />
        </>
    );
};

// --- Helper Components from previous version ---
// These are kept inside App.tsx for simplicity in this structure
// In a larger app, these would be in their own files.

const ResultRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 bg-indigo-50 text-indigo-500 rounded-full h-10 w-10 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-md text-gray-700">{label}</span>
        </div>
        <span className="text-lg font-bold text-gray-900 text-left">{value}</span>
    </div>
);

const AgeResult = ({ age, calendar }: { age: ReturnType<typeof useAgeCalculator>['age'], calendar: string }) => {
    // ... (AgeResult component code is identical to previous version)
    if (age.years === null) return null;

    const ageParts = [];
    if (age.years > 0) ageParts.push({ value: age.years, unit: age.years === 1 ? 'سنة' : 'سنوات' });
    if (age.months > 0) ageParts.push({ value: age.months, unit: age.months === 1 ? 'شهر' : 'أشهر' });
    if (age.days > 0) ageParts.push({ value: age.days, unit: age.days === 1 ? 'يوم' : 'أيام' });

    if (ageParts.length === 0 && (age.totalDays !== null && age.totalDays < 31)) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-center w-full animate-fade-in flex flex-col justify-center">
                <p className="text-2xl font-bold text-gray-800">🎉 مرحباً بك في الحياة!</p>
                <p className="text-gray-600">أنت في بداية رحلتك.</p>
            </div>
        );
    }
    
    const formatNumber = (num: number | null) => {
        if (num === null) return '0';
        const locale = calendar === 'gregorian' ? 'en-US' : 'ar-EG';
        return num.toLocaleString(locale);
    };

    const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    const WeekIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>;
    const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
    const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6.5 5.5l-1.5-1.5M12 4.5A2.5 2.5 0 0114.5 7H16a2 2 0 012 2v2m-6.5 5.5l1.5-1.5m-1.5 1.5V20m0-6.5A2.5 2.5 0 009.5 11H8a2 2 0 00-2 2v2m6.5-5.5l-1.5 1.5M12 13.5A2.5 2.5 0 019.5 11H8a2 2 0 01-2-2V7a2 2 0 012-2h1.5A2.5 2.5 0 0112 4.5m0 9a2.5 2.5 0 002.5-2.5h1.5a2 2 0 002-2V7a2 2 0 00-2-2h-1.5A2.5 2.5 0 0012 4.5M12 13.5v6.5" /></svg>;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-2 text-gray-800 w-full animate-fade-in">
            <div className="text-center pb-4">
                 <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">🎉 عمرك الآن</p>
                <p className="text-4xl sm:text-5xl font-black text-gray-900 mt-2">
                    {ageParts.length > 0 ? ageParts.map((part, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && ' و '}
                            <span className="font-black">{formatNumber(part.value as number)}</span>
                            {' '}
                            <span>{part.unit}</span>
                        </React.Fragment>
                    )) : 'أقل من يوم'}
                </p>
            </div>

            <div className="border-t border-gray-100 pt-2">
                <ResultRow icon={<CalendarIcon />} label="لقد عشت" value={`${formatNumber(age.totalDays)} يومًا`} />
                {age.weeks && <ResultRow icon={<WeekIcon />} label="ما يعادل" value={`${formatNumber(age.weeks)} أسبوعًا`} />}
                {age.hours && <ResultRow icon={<ClockIcon />} label="تقريبًا" value={`${formatNumber(age.hours)} ساعة`} />}
                {calendar === 'gregorian' && age.zodiac && (
                    <>
                        <ResultRow icon={<StarIcon />} label="برجك الفلكي" value={`${age.zodiac.name} ${age.zodiac.emoji}`} />
                        {age.nextBirthdayCountdown !== null && <ResultRow icon={<GiftIcon />} label="عيد ميلادك القادم" value={`بعد ${formatNumber(age.nextBirthdayCountdown)} يومًا`} />}
                    </>
                )}
            </div>
        </div>
    );
};

const SeoContent = () => {
    // ... (SeoContent component code is identical to previous version)
    const handleScrollToTool = () => {
        const toolElement = document.getElementById('calculator-tool');
        if (toolElement) {
            toolElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="w-full max-w-4xl text-right text-gray-700 mt-16 px-4">
            <h2 className="text-3xl font-black text-gray-800 mb-4">ما هي حاسبة العمر؟</h2>
            <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                "<strong>حاسبة العمر – كم عمري الآن؟</strong>" سؤال يتكرر كثيرًا على الإنترنت، ولهذا صُممت هذه الأداة الرقمية المتطورة لتجيب ببساطة ودقة عن سؤال "<strong>كم عمري</strong>؟". سواء كنت تحتاج إلى <strong>معرفة العمر</strong> بالتفصيل، أو ترغب في استكشاف رحلة حياتك بالأرقام، فإن هذه الـ<strong>الة حاسبة العمر</strong> هي بوابتك لذلك. فهي لا تكتفي بإعطائك عدد السنوات، بل تحلل الفارق الزمني بين تاريخ ميلادك واليوم الحالي، لتقدم لك تقريراً شاملاً وممتعاً.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">كيف تحسب عمرك بالميلادي؟</h3>
            <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                يعتمد <strong>حساب العمر بالميلادي</strong> على التقويم الشمسي. للوهلة الأولى، قد تبدو العملية بسيطة، وهي طرح تاريخ الميلاد من التاريخ الحالي. لكن الدقة تتطلب معالجة تفاصيل معقدة، مثل اختلاف عدد الأيام بين الشهور (30، 31، 28، أو 29)، وضرورة احتساب السنوات الكبيسة التي تأتي مرة كل أربع سنوات. تقوم أداتنا بكل هذه الحسابات تلقائياً، لتوفر عليك عناء الحساب اليدوي وتضمن لك نتيجة دقيقة 100%.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-8">كيف تحسب عمرك بالهجري؟</h3>
            <p className="mb-6 text-lg text-gray-600 leading-relaxed">
                يختلف <strong>حساب العمر بالهجري</strong> جذرياً، لأنه يعتمد على التقويم القمري الذي تكون سنته أقصر من السنة الميلادية بحوالي 11 يوماً. هذا الفارق يعني أن عمرك بالهجري سيكون دائماً أعلى رقمياً. تتطلب <strong>معرفة العمر</strong> بالهجري فهماً لدورات القمر، وهو ما يجعل حسابه يدوياً أمراً صعباً. تستخدم <strong>حاسبة العمر</strong> لدينا خوارزميات متوافقة مع المعايير الدولية للتقويم الهجري (أم القرى)، لتوفر لك عمرك الهجري الصحيح بضغطة زر.
            </p>

            <h2 className="text-3xl font-black text-gray-800 mb-4 mt-10">مميزات استخدام أداة "كم عمري الآن"</h2>
            <ul className="list-disc list-inside space-y-3 mb-6 pr-4 text-lg text-gray-600 leading-relaxed">
                <li><strong>الدقة المتناهية:</strong> نضمن لك نتيجة صحيحة وموثوقة، سواء في <strong>حساب العمر بالميلادي</strong> أو الهجري.</li>
                <li><strong>الشمولية:</strong> لا تقتصر الأداة على حساب السنوات، بل تقدم لك عمرك بالأشهر والأيام، وحتى الساعات.</li>
                <li><strong>مفاجآت ممتعة:</strong> اكتشف مفاجآت ممتعة مثل برجك الفلكي، والعد التنازلي الدقيق لموعد عيد ميلادك القادم.</li>
                <li><strong>سهولة الاستخدام:</strong> تصميم بسيط وواجهة واضحة. فقط اكتب تاريخ ميلادك الآن واضغط زر الحساب لتكتشف تفاصيل دقيقة عن عمرك في لحظات.</li>
                <li><strong>توافق كامل:</strong> استخدم حاسبتنا من أي جهاز تفضله، سواء كان هاتفاً ذكياً، جهازاً لوحياً، أو حاسوباً شخصياً.</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-800 mb-4 mt-10">أسئلة شائعة حول حساب العمر</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">ما مدى دقة هذه الالة حاسبة العمر؟</h3>
                    <p className="text-lg text-gray-600 pr-2 leading-relaxed">تعتمد أداتنا على خوارزميات دقيقة تأخذ في الاعتبار كافة متغيرات التقويمين الميلادي والهجري، مما يجعلها من أكثر الأدوات دقة على الإنترنت.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">هل يمكنني معرفة عمري في تاريخ محدد في الماضي أو المستقبل؟</h3>
                    <p className="text-lg text-gray-600 pr-2 leading-relaxed">حاليًا، تم تصميم ال<strong>حاسبة</strong> لتعطيك إجابة دقيقة لسؤال "<strong>كم عمري</strong> الآن؟" بناءً على التاريخ الحالي.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">لماذا يختلف عمري بين الميلادي والهجري؟</h3>
                    <p className="text-lg text-gray-600 pr-2 leading-relaxed">السبب هو أن السنة الهجرية (القمرية) أقصر من السنة الميلادية (الشمسية). هذا الفارق يتراكم مع مرور الزمن، مما يجعل عمرك بالسنوات الهجرية أكبر.
                    </p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-800">هل الأداة مجانية؟</h3>
                    <p className="text-lg text-gray-600 pr-2 leading-relaxed">بالتأكيد، خدمة <strong>الة حاسبة العمر</strong> لدينا مجانية بالكامل ومتاحة للجميع في أي وقت.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">هل يمكنني مشاركة النتيجة؟</h3>
                    <p className="text-lg text-gray-600 pr-2 leading-relaxed">نعم بكل سرور! يمكنك بسهولة نسخ النتائج أو أخذ لقطة شاشة ومشاركتها مع أصدقائك وعائلتك على وسائل التواصل الاجتماعي.</p>
                </div>
            </div>
            
             <div className="mt-10 text-center border-t border-gray-200 pt-8">
                 <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                    الآن حان الوقت لتكتشف عمرك بالتفصيل! <strong>حاسبة العمر</strong> المجانية الخاصة بنا هي الأداة الأدق والأسرع لمعرفة <strong>كم عمرك الآن</strong>، سواء كنت تبحث عن <strong>حساب العمر بالميلادي والهجري</strong>.
                    <br/><br/>
                    جرّب هذه الـ<strong>الة حاسبة العمر</strong> واحصل على تقرير شامل عن عمرك بالسنوات والأشهر والأيام، وحتى الساعات، بالإضافة إلى مفاجآت ممتعة مثل برجك وتاريخ عيد ميلادك القادم.
                    <br/><br/>
                    احسب عمرك الآن وشارك النتيجة مع أصدقائك، ولا تنسَ حفظ الصفحة في مفضلتك للعودة إليها متى شئت! 🎉
                </p>
                <button
                    onClick={handleScrollToTool}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 active:scale-[0.98] transform transition-all duration-300 text-white font-bold py-4 px-8 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
                >
                    جرّب حاسبة العمر الآن
                </button>
            </div>
        </div>
    );
};

// --- Main App Router ---
type Page = 'home' | 'privacy' | 'terms' | 'cookies' | 'about' | 'contact' | 'disclaimer';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const navigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'privacy':
                return <PrivacyPolicy />;
            case 'terms':
                return <TermsOfService />;
            case 'cookies':
                return <CookiesPolicy />;
            case 'about':
                return <AboutUs />;
            case 'contact':
                return <ContactUs />;
            case 'disclaimer':
                return <Disclaimer />;
            // Add other cases for other pages here in the future
            case 'home':
            default:
                return <CalculatorPage />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-4">
            <div className="w-full flex flex-col items-center">
                {renderPage()}
            </div>
            <Footer onNavigate={navigate} />
        </div>
    );
};

export default App;