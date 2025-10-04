import { useState } from 'react';

type Zodiac = { name: string; emoji: string; }
interface Age {
  years: number | null;
  months: number | null;
  days: number | null;
  totalDays: number | null;
  weeks: number | null;
  hours: number | null;
  zodiac: Zodiac | null;
  nextBirthdayCountdown: number | null;
}

const getZodiacSign = (day: number, month: number): Zodiac => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'الحمل', emoji: '♈' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'الثور', emoji: '♉' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'الجوزاء', emoji: '♊' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'السرطان', emoji: '♋' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'الأسد', emoji: '♌' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'العذراء', emoji: '♍' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'الميزان', emoji: '♎' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'العقرب', emoji: '♏' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'القوس', emoji: '♐' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'الجدي', emoji: '♑' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'الدلو', emoji: '♒' };
    // Pisces: Feb 19 - Mar 20
    return { name: 'الحوت', emoji: '♓' };
};


const useAgeCalculator = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [age, setAge] = useState<Age>({ years: null, months: null, days: null, totalDays: null, weeks: null, hours: null, zodiac: null, nextBirthdayCountdown: null });
    const [error, setError] = useState<string | null>(null);
    const [calendar, setCalendar] = useState<'gregorian' | 'hijri'>('gregorian');

    const emptyAge: Age = { years: null, months: null, days: null, totalDays: null, weeks: null, hours: null, zodiac: null, nextBirthdayCountdown: null };

    const validate = () => {
        setError(null);
        if (!day || !month || !year) {
            setError('الرجاء تحديد اليوم والشهر والسنة.');
            return false;
        }

        if (calendar === 'gregorian') {
            const dob = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            if (dob.getFullYear() !== parseInt(year) || dob.getMonth() !== parseInt(month) - 1 || dob.getDate() !== parseInt(day)) {
                setError('الرجاء إدخال تاريخ صالح.');
                return false;
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (dob > today) {
                setError('تاريخ الميلاد لا يمكن أن يكون في المستقبل.');
                return false;
            }
        } else { // Hijri validation
            let currentHijriYear, currentHijriMonth, currentHijriDay;
            try {
                const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric', month: 'numeric', day: 'numeric' });
                const todayStr = hijriFormatter.format(new Date());
                const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                const parseArabic = (str: string) => parseInt(String(str).split('').map(char => arabicNumerals.includes(char) ? arabicNumerals.indexOf(char) : char).join(''));
                const todayParts = todayStr.split('/');
                currentHijriDay = parseArabic(todayParts[0]);
                currentHijriMonth = parseArabic(todayParts[1]);
                currentHijriYear = parseArabic(todayParts[2].replace(/[^٠-٩0-9]/g, ''));
            } catch (e) {
                return true;
            }
            const dobYear = parseInt(year);
            const dobMonth = parseInt(month);
            const dobDay = parseInt(day);

            if (dobYear > currentHijriYear ||
                (dobYear === currentHijriYear && dobMonth > currentHijriMonth) ||
                (dobYear === currentHijriYear && dobMonth === currentHijriMonth && dobDay > currentHijriDay)) {
                setError('تاريخ الميلاد لا يمكن أن يكون في المستقبل.');
                return false;
            }
        }
        return true;
    };

    const calculateAge = () => {
        if (!validate()) {
            setAge(emptyAge);
            return;
        }

        if (calendar === 'hijri') {
            try {
                const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { year: 'numeric', month: 'numeric', day: 'numeric' });
                const today = new Date();
                const approxGregorianYear = parseInt(year) * 0.97 + 622;
                const dobApprox = new Date(approxGregorianYear, parseInt(month) - 1, parseInt(day));
                const totalDays = Math.floor((today.getTime() - dobApprox.getTime()) / (1000 * 3600 * 24));

                const todayStr = hijriFormatter.format(today);

                const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                const parseArabic = (str: string) => parseInt(String(str).split('').map(char => arabicNumerals.includes(char) ? arabicNumerals.indexOf(char) : char).join(''));

                const todayParts = todayStr.split('/');
                const hToday = {
                    day: parseArabic(todayParts[0]),
                    month: parseArabic(todayParts[1]),
                    year: parseArabic(todayParts[2].replace(/[^٠-٩0-9]/g, ''))
                };
                const hDob = { day: parseInt(day), month: parseInt(month), year: parseInt(year) };

                let years = hToday.year - hDob.year;
                let months = hToday.month - hDob.month;
                let days = hToday.day - hDob.day;

                if (days < 0) {
                    months--;
                    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() > 29 ? 30 : 29;
                }
                if (months < 0) {
                    years--;
                    months += 12;
                }
                setAge({ years, months, days, totalDays, weeks: Math.floor(totalDays / 7), hours: totalDays * 24, zodiac: null, nextBirthdayCountdown: null });
            } catch (e) {
                setError("لا يمكن حساب العمر الهجري. قد لا يكون متصفحك مدعومًا.");
                setAge(emptyAge);
            }
        } else { // Gregorian Calculation
            const dob = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            const today = new Date();
            const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 3600 * 24));

            let years = today.getFullYear() - dob.getFullYear();
            let months = today.getMonth() - dob.getMonth();
            let days = today.getDate() - dob.getDate();
            if (days < 0) {
                months--;
                const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                days += prevMonthLastDay;
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const weeks = Math.floor(totalDays / 7);
            const hours = totalDays * 24;
            const zodiac = getZodiacSign(parseInt(day), parseInt(month));

            let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }
            const nextBirthdayCountdown = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 3600 * 24));

            setAge({ years, months, days, totalDays, weeks, hours, zodiac, nextBirthdayCountdown });
        }
    };

    const reset = () => {
        setDay('');
        setMonth('');
        setYear('');
        setAge(emptyAge);
        setError(null);
    };

    return { day, setDay, month, setMonth, year, setYear, age, error, calculateAge, reset, calendar, setCalendar };
};

export default useAgeCalculator;